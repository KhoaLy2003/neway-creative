package com.neway_creative.ideasy_calendar.service.impl;

import com.google.gson.JsonObject;
import com.neway_creative.ideasy_calendar.constant.MessageConstant;
import com.neway_creative.ideasy_calendar.constant.VnPayConstant;
import com.neway_creative.ideasy_calendar.dto.request.*;
import com.neway_creative.ideasy_calendar.dto.response.OrderDetailResponse;
import com.neway_creative.ideasy_calendar.dto.response.PackageResponse;
import com.neway_creative.ideasy_calendar.entity.Customer;
import com.neway_creative.ideasy_calendar.entity.Order;
import com.neway_creative.ideasy_calendar.entity.Package;
import com.neway_creative.ideasy_calendar.enumeration.OrderEnum;
import com.neway_creative.ideasy_calendar.exception.DuplicateCalendarException;
import com.neway_creative.ideasy_calendar.repository.CalendarRepository;
import com.neway_creative.ideasy_calendar.repository.CustomerRepository;
import com.neway_creative.ideasy_calendar.repository.OrderRepository;
import com.neway_creative.ideasy_calendar.repository.PackageRepository;
import com.neway_creative.ideasy_calendar.service.PaymentService;
import com.neway_creative.ideasy_calendar.utils.VnPay;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

    private final OrderRepository orderRepository;
    private final PackageRepository packageRepository;
    private final CustomerRepository customerRepository;
    private final CalendarRepository calendarRepository;

    private static final Logger LOGGER = LoggerFactory.getLogger(PaymentServiceImpl.class);

    public Map<String, Object> createPayment(HttpServletRequest request, CreatePaymentRequest createPaymentRequest) throws UnsupportedEncodingException {
        Map<String, Object> payload = new HashMap<>(){{
            put("vnp_Version", VnPayConstant.VNP_VERSION);
            put("vnp_Command", VnPayConstant.VNP_COMMAND_ORDER);
            put("vnp_TmnCode", VnPayConstant.VNP_TMN_CODE);
            put("vnp_Amount", String.valueOf(createPaymentRequest.getAmount() * 100));
            put("vnp_CurrCode", VnPayConstant.VNP_CURRENCY_CODE);
            put("vnp_TxnRef",  VnPay.getRandomNumber(8));
            put("vnp_OrderInfo", createPaymentRequest.getOrderInfo());
            put("vnp_OrderType", VnPayConstant.ORDER_TYPE);
            put("vnp_Locale", VnPayConstant.VNP_LOCALE);
            put("vnp_ReturnUrl", VnPayConstant.VNP_RETURN_URL + "?orderId=" + createPaymentRequest.getOrderId());
            put("vnp_IpAddr", VnPay.getIpAddress(request));
            put("vnp_CreateDate", VnPay.generateDate(false));
            put("vnp_ExpireDate", VnPay.generateDate(true));
        }};

        String queryUrl = getQueryUrl(payload).get("queryUrl")
                + "&vnp_SecureHash="
                + VnPay.hmacSHA512(VnPayConstant.SECRET_KEY, getQueryUrl(payload).get("hashData"));

        String paymentUrl = VnPayConstant.VNP_PAY_URL + "?" + queryUrl;
        payload.put("redirect_url", paymentUrl);

        return payload;
    }

    private Map<String, String> getQueryUrl(Map<String, Object> payload) throws UnsupportedEncodingException {

        List<String> fieldNames = new ArrayList(payload.keySet());
        Collections.sort(fieldNames);
        StringBuilder hashData = new StringBuilder();
        StringBuilder query = new StringBuilder();
        Iterator itr = fieldNames.iterator();
        while (itr.hasNext()) {

            String fieldName = (String) itr.next();
            String fieldValue = (String) payload.get(fieldName);
            if ((fieldValue != null) && (fieldValue.length() > 0)) {

                //Build hash data
                hashData.append(fieldName);
                hashData.append('=');
                hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));

                //Build query
                query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII.toString()));
                query.append('=');
                query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                if (itr.hasNext()) {

                    query.append('&');
                    hashData.append('&');
                }
            }
        }
        return new HashMap<>(){{
            put("queryUrl", query.toString());
            put("hashData", hashData.toString());
        }};
    }

    public int getPaymentResult(HttpServletRequest request){
        Map fields = new HashMap();
        for (Enumeration params = request.getParameterNames(); params.hasMoreElements();) {
            String fieldName = null;
            String fieldValue = null;
            try {
                fieldName = URLEncoder.encode((String) params.nextElement(), StandardCharsets.US_ASCII.toString());
                fieldValue = URLEncoder.encode(request.getParameter(fieldName), StandardCharsets.US_ASCII.toString());
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }
            if ((fieldValue != null) && (fieldValue.length() > 0)) {
                fields.put(fieldName, fieldValue);
            }
        }

        String vnp_SecureHash = request.getParameter("vnp_SecureHash");
        if (fields.containsKey("vnp_SecureHashType")) {
            fields.remove("vnp_SecureHashType");
        }
        if (fields.containsKey("vnp_SecureHash")) {
            fields.remove("vnp_SecureHash");
        }
        String signValue = VnPay.hashAllFields(fields);
        String transactionNo = request.getParameter("vnp_TransactionNo");

//        if (signValue.equals(vnp_SecureHash)) {
//            if (VnPayConstant.VNP_RESPONSE_CODE.equals(request.getParameter("vnp_ResponseCode"))) {
//                LOGGER.info("Payment successfully with transaction {}", transactionNo);
//
//                return MessageConstant.SUCCESSFUL_CODE;
//            } else {
//                LOGGER.info("Payment failed with transaction {}", transactionNo);
//
//                return MessageConstant.FAILURE_CODE;
//            }
//        } else {
//            return MessageConstant.INVALID_PAYMENT_SIGN;
//        }

        if (VnPayConstant.VNP_RESPONSE_CODE.equals(request.getParameter("vnp_ResponseCode"))) {
            LOGGER.info("Payment successfully with transaction {}", transactionNo);

            return MessageConstant.SUCCESSFUL_CODE;
        } else {
            LOGGER.info("Payment failed with transaction {}", transactionNo);

            return MessageConstant.FAILURE_CODE;
        }
    }

    @Override
    public OrderDetailResponse saveOrder(SaveOrderRequest saveOrderRequest) {
        Customer customer = customerRepository.findByEmailAddress(saveOrderRequest.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found"));

        Set<Package> packages = new HashSet<>(packageRepository.findAllById(saveOrderRequest.getPackageIds()));
        Set<Integer> calendarIds = new HashSet<>();
        if(packages.stream().anyMatch(p -> !calendarIds.add(p.getCalendar().getCalendarId()))) {
          throw new DuplicateCalendarException(MessageConstant.ORDER_DUPLICATE_CALENDAR);
        }

        Set<PackageResponse> packageResponses = packages.stream()
                .map(calendarPackage -> new PackageResponse(calendarPackage.getPackageId(),
                        calendarPackage.getPrice(),
                        calendarPackage.getDurationValue(),
                        calendarPackage.getDurationUnit().toString(),
                        calendarPackage.getPackageType().toString(),
                        calendarPackage.getCalendar().getTitle()))
                .collect(Collectors.toSet());

        long orderPrice = packages.stream().mapToLong(calendarPackage -> calendarPackage.getPrice()).sum();

        Order order = new Order();
        order.setOrderDate(LocalDateTime.now());
        order.setPrice(orderPrice);
        order.setStatus(OrderEnum.PENDING);
        order.setPackages(packages);
        order.setCustomer(customer);
        order.setCreatedAt(LocalDateTime.now());
        order.setUpdatedAt(LocalDateTime.now());

        orderRepository.save(order);

        return OrderDetailResponse.builder()
                .orderId(order.getOrderId())
                .name(customer.getName())
                .email(customer.getEmailAddress())
                .orderDate(order.getOrderDate())
                .price(order.getPrice())
                .packages(packageResponses)
                .build();
    }

    @Override
    public Order updateOrder(UpdateOrderRequest updateOrderRequest) {
        Order order = orderRepository.findById(updateOrderRequest.getOrderId())
                .orElseThrow(() -> new ResourceNotFoundException("Order not found"));

        order.setStatus(updateOrderRequest.getStatus());
        order.setUpdatedAt(LocalDateTime.now());

        orderRepository.save(order);

        return order;
    }

    @Override
    public String queryTransaction(HttpServletRequest request, QueryDrRequest queryDrRequest) throws IOException {

        //Command:querydr
        String vnp_RequestId = VnPay.getRandomNumber(8);
        String vnp_Version = VnPayConstant.VNP_VERSION;
        String vnp_Command = VnPayConstant.VNP_COMMAND_STATUS;
        String vnp_TmnCode = VnPayConstant.VNP_TMN_CODE;
        String vnp_TxnRef = queryDrRequest.getOrderId();
        String vnp_OrderInfo = "Check transaction result with OrderId:" + vnp_TxnRef;
        String vnp_TransDate = queryDrRequest.getTransactionDate();

        java.util.Calendar cld = java.util.Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        String vnp_CreateDate = formatter.format(cld.getTime());

        String vnp_IpAddr = VnPay.getIpAddress(request);

        JsonObject  vnp_Params = new JsonObject();

        vnp_Params.addProperty("vnp_RequestId", vnp_RequestId);
        vnp_Params.addProperty("vnp_Version", vnp_Version);
        vnp_Params.addProperty("vnp_Command", vnp_Command);
        vnp_Params.addProperty("vnp_TmnCode", vnp_TmnCode);
        vnp_Params.addProperty("vnp_TxnRef", vnp_TxnRef);
        vnp_Params.addProperty("vnp_OrderInfo", vnp_OrderInfo);
        vnp_Params.addProperty("vnp_TransactionDate", vnp_TransDate);
        vnp_Params.addProperty("vnp_CreateDate", vnp_CreateDate);
        vnp_Params.addProperty("vnp_IpAddr", vnp_IpAddr);

        String hash_Data= String.join("|", vnp_RequestId, vnp_Version, vnp_Command, vnp_TmnCode, vnp_TxnRef, vnp_TransDate, vnp_CreateDate, vnp_IpAddr, vnp_OrderInfo);
        String vnp_SecureHash = VnPay.hmacSHA512(VnPayConstant.SECRET_KEY, hash_Data.toString());

        vnp_Params.addProperty("vnp_SecureHash", vnp_SecureHash);

        URL url = new URL (VnPayConstant.VNP_QUERYDR_URL);
        HttpURLConnection con = (HttpURLConnection)url.openConnection();
        con.setRequestMethod("POST");
        con.setRequestProperty("Content-Type", "application/json");
        con.setDoOutput(true);
        DataOutputStream wr = new DataOutputStream(con.getOutputStream());
        wr.writeBytes(vnp_Params.toString());
        wr.flush();
        wr.close();
        int responseCode = con.getResponseCode();
        System.out.println("nSending 'POST' request to URL : " + url);
        System.out.println("Post Data : " + vnp_Params);
        System.out.println("Response Code : " + responseCode);
        BufferedReader in = new BufferedReader(
                new InputStreamReader(con.getInputStream()));
        String output;
        StringBuffer response = new StringBuffer();
        while ((output = in.readLine()) != null) {
            response.append(output);
        }
        in.close();
        System.out.println(response.toString());

        return response.toString();
    }


    @Override
    public String refundTransaction(HttpServletRequest request, RefundRequest refundRequest) throws IOException {
//Command: refund
        String vnp_RequestId = VnPay.getRandomNumber(8);
        String vnp_Version = VnPayConstant.VNP_VERSION;
        String vnp_Command = VnPayConstant.VNP_COMMAND_REFUND;
        String vnp_TmnCode = VnPayConstant.VNP_TMN_CODE;
        String vnp_TransactionType = VnPayConstant.FULL_REFUND_TRANSACTION_TYPE;
        String vnp_TxnRef = refundRequest.getOrderId();
        long amount = refundRequest.getAmount() * 100;
        String vnp_Amount = String.valueOf(amount);
        String vnp_OrderInfo = "Refund transaction with OrderId:" + vnp_TxnRef;
        String vnp_TransactionNo = ""; //Assuming value of the parameter "vnp_TransactionNo" does not exist on your system.
        String vnp_TransactionDate = refundRequest.getTransactionDate();
        String vnp_CreateBy = refundRequest.getUser();

        String vnp_CreateDate = VnPay.generateDate(false);

        String vnp_IpAddr = VnPay.getIpAddress(request);

        JsonObject  vnp_Params = new JsonObject();

        vnp_Params.addProperty("vnp_RequestId", vnp_RequestId);
        vnp_Params.addProperty("vnp_Version", vnp_Version);
        vnp_Params.addProperty("vnp_Command", vnp_Command);
        vnp_Params.addProperty("vnp_TmnCode", vnp_TmnCode);
        vnp_Params.addProperty("vnp_TransactionType", vnp_TransactionType);
        vnp_Params.addProperty("vnp_TxnRef", vnp_TxnRef);
        vnp_Params.addProperty("vnp_Amount", vnp_Amount);
        vnp_Params.addProperty("vnp_OrderInfo", vnp_OrderInfo);

        if(vnp_TransactionNo != null && !vnp_TransactionNo.isEmpty())
        {
            vnp_Params.addProperty("vnp_TransactionNo", vnp_TransactionNo);
        }

        vnp_Params.addProperty("vnp_TransactionDate", vnp_TransactionDate);
        vnp_Params.addProperty("vnp_CreateBy", vnp_CreateBy);
        vnp_Params.addProperty("vnp_CreateDate", vnp_CreateDate);
        vnp_Params.addProperty("vnp_IpAddr", vnp_IpAddr);

        String hash_Data= String.join("|", vnp_RequestId, vnp_Version, vnp_Command, vnp_TmnCode,
                vnp_TransactionType, vnp_TxnRef, vnp_Amount, vnp_TransactionNo, vnp_TransactionDate,
                vnp_CreateBy, vnp_CreateDate, vnp_IpAddr, vnp_OrderInfo);

        String vnp_SecureHash = VnPay.hmacSHA512(VnPayConstant.SECRET_KEY, hash_Data.toString());

        vnp_Params.addProperty("vnp_SecureHash", vnp_SecureHash);

        URL url = new URL (VnPayConstant.VNP_REFUND_URL);
        HttpURLConnection con = (HttpURLConnection)url.openConnection();
        con.setRequestMethod("POST");
        con.setRequestProperty("Content-Type", "application/json");
        con.setDoOutput(true);
        DataOutputStream wr = new DataOutputStream(con.getOutputStream());
        wr.writeBytes(vnp_Params.toString());
        wr.flush();
        wr.close();
        int responseCode = con.getResponseCode();
        System.out.println("Sending 'POST' request to URL : " + url);
        System.out.println("Post Data : " + vnp_Params);
        System.out.println("Response Code : " + responseCode);
        BufferedReader in = new BufferedReader(
                new InputStreamReader(con.getInputStream()));
        String output;
        StringBuffer response = new StringBuffer();
        while ((output = in.readLine()) != null) {
            response.append(output);
        }
        in.close();
        System.out.println(response.toString());

        return response.toString();
        }
    }

package com.neway_creative.ideasy_calendar.service.impl;

import com.neway_creative.ideasy_calendar.constant.MessageConstant;
import com.neway_creative.ideasy_calendar.constant.VnPayConstant;
import com.neway_creative.ideasy_calendar.dto.request.CreatePaymentRequest;
import com.neway_creative.ideasy_calendar.dto.request.SaveOrderRequest;
import com.neway_creative.ideasy_calendar.dto.request.UpdateOrderRequest;
import com.neway_creative.ideasy_calendar.dto.response.OrderDetailResponse;
import com.neway_creative.ideasy_calendar.entity.Calendar;
import com.neway_creative.ideasy_calendar.entity.Customer;
import com.neway_creative.ideasy_calendar.entity.Order;
import com.neway_creative.ideasy_calendar.entity.Package;
import com.neway_creative.ideasy_calendar.enumeration.OrderEnum;
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
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

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
            put("vnp_ReturnUrl", VnPayConstant.VNP_RETURN_URL);
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

        if (signValue.equals(vnp_SecureHash)) {
            if (VnPayConstant.VNP_RESPONSE_CODE.equals(request.getParameter("vnp_TransactionStatus"))) {
                LOGGER.info("Payment successfully with transaction {}", transactionNo);

                return MessageConstant.SUCCESSFUL_CODE;
            } else {
                LOGGER.info("Payment failed with transaction {}", transactionNo);

                return MessageConstant.FAILURE_CODE;
            }
        } else {
            return MessageConstant.INVALID_PAYMENT_SIGN;
        }
    }

    @Override
    public OrderDetailResponse saveOrder(SaveOrderRequest saveOrderRequest) {
        Package calendarPackage = packageRepository.findById(saveOrderRequest.getPackageId())
                .orElseThrow(() -> new ResourceNotFoundException("Package not found"));

        Customer customer = customerRepository.findByEmailAddress(saveOrderRequest.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found"));

        Calendar calendar = calendarRepository.findById(calendarPackage.getCalendar().getCalendarId())
                .orElseThrow(() -> new ResourceNotFoundException("Calendar not found"));

        Order order = new Order();
        order.setOrderDate(LocalDateTime.now());
        order.setPrice(calendarPackage.getPrice());
        order.setStatus(OrderEnum.PENDING);
        order.setCalendarPackage(calendarPackage);
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
                .packageType(calendarPackage.getPackageType().toString())
                .calendarTitle(calendar.getTitle())
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
}

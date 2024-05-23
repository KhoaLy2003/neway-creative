package com.neway_creative.ideasy_calendar.controller;

import com.neway_creative.ideasy_calendar.constant.MessageConstant;
import com.neway_creative.ideasy_calendar.constant.UriConstant;
import com.neway_creative.ideasy_calendar.dto.request.*;
import com.neway_creative.ideasy_calendar.dto.response.BaseResponse;
import com.neway_creative.ideasy_calendar.dto.response.OrderDetailResponse;
import com.neway_creative.ideasy_calendar.dto.response.PaymentResultResponse;
import com.neway_creative.ideasy_calendar.entity.Order;
import com.neway_creative.ideasy_calendar.enumeration.OrderEnum;
import com.neway_creative.ideasy_calendar.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(UriConstant.PAYMENT_BASE_URI)
@RequiredArgsConstructor
public class PaymentController {
    private final PaymentService paymentService;

    @PostMapping(UriConstant.PAYMENT_CREATE)
    public ResponseEntity<BaseResponse> createPayment(HttpServletRequest servletRequest, @RequestBody CreatePaymentRequest paymentRequest) {
        Map<String, Object> payload = null;
        try {
            payload = paymentService.createPayment(servletRequest, paymentRequest);

            return ResponseEntity.status(HttpStatus.OK)
                    .body(new BaseResponse(HttpStatus.OK.value(), MessageConstant.SUCCESSFUL_MESSAGE, payload));
        } catch (UnsupportedEncodingException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new BaseResponse(HttpStatus.BAD_REQUEST.value(), MessageConstant.CREATE_PAYMENT_FAILED, null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), MessageConstant.CREATE_PAYMENT_FAILED, payload));
        }
    }

    @PostMapping(UriConstant.PAYMENT_SAVE)
    public ResponseEntity<BaseResponse> saveOrder(@RequestBody SaveOrderRequest orderRequest) {
        try {
            OrderDetailResponse orderDetailResponse = paymentService.saveOrder(orderRequest);

            return ResponseEntity.status(HttpStatus.OK)
                    .body(new BaseResponse(HttpStatus.OK.value(), MessageConstant.SUCCESSFUL_MESSAGE, orderDetailResponse));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new BaseResponse(HttpStatus.BAD_REQUEST.value(), MessageConstant.SAVE_ORDER_FAILED, null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), MessageConstant.SAVE_ORDER_FAILED, null));
        }
    }

    @PostMapping(UriConstant.PAYMENT_UPDATE)
    public ResponseEntity<BaseResponse> updateOrder(@RequestBody UpdateOrderRequest orderRequest) {
        try {
            Order order = paymentService.updateOrder(orderRequest);
            OrderDetailResponse orderDetailResponse = OrderDetailResponse.builder()
                    .orderId(order.getOrderId())
                    .orderDate(order.getOrderDate())
                    .price(order.getPrice())
                    .build();

            return ResponseEntity.status(HttpStatus.OK)
                    .body(new BaseResponse(HttpStatus.OK.value(), MessageConstant.SUCCESSFUL_MESSAGE, orderDetailResponse));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new BaseResponse(HttpStatus.BAD_REQUEST.value(), MessageConstant.UPDATE_ORDER_FAILED, null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), MessageConstant.UPDATE_ORDER_FAILED, null));
        }
    }

    @GetMapping(UriConstant.PAYMENT_RESULT)
    public void getPaymentResult(HttpServletRequest request, HttpServletResponse response) throws IOException {
        int paymentStatus = paymentService.getPaymentResult(request);
        int orderId = Integer.parseInt(request.getParameter("orderId"));

        PaymentResultResponse paymentResultResponse = new PaymentResultResponse();

        paymentResultResponse.setStatus(paymentStatus);
        if (paymentStatus == MessageConstant.SUCCESSFUL_CODE) {

            paymentResultResponse.setOrderId(request.getParameter("orderId"));
            paymentResultResponse.setOrderInfo(request.getParameter("vnp_OrderInfo"));
            paymentResultResponse.setTransDate(request.getParameter("vnp_PayDate"));
            paymentResultResponse.setTransactionNo(request.getParameter("vnp_TransactionNo"));
            paymentResultResponse.setAmount(request.getParameter("vnp_Amount"));

            paymentService.updateOrder(new UpdateOrderRequest(orderId, OrderEnum.COMPLETED));

            response.sendRedirect("http://localhost:3000/payment-result?status=success");
        } else {
            paymentService.updateOrder(new UpdateOrderRequest(orderId, OrderEnum.FAILED));

            response.sendRedirect("http://localhost:3000/payment-result?status=failed");
        }

    }

    @PostMapping(UriConstant.PAYMENT_QUERY)
    public ResponseEntity<BaseResponse> queryOrder(HttpServletRequest servletRequest, @RequestBody QueryDrRequest queryDrRequest) {
        String response = "";
        try {
            response = paymentService.queryTransaction(servletRequest, queryDrRequest);

            return ResponseEntity.status(HttpStatus.OK)
                    .body(new BaseResponse(HttpStatus.OK.value(), MessageConstant.SUCCESSFUL_MESSAGE, response));
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new BaseResponse(HttpStatus.BAD_REQUEST.value(), MessageConstant.QUERY_ORDER_FAILED, null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), MessageConstant.QUERY_ORDER_FAILED, response));
        }
    }
    @PostMapping(UriConstant.PAYMENT_REFUND)
    public ResponseEntity<BaseResponse> refundOrder(HttpServletRequest servletRequest, @RequestBody RefundRequest refundRequest) {
        String response = "";
        try {
            response = paymentService.refundTransaction(servletRequest, refundRequest);

            return ResponseEntity.status(HttpStatus.OK)
                    .body(new BaseResponse(HttpStatus.OK.value(), MessageConstant.SUCCESSFUL_MESSAGE, response));
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new BaseResponse(HttpStatus.BAD_REQUEST.value(), MessageConstant.REFUND_ORDER_FAILED, null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), MessageConstant.REFUND_ORDER_FAILED, response));
        }
    }

}

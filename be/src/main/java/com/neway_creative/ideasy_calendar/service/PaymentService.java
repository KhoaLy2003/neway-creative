package com.neway_creative.ideasy_calendar.service;

import com.neway_creative.ideasy_calendar.dto.request.CreatePaymentRequest;
import com.neway_creative.ideasy_calendar.dto.request.SaveOrderRequest;
import com.neway_creative.ideasy_calendar.dto.request.UpdateOrderRequest;
import com.neway_creative.ideasy_calendar.dto.response.OrderDetailResponse;
import com.neway_creative.ideasy_calendar.entity.Order;

import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;
import java.util.Map;

/**
 * PaymentService
 *
 * @author khoaly
 */
public interface PaymentService {
    Map<String, Object> createPayment(HttpServletRequest request, CreatePaymentRequest createPaymentRequest) throws UnsupportedEncodingException;
    int getPaymentResult(HttpServletRequest request);

    OrderDetailResponse saveOrder(SaveOrderRequest saveOrderRequest);

    Order updateOrder(UpdateOrderRequest updateOrderRequest);
}

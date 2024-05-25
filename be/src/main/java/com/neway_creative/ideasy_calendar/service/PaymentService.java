package com.neway_creative.ideasy_calendar.service;

import com.neway_creative.ideasy_calendar.dto.request.*;
import com.neway_creative.ideasy_calendar.dto.response.CustomerOrderDetailResponse;
import com.neway_creative.ideasy_calendar.dto.response.CustomerOrderHistoryResponse;
import com.neway_creative.ideasy_calendar.dto.response.OrderDetailResponse;
import com.neway_creative.ideasy_calendar.entity.Order;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
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

    String queryTransaction(HttpServletRequest request, QueryDrRequest queryDrRequest) throws IOException;

   String refundTransaction(HttpServletRequest request, RefundRequest refundRequest) throws IOException;

   CustomerOrderHistoryResponse getCustomerOrderHistory(int customerId);

   CustomerOrderDetailResponse getCustomerOrderDetail(int customerId, int orderId);
}

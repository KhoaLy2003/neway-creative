package com.neway_creative.ideasy_calendar.controller;

import com.neway_creative.ideasy_calendar.constant.MessageConstant;
import com.neway_creative.ideasy_calendar.constant.UriConstant;
import com.neway_creative.ideasy_calendar.dto.request.CreatePaymentRequest;
import com.neway_creative.ideasy_calendar.dto.request.SaveOrderRequest;
import com.neway_creative.ideasy_calendar.dto.request.UpdateOrderRequest;
import com.neway_creative.ideasy_calendar.dto.response.BaseResponse;
import com.neway_creative.ideasy_calendar.dto.response.OrderDetailResponse;
import com.neway_creative.ideasy_calendar.entity.Customer;
import com.neway_creative.ideasy_calendar.entity.Order;
import com.neway_creative.ideasy_calendar.entity.Package;
import com.neway_creative.ideasy_calendar.repository.CustomerRepository;
import com.neway_creative.ideasy_calendar.repository.PackageRepository;
import com.neway_creative.ideasy_calendar.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;
import java.util.Map;

@RestController
@RequestMapping(UriConstant.PAYMENT_BASE_URI)
@RequiredArgsConstructor
public class PaymentController {
    private final PaymentService paymentService;
    private final CustomerRepository customerRepository;
    private final PackageRepository packageRepository;

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
            Order order = paymentService.saveOrder(orderRequest);

            Customer customer = customerRepository.findByEmailAddress(orderRequest.getEmail()).orElse(null);

            Package calendarPackage = packageRepository.findById(orderRequest.getPackageId()).orElse(null);

            OrderDetailResponse orderDetailResponse = OrderDetailResponse.builder()
                    .orderId(order.getOrderId())
                    .name(customer.getName())
                    .email(orderRequest.getEmail())
                    .orderDate(order.getOrderDate())
                    .price(order.getPrice())
                    .packageType(calendarPackage.getPackageType().toString())
                    .build();

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
}

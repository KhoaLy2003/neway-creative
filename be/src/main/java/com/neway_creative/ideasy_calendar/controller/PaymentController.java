package com.neway_creative.ideasy_calendar.controller;

import com.neway_creative.ideasy_calendar.constant.MessageConstant;
import com.neway_creative.ideasy_calendar.constant.UriConstant;
import com.neway_creative.ideasy_calendar.dto.request.CreatePaymentRequest;
import com.neway_creative.ideasy_calendar.dto.response.BaseResponse;
import com.neway_creative.ideasy_calendar.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
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

    @PostMapping(UriConstant.PAYMENT_CREATE)
    public ResponseEntity<BaseResponse> createPayment(HttpServletRequest servletRequest, CreatePaymentRequest paymentRequest) {
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
}

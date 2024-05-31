package com.neway_creative.ideasy_calendar.controller;

import com.neway_creative.ideasy_calendar.constant.MessageConstant;
import com.neway_creative.ideasy_calendar.constant.UriConstant;
import com.neway_creative.ideasy_calendar.dto.request.LoginRequest;
import com.neway_creative.ideasy_calendar.dto.request.RegisterRequest;
import com.neway_creative.ideasy_calendar.dto.request.VerifyAccountRequest;
import com.neway_creative.ideasy_calendar.dto.response.*;
import com.neway_creative.ideasy_calendar.service.AuthenticationService;
import com.neway_creative.ideasy_calendar.service.CustomerService;
import com.neway_creative.ideasy_calendar.service.PaymentService;
import com.neway_creative.ideasy_calendar.utils.MessageLocalization;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;


/**
 * CustomerController
 *
 * @author khoaly
 */
@RestController
@RequestMapping(UriConstant.CUSTOMER_BASE_URI)
@RequiredArgsConstructor
public class CustomerController {
    private final AuthenticationService authenticationService;
    private final MessageLocalization messageLocalization;
    private final PaymentService paymentService;
    private final CustomerService customerService;

    @Operation(method = "POST", summary = "Register account", description = "Send a request via this API to register new account")
    @PostMapping(UriConstant.CUSTOMER_REGISTER_URI)
    public ResponseEntity<BaseResponse> register(@Valid @RequestBody RegisterRequest request, BindingResult result) {
        if(result.hasErrors()) {
            List<String> errorMessages = result.getFieldErrors()
                    .stream()
                    .map(FieldError::getDefaultMessage)
                    .toList();

            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new BaseResponse(HttpStatus.BAD_REQUEST.value(), messageLocalization.getLocalizedMessage(MessageConstant.REGISTER_FAILED), errorMessages));
        }

        authenticationService.registerNewAccount(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new BaseResponse(HttpStatus.CREATED.value(), messageLocalization.getLocalizedMessage(MessageConstant.REGISTER_SUCCESSFULLY), request.getEmail()));
    }

    @PostMapping(UriConstant.CUSTOMER_VERIFY_OTP_URI)
    public ResponseEntity<BaseResponse> verify(@Valid @RequestBody VerifyAccountRequest verifyAccountRequest, BindingResult result) {
        if(result.hasErrors()) {
            List<String> errorMessages = result.getFieldErrors()
                    .stream()
                    .map(FieldError::getDefaultMessage)
                    .toList();

            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new BaseResponse(HttpStatus.BAD_REQUEST.value(), messageLocalization.getLocalizedMessage(MessageConstant.VERIFY_ACCOUNT_FAILED), errorMessages));
        }

        boolean isCheck = authenticationService.verifyAccount(verifyAccountRequest);
        String message = messageLocalization.getLocalizedMessage(MessageConstant.VERIFY_ACCOUNT_FAILED);
        int status = HttpStatus.BAD_REQUEST.value();

        if (isCheck) {
            message = messageLocalization.getLocalizedMessage(MessageConstant.VERIFY_ACCOUNT_SUCCESSFULLY);
            status = HttpStatus.OK.value();
        }

        return ResponseEntity.status(HttpStatus.OK)
                .body(new BaseResponse(status, message, verifyAccountRequest.getEmail()));
    }

    @PostMapping(UriConstant.CUSTOMER_REGENERATE_OTP_URI)
    public ResponseEntity<BaseResponse> regenerateOtp(@RequestParam("email") String email) {
        authenticationService.regenerateOtp(email);

        return ResponseEntity.status(HttpStatus.OK)
                .body(new BaseResponse(HttpStatus.OK.value(), messageLocalization.getLocalizedMessage(MessageConstant.REGENERATE_OTP_SUCCESSFULLY), email));
    }

    @PostMapping(UriConstant.CUSTOMER_LOGIN_URI)
    public ResponseEntity<BaseResponse> login(@Valid @RequestBody LoginRequest request, BindingResult result) {
        if(result.hasErrors()) {
            List<String> errorMessages = result.getFieldErrors()
                    .stream()
                    .map(FieldError::getDefaultMessage)
                    .toList();

            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new BaseResponse(HttpStatus.BAD_REQUEST.value(), messageLocalization.getLocalizedMessage(MessageConstant.LOGIN_FAILED), errorMessages));
        }

        LoginResponse loginResponse = authenticationService.authenticateAccount(request);
        return ResponseEntity.status(HttpStatus.OK)
                .body(new BaseResponse(HttpStatus.OK.value(), messageLocalization.getLocalizedMessage(MessageConstant.LOGIN_SUCCESSFULLY), loginResponse));
    }

    @CrossOrigin
    @GetMapping(UriConstant.CUSTOMER_ORDER_HISTORY)
    public ResponseEntity<BaseResponse> getCustomerOrderHistory(@PathVariable int customerId) {
        try {
            CustomerOrderHistoryResponse response = paymentService.getCustomerOrderHistory(customerId);

            return ResponseEntity.status(HttpStatus.OK)
                    .body(new BaseResponse(HttpStatus.OK.value(), MessageConstant.SUCCESSFUL_MESSAGE, response));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new BaseResponse(HttpStatus.BAD_REQUEST.value(), MessageConstant.GET_CUSTOMER_ORDER_HISTORY_FAILED, null));
        }
    }

//    @CrossOrigin
//    @GetMapping(UriConstant.CUSTOMER_ORDER_DETAIL)
//    public ResponseEntity<BaseResponse> getCustomerOrderDetail(@PathVariable int customerId, @PathVariable int orderId) {
//        try {
//            CustomerOrderDetailResponse response = paymentService.getCustomerOrderDetail(customerId, orderId);
//
//            return ResponseEntity.status(HttpStatus.OK)
//                    .body(new BaseResponse(HttpStatus.OK.value(), MessageConstant.SUCCESSFUL_MESSAGE, response));
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
//                    .body(new BaseResponse(HttpStatus.BAD_REQUEST.value(), MessageConstant.GET_CUSTOMER_ORDER_DETAIL_FAILED, null));
//        }
//    }

    @CrossOrigin
    @GetMapping(UriConstant.ADMIN_VIEW_CUSTOMER)
    public ResponseEntity<BaseResponse> getCustomerForAdmin() {
        try {
            List<CustomerViewAdminResponse> response = customerService.findAllCustomerViewAdminResponse();

            CustomerListResponse customerListResponse = new CustomerListResponse(response);

            return ResponseEntity.status(HttpStatus.OK)
                    .body(new BaseResponse(HttpStatus.OK.value(), MessageConstant.SUCCESSFUL_MESSAGE, customerListResponse));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new BaseResponse(HttpStatus.BAD_REQUEST.value(), MessageConstant.GET_CUSTOMER_ORDER_DETAIL_FAILED, null));
        }
    }


}

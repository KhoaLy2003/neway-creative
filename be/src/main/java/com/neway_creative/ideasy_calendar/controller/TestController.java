package com.neway_creative.ideasy_calendar.controller;

import com.neway_creative.ideasy_calendar.constant.MessageConstant;
import com.neway_creative.ideasy_calendar.dto.LoginGoogleInfoDto;
import com.neway_creative.ideasy_calendar.dto.request.CreatePaymentRequest;
import com.neway_creative.ideasy_calendar.dto.request.LoginRequest;
import com.neway_creative.ideasy_calendar.dto.request.RegisterRequest;
import com.neway_creative.ideasy_calendar.dto.response.BaseResponse;
import com.neway_creative.ideasy_calendar.dto.response.CustomerOrderHistoryResponse;
import com.neway_creative.ideasy_calendar.dto.response.PaymentResultResponse;
import com.neway_creative.ideasy_calendar.repository.OrderRepository;
import com.neway_creative.ideasy_calendar.service.AuthenticationService;
import com.neway_creative.ideasy_calendar.service.MailService;
import com.neway_creative.ideasy_calendar.service.PaymentService;
import com.neway_creative.ideasy_calendar.utils.MessageLocalization;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Set;

@RestController
@RequiredArgsConstructor
@Tag(name = "Test Controller", description = "API for testing")
@RequestMapping("/api/testing")
public class TestController {
    private static final Logger LOGGER = LoggerFactory.getLogger(TestController.class);
    private final PaymentService paymentService;
    private final AuthenticationService authenticationService;
    private final MessageLocalization messageLocalization;
    private final RedisTemplate redisTemplate;
    private final MailService mailService;
    private final OrderRepository orderRepository;

    @Operation(method = "POST", summary = "Register account", description = "Send a request via this API to register new account")
    @PostMapping("/register")
    public ResponseEntity<BaseResponse> register(@Valid @RequestBody RegisterRequest request, BindingResult result) {
        if(result.hasErrors()) {
            List<String> errorMessages = result.getFieldErrors()
                    .stream()
                    .map(FieldError::getDefaultMessage)
                    .toList();

            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new BaseResponse(MessageConstant.FAILURE_CODE, messageLocalization.getLocalizedMessage(MessageConstant.LOGIN_FAILED), errorMessages));
        }

        authenticationService.registerNewAccount(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new BaseResponse(MessageConstant.SUCCESSFUL_CODE, messageLocalization.getLocalizedMessage(MessageConstant.REGISTER_SUCCESSFULLY), request.getEmail()));
    }

    @PostMapping("/login")
    public ResponseEntity<BaseResponse> login(@Valid @RequestBody LoginRequest request, BindingResult result) {
        if(result.hasErrors()) {
            List<String> errorMessages = result.getFieldErrors()
                    .stream()
                    .map(FieldError::getDefaultMessage)
                    .toList();

            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new BaseResponse(MessageConstant.SUCCESSFUL_CODE, messageLocalization.getLocalizedMessage(MessageConstant.LOGIN_FAILED), errorMessages));
        }

        return ResponseEntity.status(HttpStatus.OK)
                .body(new BaseResponse(MessageConstant.FAILURE_CODE, messageLocalization.getLocalizedMessage(MessageConstant.LOGIN_SUCCESSFULLY), authenticationService.authenticateAccount(request)));
    }

    @GetMapping("/admin")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<String> authenticateAdminRole() {
        return ResponseEntity.ok("Admin role only");
    }

    @GetMapping("/member")
    @PreAuthorize("hasRole('ROLE_MEMBER')")
    public ResponseEntity<String> authenticateMemberRole() {
        return ResponseEntity.ok("Member role only");
    }

    @GetMapping("/adminOrMember")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_MEMBER')")
    public ResponseEntity<String> authenticateAdminOrMemberRole() {
        return ResponseEntity.ok("Admin or member role only");
    }

    @GetMapping("/log")
    public void writeLog() {
        LOGGER.info("Hello ELK");
    }

    @PostMapping("/payment")
    public ResponseEntity<Map<String, Object>> createOrderPayment(HttpServletRequest request, @RequestBody CreatePaymentRequest createPaymentRequest) throws IOException {

        Map<String, Object> result = this.paymentService.createPayment(request, createPaymentRequest);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/result")
    public ResponseEntity<BaseResponse> getPaymentResult(HttpServletRequest request){
        int paymentStatus = paymentService.getPaymentResult(request);
        PaymentResultResponse paymentResultResponse = new PaymentResultResponse();

        paymentResultResponse.setStatus(paymentStatus);
        if (paymentStatus == MessageConstant.SUCCESSFUL_CODE) {

            paymentResultResponse.setOrderInfo(request.getParameter("vnp_OrderInfo"));
            paymentResultResponse.setTransDate(request.getParameter("vnp_PayDate"));
            paymentResultResponse.setTransactionNo(request.getParameter("vnp_TransactionNo"));
            paymentResultResponse.setAmount(request.getParameter("vnp_Amount"));
        }

        return ResponseEntity.status(HttpStatus.OK).body(new BaseResponse(MessageConstant.SUCCESSFUL_CODE, MessageConstant.SUCCESSFUL_MESSAGE, paymentResultResponse));
    }

    @GetMapping("/login-google")
    public ResponseEntity<BaseResponse> loginGoogle(OAuth2AuthenticationToken oAuth2AuthenticationToken) {
        LoginGoogleInfoDto loginGoogleInfoDto = new LoginGoogleInfoDto();

        loginGoogleInfoDto.setName(oAuth2AuthenticationToken.getPrincipal().getAttributes().get("given_name").toString());
        loginGoogleInfoDto.setEmail(oAuth2AuthenticationToken.getPrincipal().getAttributes().get("email").toString());
        loginGoogleInfoDto.setAvatar(oAuth2AuthenticationToken.getPrincipal().getAttributes().get("picture").toString());

        return ResponseEntity.status(HttpStatus.OK).body(new BaseResponse(MessageConstant.SUCCESSFUL_CODE, MessageConstant.SUCCESSFUL_MESSAGE, loginGoogleInfoDto));
    }

    @GetMapping("/clear")
    public void clearRedisCache() {
        String REDIS_KEY = "CALENDAR";
        Set<String> cacheKeys = redisTemplate.keys(REDIS_KEY + "_page_*");
        if (cacheKeys != null && !cacheKeys.isEmpty()) {
            redisTemplate.delete(cacheKeys);
            LOGGER.info("Cache keys for all pages cleared");
        }
    }

    @PostMapping("/sendMail")
    public void sendMailTest() {
        mailService.sendMailTest();
    }

    @GetMapping("/packages/{orderId}")
    public List<Integer> getPackagesByOrderId(@PathVariable int orderId) {
        return  orderRepository.findPackageIdsByOrderId(orderId);
    }

    @CrossOrigin
    @GetMapping("/order-history /{customerId}")
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
}

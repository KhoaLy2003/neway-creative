package com.neway_creative.ideasy_calendar.controller;

import com.neway_creative.ideasy_calendar.constant.UriConstant;
import com.neway_creative.ideasy_calendar.dto.response.BaseResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.neway_creative.ideasy_calendar.constant.MessageConstant.SUCCESSFUL_CODE;
import static com.neway_creative.ideasy_calendar.constant.MessageConstant.SUCCESSFUL_MESSAGE;


/**
 * CustomerController
 *
 * @author khoaly
 */
@RestController
@RequestMapping(UriConstant.CUSTOMER_BASE_URI)
public class CustomerController {
    /**
     * Hello world demo controller
     *
     * @return the response entity
     */
    @GetMapping("/hello")
    public ResponseEntity<BaseResponse> helloWorld() {

        return ResponseEntity.ok(new BaseResponse(SUCCESSFUL_CODE, SUCCESSFUL_MESSAGE, "Hello world"));
    }
}

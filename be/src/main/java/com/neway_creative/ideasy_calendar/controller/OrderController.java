package com.neway_creative.ideasy_calendar.controller;

import com.neway_creative.ideasy_calendar.constant.MessageConstant;
import com.neway_creative.ideasy_calendar.constant.UriConstant;
import com.neway_creative.ideasy_calendar.dto.response.*;
import com.neway_creative.ideasy_calendar.service.ExcelService;
import com.neway_creative.ideasy_calendar.service.PaymentService;
import com.neway_creative.ideasy_calendar.utils.MessageLocalization;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping(UriConstant.ORDER_BASE_URI)
@RequiredArgsConstructor
public class OrderController {
    private final PaymentService paymentService;
    private final ExcelService excelService;
    private final MessageLocalization messageLocalization;

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

    @CrossOrigin
    @GetMapping(UriConstant.CUSTOMER_ORDER_DETAIL)
    public ResponseEntity<BaseResponse> getCustomerOrderDetail(@PathVariable int customerId, @PathVariable int orderId) {
        try {
            CustomerOrderDetailResponse response = paymentService.getCustomerOrderDetail(customerId, orderId);

            return ResponseEntity.status(HttpStatus.OK)
                    .body(new BaseResponse(HttpStatus.OK.value(), MessageConstant.SUCCESSFUL_MESSAGE, response));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new BaseResponse(HttpStatus.BAD_REQUEST.value(), MessageConstant.GET_CUSTOMER_ORDER_DETAIL_FAILED, null));
        }
    }

    @CrossOrigin
    @GetMapping(UriConstant.ORDER_ADMIN_VIEW_URI)
    public ResponseEntity<BaseResponse> getCustomerOrderDetailAdmin() {
        try {
            AdminViewOrderHistory response = paymentService.getCustomerOrderHistoryAdmin();

            return ResponseEntity.status(HttpStatus.OK)
                    .body(new BaseResponse(HttpStatus.OK.value(), MessageConstant.SUCCESSFUL_MESSAGE, response));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new BaseResponse(HttpStatus.BAD_REQUEST.value(), MessageConstant.GET_CUSTOMERS_ADMIN_FAILED, null));
        }
    }

    @CrossOrigin
    @PostMapping("/upload-order-data")
    public ResponseEntity<BaseResponse> uploadCustomersData(@RequestParam("file") MultipartFile file) {
        excelService.saveOrderFromExcel(file);
        return ResponseEntity.status(HttpStatus.OK)
                .body(new BaseResponse(HttpStatus.OK.value(), messageLocalization.getLocalizedMessage(MessageConstant.UPLOAD_ORDER_FROM_EXCEL_SUCCESSFULLY), file.getName()));
    }

    @GetMapping("/total-price/completed")
    public ResponseEntity<BaseResponse> getTotalPriceOfCompletedOrders() {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new BaseResponse(HttpStatus.OK.value(), MessageConstant.SUCCESSFUL_MESSAGE, paymentService.getTotalPriceOfCompletedOrders()));
    }
}

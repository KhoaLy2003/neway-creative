package com.neway_creative.ideasy_calendar.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PaymentResultResponse {
    private int status;
    private String orderId;
    private String orderInfo;
    private String transactionNo;
    private String transDate;
    private String amount;
}

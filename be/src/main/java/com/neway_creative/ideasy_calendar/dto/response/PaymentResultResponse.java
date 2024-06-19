package com.neway_creative.ideasy_calendar.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PaymentResultResponse implements Serializable {
    private int status;
    private String orderId;
    private String orderInfo;
    private String transactionNo;
    private String transDate;
    private String amount;
}

package com.neway_creative.ideasy_calendar.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class RefundRequest implements Serializable {
    private String orderId;
    private long amount;
    private String orderInfo;
    private String transactionDate;
    private String user;
}

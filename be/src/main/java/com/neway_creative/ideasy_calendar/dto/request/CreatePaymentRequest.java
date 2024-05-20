package com.neway_creative.ideasy_calendar.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CreatePaymentRequest {
    private int orderId;
    private Long amount;
    private String orderInfo;
}

package com.neway_creative.ideasy_calendar.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CreatePaymentRequest implements Serializable {
    private int orderId;
    private Long amount;
    private String orderInfo;
}

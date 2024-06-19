package com.neway_creative.ideasy_calendar.dto.request;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class QueryDrRequest {
    private String orderId;
    private String transactionDate;
}

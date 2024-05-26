package com.neway_creative.ideasy_calendar.dto.response;

import com.neway_creative.ideasy_calendar.enumeration.OrderEnum;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
public class AdminOrderResponse {
    private int orderId;
    private LocalDateTime orderDate;
    private long price;
    private int numOfPackages;
    private OrderEnum status;
    private int customerId;
}

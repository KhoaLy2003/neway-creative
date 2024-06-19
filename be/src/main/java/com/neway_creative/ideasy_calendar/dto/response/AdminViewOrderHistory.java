package com.neway_creative.ideasy_calendar.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdminViewOrderHistory {
    private List<AdminOrderResponse> orderList;
}

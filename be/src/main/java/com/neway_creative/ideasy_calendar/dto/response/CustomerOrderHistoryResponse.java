package com.neway_creative.ideasy_calendar.dto.response;

import com.neway_creative.ideasy_calendar.enumeration.OrderEnum;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CustomerOrderHistoryResponse implements Serializable {
    private List<OrderResponse> orders;
}

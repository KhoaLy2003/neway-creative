package com.neway_creative.ideasy_calendar.dto.request;

import com.neway_creative.ideasy_calendar.enumeration.OrderEnum;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class UpdateOrderRequest implements Serializable {
    private int orderId;
    private OrderEnum status;
}

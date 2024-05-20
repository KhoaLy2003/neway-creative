package com.neway_creative.ideasy_calendar.dto.request;

import com.neway_creative.ideasy_calendar.enumeration.OrderEnum;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class SaveOrderRequest {
    private int packageId;
    private String email;
}

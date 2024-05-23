package com.neway_creative.ideasy_calendar.dto.request;

import com.neway_creative.ideasy_calendar.enumeration.OrderEnum;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class SaveOrderRequest implements Serializable {
    private Set<Integer> packageIds;
    private String email;
}

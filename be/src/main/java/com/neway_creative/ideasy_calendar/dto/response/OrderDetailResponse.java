package com.neway_creative.ideasy_calendar.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
public class OrderDetailResponse implements Serializable {
    private int orderId;
    private String name;
    private String email;
    private LocalDateTime orderDate;
    private long price;
    private String packageType;
    private String calendarTitle;
}

package com.neway_creative.ideasy_calendar.dto.response;

import com.neway_creative.ideasy_calendar.enumeration.OrderEnum;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Set;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CustomerOrderDetailResponse implements Serializable {
    private int orderId;
    private LocalDateTime orderDate;
    private long price;
    private int numOfPackages;
    private OrderEnum status;
    private Set<PackageResponse> packages;
}

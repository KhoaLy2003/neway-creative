package com.neway_creative.ideasy_calendar.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderExcelDto implements Serializable {
    private String name;
    private String facebookUrl;
    private LocalDate orderDate;
    private List<Integer> packageIds;
}

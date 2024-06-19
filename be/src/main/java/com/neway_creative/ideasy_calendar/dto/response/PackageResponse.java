package com.neway_creative.ideasy_calendar.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class PackageResponse implements Serializable {
    private int id;
    private long price;
    private int durationValue;
    private String packageDurationUnit;
    private String packageType;
    private String calendarTitle;
}

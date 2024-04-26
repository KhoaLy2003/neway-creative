package com.neway_creative.ideasy_calendar.dto.response;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Setter
@Getter
public class PackageResponse implements Serializable {
    private long price;
    private int durationValue;
    private String packageDurationUnit;
    private String packageType;
}

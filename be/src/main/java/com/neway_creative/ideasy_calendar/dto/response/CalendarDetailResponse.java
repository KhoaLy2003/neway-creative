package com.neway_creative.ideasy_calendar.dto.response;

import com.neway_creative.ideasy_calendar.dto.CategoryDto;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.List;

@Setter
@Getter
@Builder
public class CalendarDetailResponse implements Serializable {
    private int calendarId;
    private String title;
    private String description;
    private String image;
    private CategoryDto category;
    private List<PackageResponse> packages;
}

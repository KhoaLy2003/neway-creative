package com.neway_creative.ideasy_calendar.dto.response;

import com.neway_creative.ideasy_calendar.dto.CategoryDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.List;

@Setter
@Getter
@Builder
@AllArgsConstructor
public class CalendarDetailAdminResponse implements Serializable {
    private int calendarId;
    private String title;
    private String image;
    private boolean isDelete;
    private String description;
    private CategoryDto category;
    private List<PackageAdminResponse> packages;
}

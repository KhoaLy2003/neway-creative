package com.neway_creative.ideasy_calendar.dto;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

/**
 * CalendarDto
 *
 * @author khoaly
 */
@Setter
@Getter
public class CalendarDto implements Serializable {
    private int calendarId;
    private String title;
    private String description;
    private long price;
    private String image;
    private CategoryDto category;
}

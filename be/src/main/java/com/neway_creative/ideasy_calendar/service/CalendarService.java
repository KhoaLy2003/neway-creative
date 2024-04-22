package com.neway_creative.ideasy_calendar.service;


import com.neway_creative.ideasy_calendar.dto.CalendarDto;
import com.neway_creative.ideasy_calendar.dto.request.CalendarRequest;
import org.springframework.data.domain.Page;

import java.util.List;

/**
 * CalendarService
 *
 * @author khoaly
 */
public interface CalendarService {
    /**
     * Gets calendars.
     *
     * @param pageNo the page no
     * @return the calendars
     */
    Page<CalendarDto> getCalendars(int pageNo);

    /**
     * Get calendar dto by id.
     *
     * @param id the id
     * @return the calendar dto by id
     */
    CalendarDto getCalendarDtoById(int id);

    /**
     * Gets calendars by category id.
     *
     * @param pageNo     the page no
     * @param categoryId the category id
     * @return the calendars by category id
     */
    Page<CalendarDto> getCalendarsByCategoryId(int pageNo, int categoryId);

    /**
     * Gets related calendars.
     *
     * @param id the id
     * @return the related calendars
     */
    List<CalendarDto> getRelatedCalendars(int id);

    /**
     * Gets latest calendars.
     *
     * @return the latest calendars
     */
    List<CalendarDto> getLatestCalendars();

    void createCalendar(CalendarRequest calendarRequest);
}

package com.neway_creative.ideasy_calendar.service;

import com.neway_creative.ideasy_calendar.dto.CalendarDto;
import com.neway_creative.ideasy_calendar.dto.request.CalendarRequest;
import com.neway_creative.ideasy_calendar.dto.response.CalendarAdminResponse;
import com.neway_creative.ideasy_calendar.dto.response.CalendarDetailResponse;
import com.neway_creative.ideasy_calendar.entity.Calendar;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

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
    CalendarDetailResponse getCalendarDetailById(int id);
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
    /**
     * Create calendar.
     *
     * @param calendarRequest the calendar request
     */
    Calendar createCalendar(CalendarRequest calendarRequest);

    /**
     * Gets calendars in admin role.
     *
     * @param pageNo the page no
     * @return the calendars in admin role
     */
    Page<CalendarAdminResponse> getCalendarsInAdminRole(int pageNo);

    /**
     * Upload calendar image.
     *
     * @param file the file
     * @param id   the id
     */
    void uploadCalendarImage(MultipartFile file, int id);
}

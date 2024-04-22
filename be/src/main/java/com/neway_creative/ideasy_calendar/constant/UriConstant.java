package com.neway_creative.ideasy_calendar.constant;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

/**
 * UriConstant
 *
 * @author khoaly
 */
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public final class UriConstant {
    /**
     * The constant CUSTOMER_BASE_URI.
     */
    public static final String CUSTOMER_BASE_URI = "/api/customers";
    /**
     * The constant CALENDAR_BASE_URI.
     */
    public static final String CALENDAR_BASE_URI = "/api/calendars";
    /**
     * The constant CALENDAR_VARIABLE_URI.
     */
    public static final String CALENDAR_VARIABLE_URI = "/{calendarId}";
    /**
     * The constant CATEGORIES_BASE_URI.
     */
    public static final String CATEGORIES_BASE_URI = "/api/categories";
    /**
     * The constant CALENDAR_CATEGORY_URI.
     */
    public static final String CALENDAR_CATEGORY_URI = "/category";
    /**
     * The constant CALENDAR_RELATED_URI.
     */
    public static final String CALENDAR_RELATED_URI = "/{calendarId}/related";
    /**
     * The constant CALENDAR_LATEST_URI.
     */
    public static final String CALENDAR_LATEST_URI = "/latest";
    /**
     * The constant CALENDAR_CREATE.
     */
    public static final String CALENDAR_CREATE = "/create";
}

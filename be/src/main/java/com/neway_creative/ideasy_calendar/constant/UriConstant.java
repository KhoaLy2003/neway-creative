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
     * The constant POST_BASE_URI.
     */
    public static final String POST_BASE_URI = "/api/posts";
    /**
     * The constant PAYMENT_BASE_URI.
     */
    public static final String PAYMENT_BASE_URI = "/api/payment";
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
     * The constant PAYMENT_CREATE.
     */
    public static final String PAYMENT_CREATE = "/create";
    /**
     * The constant POST_CREATE.
     */
    public static final String POST_CREATE = "/admin/create";
    /**
     * The constant CALENDAR_CREATE.
     */
    public static final String CALENDAR_CREATE = "/admin/create";
    /**
     * The constant CALENDAR_UPLOAD.
     */
    public static final String CALENDAR_UPLOAD = "/admin/upload";
    /**
     * The constant CALENDAR_ADMIN_LIST.
     */
    public static final String CALENDAR_ADMIN_LIST = "/admin/list";
    public static final String CUSTOMER_REGISTER_URI = "/register";
    public static final String CUSTOMER_VERIFY_OTP_URI = "/verify";
    public static final String CUSTOMER_REGENERATE_OTP_URI = "/regenerate-otp";
    public static final String CUSTOMER_LOGIN_URI = "/login";
}

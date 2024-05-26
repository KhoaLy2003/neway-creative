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
     * The constant PAYMENT_CREATE.
     */
    public static final String PAYMENT_SAVE = "/save";
    /**
     * The constant PAYMENT_UPDATE.
     */
    public static final String PAYMENT_UPDATE = "/update";
    /**
     * The constant PAYMENT_RESULT.
     */
    public static final String PAYMENT_RESULT = "/result";
    /**
     * The constant PAYMENT_QUERY.
     */
    public static final String PAYMENT_QUERY = "/query";
    /**
     * The constant PAYMENT_REFUND.
     */
    public static final String PAYMENT_REFUND = "/refund";
    /**
     * The constant ORDER_HISTORY.
     */
    public static final String CUSTOMER_ORDER_HISTORY = "/{customerId}/order-history";
    /**
     * The constant GET_ORDER_DETAIL.
     */
    public static final String CUSTOMER_ORDER_DETAIL = "/{customerId}/order-history/{orderId}";
    /**
     * The constant POST_CREATE.
     */
    public static final String POST_CREATE = "/admin/create";
    /**
     * The constant CALENDAR_CREATE.
     */
    public static final String CALENDAR_CREATE_URI = "/admin/create";
    /**
     * The constant CALENDAR_UPLOAD.
     */
    public static final String CALENDAR_UPLOAD_URI = "/admin/upload";
    /**
     * The constant CALENDAR_ADMIN_LIST.
     */
    public static final String CALENDAR_ADMIN_LIST_URI = "/admin/list";
    /**
     * The constant CALENDAR_ADMIN_DETAIL_URI.
     */
    public static final String CALENDAR_ADMIN_DETAIL_URI = "/admin/{calendarId}";
    /**
     * The constant CUSTOMER_REGISTER_URI.
     */
    public static final String CUSTOMER_REGISTER_URI = "/register";
    /**
     * The constant CUSTOMER_VERIFY_OTP_URI.
     */
    public static final String CUSTOMER_VERIFY_OTP_URI = "/verify";
    /**
     * The constant CUSTOMER_REGENERATE_OTP_URI.
     */
    public static final String CUSTOMER_REGENERATE_OTP_URI = "/regenerate-otp";
    /**
     * The constant CUSTOMER_LOGIN_URI.
     */
    public static final String CUSTOMER_LOGIN_URI = "/login";
    /**
     * The constant ORDER_BASE_URI.
     */
    public static final String ORDER_BASE_URI = "/api/orders";
    /**
     * The constant ORDER_ADMIN_VIEW_URI.
     */
    public static final String ORDER_ADMIN_VIEW_URI = "/admin/orders";
}

package com.neway_creative.ideasy_calendar.constant;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

/**
 * MessageConstant
 *
 * @author khoaly
 */
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public final class MessageConstant {
    /**
     * The content of SUCCESSFUL_MESSAGE
     */
    public static final String SUCCESSFUL_MESSAGE = "Successful";
    /**
     * The constant INVALID_PARAM_MESSAGE.
     */
    public static final String INVALID_PARAM_MESSAGE = "Invalid param for {} with ";
    /**
     * The constant SUCCESSFUL_CODE.
     */
    public static final int SUCCESSFUL_CODE = 1;
    /**
     * The constant FAILURE_CODE.
     */
    public static final int FAILURE_CODE = 0;
    /**
     * The constant INVALID_PAYMENT_SIGN.
     */
    public static final int INVALID_PAYMENT_SIGN = -1;
    public static final String LOGIN_SUCCESSFULLY =  "customer.login_successfully";
    public static final String LOGIN_FAILED =  "customer.login_failed";
    public static final String REGISTER_SUCCESSFULLY =  "customer.register_successfully";
    public static final String REGISTER_FAILED =  "customer.register_failed";
    public static final String CREATE_CALENDAR_SUCCESSFULLY = "admin.calendar.create_successfully";
    public static final String CREATE_CALENDAR_FAILED = "admin.calendar.create_failed";
    public static final String ACCESS_DENIED = "access_denied";
    public static final String UPLOAD_CALENDAR_IMAGE_SUCCESSFULLY = "admin.calendar.upload_image_successfully";
    public static final String UPLOAD_CALENDAR_IMAGE_FAILED = "admin.calendar.upload_image_failed";
    public static final String CREATE_PAYMENT_FAILED = "customer.create_payment_failed";
    public static final String VERIFY_ACCOUNT_SUCCESSFULLY = "customer.verify_account_successfully";
    public static final String VERIFY_ACCOUNT_FAILED = "customer.verify_account_failed";
    public static final String ACCOUNT_NOT_VERIFIED = "customer.account_not_verified";
    public static final String NO_ACCOUNT_WITH_THIS_EMAIL = "customer.account_not_found";
    public static final String REGENERATE_OTP_SUCCESSFULLY = "customer.regenerate_otp_successfully";

    public static final String GET_POSTS_FAILED = "customer.get_posts_failed";

    public static final String GET_POST_FAILED = "customer.get_post_failed";

    public static final String CREATE_POST_FAILED = "customer.create_post_failed";
}

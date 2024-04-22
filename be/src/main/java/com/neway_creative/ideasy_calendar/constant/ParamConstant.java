package com.neway_creative.ideasy_calendar.constant;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

/**
 * ParamConstant
 *
 * @author khoaly
 */
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public final class ParamConstant {
    /**
     * The constant DEFAULT_PAGE_SIZE.
     */
    public static final int DEFAULT_PAGE_SIZE = 8;
    /**
     * The constant DEFAULT_SORT_FIELD.
     */
    public static final String DEFAULT_SORT_FIELD = "createdAt";
    /**
     * The constant IS_DELETED.
     */
    public static final boolean IS_DELETED = true;
    /**
     * The constant IS_NOT_DELETED.
     */
    public static final boolean IS_NOT_DELETED = false;
}

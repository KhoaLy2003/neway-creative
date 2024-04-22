package com.neway_creative.ideasy_calendar.enumeration;

import lombok.Getter;

/**
 * BaseStatusEnum
 *
 * @author khoaly
 */
@Getter
public enum BaseStatusEnum {
    ACTIVE(1),
    INACTIVE(0);

    private final int value;

    BaseStatusEnum(int value) {
        this.value = value;
    }
}


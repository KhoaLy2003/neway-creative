package com.neway_creative.ideasy_calendar.enumeration;

import lombok.Getter;

/**
 * RoleEnum
 *
 * @author khoaly
 */
@Getter
public enum RoleEnum {
    ADMIN(1L),
    MEMBER(2L);

    private final Long value;

    RoleEnum(Long value) {
        this.value = value;
    }
}

package com.neway_creative.ideasy_calendar.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

/**
 * CustomerDto
 *
 * @author khoaly
 */
@Getter
@Setter
@AllArgsConstructor
public class CustomerDto {
    private int customerId;
    private String name;
    private String emailAddress;
    private String password;
}

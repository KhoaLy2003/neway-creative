package com.neway_creative.ideasy_calendar.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

/**
 * CategoryDto
 *
 * @author khoaly
 */
@Setter
@Getter
@AllArgsConstructor
public class CategoryDto implements Serializable {
    private int categoryId;
    private String name;
}

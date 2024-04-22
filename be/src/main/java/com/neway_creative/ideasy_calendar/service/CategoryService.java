package com.neway_creative.ideasy_calendar.service;


import com.neway_creative.ideasy_calendar.dto.CategoryDto;

import java.util.List;

/**
 * CalendarService
 *
 * @author khoaly
 */
public interface CategoryService {
    /**
     * Gets active categories.
     *
     * @return the active categories
     */
    List<CategoryDto> getActiveCategories();
}

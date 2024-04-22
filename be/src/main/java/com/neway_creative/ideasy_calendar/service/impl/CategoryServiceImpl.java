package com.neway_creative.ideasy_calendar.service.impl;


import com.neway_creative.ideasy_calendar.converter.CategoryMapper;
import com.neway_creative.ideasy_calendar.dto.CategoryDto;
import com.neway_creative.ideasy_calendar.repository.CategoryRepository;
import com.neway_creative.ideasy_calendar.service.CategoryService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * CategoryServiceImpl
 *
 * @author khoaly
 */
@Service
public class CategoryServiceImpl implements CategoryService {

    private static final Logger LOGGER = LoggerFactory.getLogger(CategoryServiceImpl.class);

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public List<CategoryDto> getActiveCategories() {
        List<CategoryDto> categoryDTOs = categoryRepository
                .findByIsDeleteFalse()
                .stream()
                .map(CategoryMapper.INSTANCE::entityToDTO)
                .toList();

        LOGGER.info("Get category list successfully with {} records", categoryDTOs.size());

        return categoryDTOs;
    }
}

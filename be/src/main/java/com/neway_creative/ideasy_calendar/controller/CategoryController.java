package com.neway_creative.ideasy_calendar.controller;

import com.neway_creative.ideasy_calendar.constant.MessageConstant;
import com.neway_creative.ideasy_calendar.constant.UriConstant;
import com.neway_creative.ideasy_calendar.dto.CategoryDto;
import com.neway_creative.ideasy_calendar.dto.response.BaseResponse;
import com.neway_creative.ideasy_calendar.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * CalendarController
 *
 * @author khoaly
 */
@RestController
@RequestMapping(UriConstant.CATEGORIES_BASE_URI)
public class CategoryController {

    @Autowired private CategoryService categoryService;

    @CrossOrigin
    @GetMapping
    public ResponseEntity<BaseResponse> getAllCategories() {
        List<CategoryDto> categoryDTOs = categoryService.getActiveCategories();

        return ResponseEntity.status(HttpStatus.OK).body(new BaseResponse(MessageConstant.SUCCESSFUL_CODE, MessageConstant.SUCCESSFUL_MESSAGE, categoryDTOs));
    }
}

package com.neway_creative.ideasy_calendar.converter;

import com.neway_creative.ideasy_calendar.dto.CalendarDto;
import com.neway_creative.ideasy_calendar.dto.CategoryDto;
import com.neway_creative.ideasy_calendar.dto.response.CalendarAdminResponse;
import com.neway_creative.ideasy_calendar.entity.Calendar;
import com.neway_creative.ideasy_calendar.entity.Category;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

/**
 * CalendarMapper
 *
 * @author khoaly
 */
@Mapper(componentModel = "spring")
public interface CalendarMapper {
    /**
     * The constant INSTANCE.
     */
    CalendarMapper INSTANCE = Mappers.getMapper(CalendarMapper.class);

    /**
     * Convert entity to dto
     *
     * @param entity the entity
     * @return the calendar dto
     */
    @Mapping(target = "calendarId", source = "entity.calendarId")
    @Mapping(target = "title", source = "entity.title")
    @Mapping(target = "description", source = "entity.description")
    @Mapping(target = "image", source = "entity.image")
    @Mapping(target = "category", source = "entity.category")
    CalendarDto entityToDTO(Calendar entity);

    /**
     * Convert dto to entity
     *
     * @param dto the dto
     * @return the calendar
     */
    @Mapping(target = "calendarId", source = "dto.calendarId")
    @Mapping(target = "title", source = "dto.title")
    @Mapping(target = "description", source = "dto.description")
    @Mapping(target = "image", source = "dto.image")
    @Mapping(target = "category", source = "dto.category")
    Calendar dtoToEntity(CalendarDto dto);

    @Mapping(target = "calendarId", source = "calendarId")
    @Mapping(target = "title", source = "title")
    @Mapping(target = "image", source = "image")
    @Mapping(target = "isDelete", expression = "java(entity.isDelete())")
    CalendarAdminResponse entityToCalendarAdminResponse(Calendar entity);

    default CategoryDto categoryToCategoryDto(Category category) {
        if (category == null) {
            return null;
        }
        return new CategoryDto(category.getCategoryId(), category.getName());
    }

    default Category categoryDtoToCategory(CategoryDto categoryDto) {
        if (categoryDto == null) {
            return null;
        }
        Category category = new Category();
        category.setCategoryId(categoryDto.getCategoryId());
        category.setName(categoryDto.getName());
        return category;
    }
}

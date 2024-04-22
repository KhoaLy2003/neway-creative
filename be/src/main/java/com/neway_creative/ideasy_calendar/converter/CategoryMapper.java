package com.neway_creative.ideasy_calendar.converter;

import com.neway_creative.ideasy_calendar.dto.CategoryDto;
import com.neway_creative.ideasy_calendar.entity.Category;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

/**
 * CategoryMapper
 *
 * @author khoaly
 */
@Mapper(componentModel = "spring")
public interface CategoryMapper {
    /**
     * The constant INSTANCE.
     */
    CategoryMapper INSTANCE = Mappers.getMapper(CategoryMapper.class);

    /**
     * Convert entity to dto
     *
     * @param entity the entity
     * @return the category dto
     */
    @Mapping(target = "categoryId", source = "entity.categoryId")
    @Mapping(target = "name", source = "entity.name")
    CategoryDto entityToDTO(Category entity);

    /**
     * Convert dto to entity
     *
     * @param dto the dto
     * @return the category
     */
    @Mapping(target = "categoryId", source = "dto.categoryId")
    @Mapping(target = "name", source = "dto.name")
    Category dtoToEntity(CategoryDto dto);
}

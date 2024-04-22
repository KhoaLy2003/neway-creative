package com.neway_creative.ideasy_calendar.converter;

import com.neway_creative.ideasy_calendar.dto.CustomerDto;
import com.neway_creative.ideasy_calendar.entity.Customer;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

/**
 * CustomerMapper
 *
 * @author khoaly
 */
@Mapper(componentModel = "spring")
public interface CustomerMapper {
    /**
     * The constant INSTANCE.
     */
    CustomerMapper INSTANCE = Mappers.getMapper(CustomerMapper.class);

    /**
     * Convert entity to dto
     *
     * @param entity the entity
     * @return the customer dto
     */
    @Mapping(target = "customerId", source = "entity.customerId")
    @Mapping(target = "name", source = "entity.name")
    @Mapping(target = "emailAddress", source = "entity.emailAddress")
    @Mapping(target = "password", source = "entity.password")
    CustomerDto entityToDTO(Customer entity);

    /**
     * Convert dto to entity
     *
     * @param dto the dto
     * @return the customer
     */
    @Mapping(target = "customerId", source = "dto.customerId")
    @Mapping(target = "name", source = "dto.name")
    @Mapping(target = "emailAddress", source = "dto.emailAddress")
    @Mapping(target = "password", source = "dto.password")
    Customer dtoToEntity(CustomerDto dto);
}

package com.neway_creative.ideasy_calendar.converter;

import com.neway_creative.ideasy_calendar.dto.response.PackageAdminResponse;
import com.neway_creative.ideasy_calendar.dto.response.PackageResponse;
import com.neway_creative.ideasy_calendar.entity.Package;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface PackageMapper {
    PackageMapper INSTANCE = Mappers.getMapper(PackageMapper.class);

    @Mapping(target = "packageType", expression = "java(entity.getPackageType().name())")
    @Mapping(target = "packageDurationUnit", expression = "java(entity.getDurationUnit().name())")
    @Mapping(target = "durationValue", source = "durationValue")
    @Mapping(target = "price", source = "price")
    PackageResponse entityToResponse(Package entity);

    @Mapping(target = "packageType", expression = "java(entity.getPackageType().name())")
    @Mapping(target = "packageDurationUnit", expression = "java(entity.getDurationUnit().name())")
    @Mapping(target = "durationValue", source = "durationValue")
    @Mapping(target = "price", source = "price")
    @Mapping(target = "linkNotion", source = "linkNotion")
    PackageAdminResponse entityToPackageAdminResponse(Package entity);
}

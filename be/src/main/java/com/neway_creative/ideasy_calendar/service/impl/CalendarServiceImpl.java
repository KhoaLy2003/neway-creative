package com.neway_creative.ideasy_calendar.service.impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.neway_creative.ideasy_calendar.constant.ParamConstant;
import com.neway_creative.ideasy_calendar.converter.CalendarMapper;
import com.neway_creative.ideasy_calendar.converter.CategoryMapper;
import com.neway_creative.ideasy_calendar.converter.PackageMapper;
import com.neway_creative.ideasy_calendar.dto.CalendarDto;
import com.neway_creative.ideasy_calendar.dto.request.CalendarRequest;
import com.neway_creative.ideasy_calendar.dto.response.CalendarAdminResponse;
import com.neway_creative.ideasy_calendar.dto.response.CalendarDetailAdminResponse;
import com.neway_creative.ideasy_calendar.dto.response.CalendarDetailResponse;
import com.neway_creative.ideasy_calendar.dto.response.PackageAdminResponse;
import com.neway_creative.ideasy_calendar.dto.response.PackageResponse;
import com.neway_creative.ideasy_calendar.entity.Calendar;
import com.neway_creative.ideasy_calendar.entity.CalendarImage;
import com.neway_creative.ideasy_calendar.entity.Category;
import com.neway_creative.ideasy_calendar.entity.Package;
import com.neway_creative.ideasy_calendar.enumeration.DurationUnitEnum;
import com.neway_creative.ideasy_calendar.enumeration.PackageTypeEnum;
import com.neway_creative.ideasy_calendar.repository.CalendarRepository;
import com.neway_creative.ideasy_calendar.repository.CategoryRepository;
import com.neway_creative.ideasy_calendar.service.CalendarService;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.security.InvalidParameterException;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

/**
 * CalendarServiceImpl
 *
 * @author khoaly
 */
@Service
@RequiredArgsConstructor
public class CalendarServiceImpl implements CalendarService {
    private static final Logger LOGGER = LoggerFactory.getLogger(CalendarServiceImpl.class);
    private final CalendarRepository calendarRepository;
    private final CategoryRepository categoryRepository;
    private final RedisTemplate redisTemplate;
    private final Cloudinary cloudinary;
    private static final String REDIS_KEY = "CALENDAR";
    @Override
    public Page<CalendarDto> getCalendars(int pageNo) {
        String cacheKey = REDIS_KEY + "_page_" + pageNo;
        if(redisTemplate.hasKey(cacheKey)) {
            return (Page<CalendarDto>) redisTemplate.opsForValue().get(cacheKey);
        } else {
            Pageable pageable = PageRequest
                    .of(pageNo, ParamConstant.DEFAULT_PAGE_SIZE, Sort.by(ParamConstant.DEFAULT_SORT_FIELD)
                            .ascending());
            Page<Calendar> calendarPage = calendarRepository.findAll(pageable);

            List<CalendarDto> calendarDTOs = calendarPage
                    .getContent()
                    .stream()
                    .map(CalendarMapper.INSTANCE::entityToDTO)
                    .toList();

            LOGGER.info("Get calendars list successfully with {} records", calendarDTOs.size());

            redisTemplate.opsForValue().set(cacheKey, new PageImpl<>(calendarDTOs, pageable, calendarPage.getTotalElements()));

            return new PageImpl<>(calendarDTOs, pageable, calendarPage.getTotalElements());
        }
    }

    @Override
    public CalendarDetailResponse getCalendarDetailById(int id) {
        if (StringUtils.isEmpty(String.valueOf(id))) {
            LOGGER.error("Invalid param for product with product id {}", id);
            throw new InvalidParameterException("Invalid param for product with product id " + id);
        }

        Optional<Calendar> calendar = calendarRepository.findById(id);
        if (calendar.isPresent()) {
            List<String> imageUrls = calendar.get().getImages().stream()
                    .map(CalendarImage::getImageUrl)
                    .toList();

            CalendarDetailResponse calendarDetailResponse = CalendarDetailResponse
                    .builder()
                    .calendarId(calendar.get().getCalendarId())
                    .title(calendar.get().getTitle())
                    .image(calendar.get().getImage())
                    .category(CategoryMapper.INSTANCE.entityToDTO(calendar.get().getCategory()))
                    .description(calendar.get().getDescription())
                    .packages(mapPackages(calendar.get().getPackages()))
                    .images(imageUrls)
                    .build();

            LOGGER.info("Get calendar successfully with id {}", id);

            return calendarDetailResponse;
        } else {
            LOGGER.error("Can not find calendar with id {}", id);
            throw new ResourceNotFoundException("No calendar with id " + id);
        }
    }

    @Override
    public Page<CalendarDto> getCalendarsByCategoryId(int pageNo, int categoryId) {
        String cacheKey = REDIS_KEY + "_page_" + pageNo + "_category_" + categoryId;
        if(redisTemplate.hasKey(cacheKey)) {
            return (Page<CalendarDto>) redisTemplate.opsForValue().get(cacheKey);
        } else {
            Pageable pageable = PageRequest
                    .of(pageNo, ParamConstant.DEFAULT_PAGE_SIZE, Sort.by(ParamConstant.DEFAULT_SORT_FIELD)
                            .ascending());
            Page<Calendar> calendarPage = calendarRepository.findAllByCategoryCategoryId(categoryId, pageable);

            List<CalendarDto> calendarDTOs = calendarPage
                    .getContent()
                    .stream()
                    .map(CalendarMapper.INSTANCE::entityToDTO)
                    .toList();

            LOGGER.info("Get calendars list with category {} successfully with {} records", categoryId, calendarDTOs.size());

            return new PageImpl<>(calendarDTOs, pageable, calendarPage.getTotalElements());
        }
    }

    @Override
    public List<CalendarDto> getRelatedCalendars(int id) {
        Optional<Calendar> calendar = calendarRepository.findById(id);
        if (calendar.isPresent()) {
            LOGGER.info("Get successfully calendar with id {}", id);

            Category category = calendar.get().getCategory();
            List<CalendarDto> calendarDTOs = calendarRepository.findAllByCategoryOrderByCalendarIdAsc(category)
                    .stream()
                    .map(CalendarMapper.INSTANCE::entityToDTO)
                    .toList();

            LOGGER.info("Get related calendars with calendar id {} successfully with {} records", id, calendarDTOs.size());
            return calendarDTOs;
        } else {
            LOGGER.error("Can not find calendar with id {}", id);
            throw new ResourceNotFoundException("No calendar with id " + id);
        }
    }

    @Override
    public List<CalendarDto> getLatestCalendars() {
        List<CalendarDto> calendarDTOs = calendarRepository.findTop8ByOrderByUpdatedAtDesc()
                .stream()
                .map(CalendarMapper.INSTANCE::entityToDTO)
                .toList();

        LOGGER.info("Get latest calendars successfully with {} records", calendarDTOs.size());
        return calendarDTOs;
    }

    @Override
    public Calendar createCalendar(CalendarRequest calendarRequest) {
        Category category = categoryRepository.findById(calendarRequest.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));
        try {
            Calendar calendar = Calendar
                    .builder()
                    .title(calendarRequest.getTitle())
                    .description(calendarRequest.getDescription())
                    .category(category)
                    .build();

            List<Package> packages = calendarRequest.getPackages().stream()
                    .map(packageRequest -> Package.builder()
                            .price(packageRequest.getPackagePrice())
                            .durationValue(packageRequest.getPackageDurationValue())
                            .durationUnit(DurationUnitEnum.valueOf(packageRequest.getPackageDurationUnit()))
                            .packageType(PackageTypeEnum.valueOf(packageRequest.getPackageType()))
                            .linkNotion(packageRequest.getLinkNotion())
                            .calendar(calendar)
                            .build())
                    .toList();
            calendar.setPackages(packages);

            //TODO: Set default image
            calendar.setImage("imageUrl");

            calendarRepository.save(calendar);
            clearAllPageCacheKeys();
            LOGGER.info("Create calendar successfully with title {}", calendarRequest.getTitle());

            return calendar;
        } catch (Exception e) {
            LOGGER.error("Create calendar failed with exception {}", e.getMessage());

            throw new IllegalStateException("Calendar save failed");
        }
    }

    @Override
    public Page<CalendarAdminResponse> getCalendarsInAdminRole(int pageNo) {
        String cacheKey = REDIS_KEY + "_page_admin_" + pageNo;
        if(redisTemplate.hasKey(cacheKey)) {
            return (Page<CalendarAdminResponse>) redisTemplate.opsForValue().get(cacheKey);
        } else {
            Pageable pageable = PageRequest
                    .of(pageNo, ParamConstant.DEFAULT_PAGE_SIZE, Sort.by(ParamConstant.DEFAULT_SORT_FIELD)
                            .ascending());
            Page<Calendar> calendarPage = calendarRepository.findAll(pageable);

            List<CalendarAdminResponse> calendarDTOs = calendarPage
                    .getContent()
                    .stream()
                    .map(CalendarMapper.INSTANCE::entityToCalendarAdminResponse)
                    .toList();

            LOGGER.info("Get calendars list successfully with {} records", calendarDTOs.size());

            redisTemplate.opsForValue().set(cacheKey, new PageImpl<>(calendarDTOs, pageable, calendarPage.getTotalElements()));

            return new PageImpl<>(calendarDTOs, pageable, calendarPage.getTotalElements());
        }
    }

    @Override
    public void uploadCalendarImage(MultipartFile file, int id) {
        Optional<Calendar> calendar = calendarRepository.findById(id);
        if (calendar.isPresent()) {
            LOGGER.info("Get successfully calendar with id {}", id);

            try {
                String imageUrl = cloudinary.uploader()
                        .upload(file.getBytes(),
                                ObjectUtils.asMap(
                                        "folder", "NEWAY_CREATIVE",
                                        "public_id", UUID.randomUUID().toString()))
                        .get("url")
                        .toString();
                Calendar existingCalendar = calendar.get();
                existingCalendar.setImage(imageUrl);

                calendarRepository.save(existingCalendar);
            } catch (Exception e) {
                LOGGER.error("Upload calendar image failed with exception {}", e.getMessage());

                throw new IllegalStateException("Calendar save failed");
            }
        } else {
            LOGGER.error("Can not find calendar with id {}", id);
            throw new ResourceNotFoundException("No calendar with id " + id);
        }
    }

    @Override
    public CalendarDetailAdminResponse getCalendarDetailByIdInAdminRole(int id) {
        if (StringUtils.isEmpty(String.valueOf(id))) {
            LOGGER.error("Invalid param for product with product id {}", id);
            throw new InvalidParameterException("Invalid param for product with product id " + id);
        }

        Optional<Calendar> calendar = calendarRepository.findById(id);
        if (calendar.isPresent()) {
            CalendarDetailAdminResponse calendarDetailAdminResponse = CalendarDetailAdminResponse
                    .builder()
                    .calendarId(calendar.get().getCalendarId())
                    .title(calendar.get().getTitle())
                    .image(calendar.get().getImage())
                    .category(CategoryMapper.INSTANCE.entityToDTO(calendar.get().getCategory()))
                    .description(calendar.get().getDescription())
                    .isDelete(calendar.get().isDelete())
                    .packages(mapDetailPackages(calendar.get().getPackages()))
                    .build();

            LOGGER.info("Get calendar successfully with id {}", id);

            return calendarDetailAdminResponse;
        } else {
            LOGGER.error("Can not find calendar with id {}", id);
            throw new ResourceNotFoundException("No calendar with id " + id);
        }
    }

    private List<PackageResponse> mapPackages(List<Package> packages) {
        return packages.stream()
                .map(PackageMapper.INSTANCE::entityToResponse)
                .toList();
    }

    private List<PackageAdminResponse> mapDetailPackages(List<Package> packages) {
        return packages.stream()
                .map(PackageMapper.INSTANCE::entityToPackageAdminResponse)
                .toList();
    }

    private void clearAllPageCacheKeys() {
        Set<String> cacheKeys = redisTemplate.keys(REDIS_KEY + "_page_*");
        if (cacheKeys != null && !cacheKeys.isEmpty()) {
            redisTemplate.delete(cacheKeys);
            LOGGER.info("Cache keys for all pages cleared");
        }
    }
}

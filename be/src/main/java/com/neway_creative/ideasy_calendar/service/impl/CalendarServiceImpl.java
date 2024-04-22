package com.neway_creative.ideasy_calendar.service.impl;

import com.neway_creative.ideasy_calendar.constant.ParamConstant;
import com.neway_creative.ideasy_calendar.converter.CalendarMapper;
import com.neway_creative.ideasy_calendar.dto.CalendarDto;
import com.neway_creative.ideasy_calendar.dto.request.CalendarRequest;
import com.neway_creative.ideasy_calendar.entity.Calendar;
import com.neway_creative.ideasy_calendar.entity.Category;
import com.neway_creative.ideasy_calendar.repository.CalendarRepository;
import com.neway_creative.ideasy_calendar.repository.CategoryRepository;
import com.neway_creative.ideasy_calendar.service.CalendarService;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.modelmapper.ModelMapper;
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

import java.security.InvalidParameterException;
import java.util.List;
import java.util.Optional;
import java.util.Set;

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
    private final ModelMapper modelMapper;
    private final RedisTemplate redisTemplate;
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
    public CalendarDto getCalendarDtoById(int id) {
        if (StringUtils.isEmpty(String.valueOf(id))) {
            LOGGER.error("Invalid param for product with product id {}", id);
            throw new InvalidParameterException("Invalid param for product with product id " + id);
        }

        Optional<Calendar> calendar = calendarRepository.findById(id);
        if (calendar.isPresent()) {
            LOGGER.info("Get successfully calendar with id {}", id);

            return CalendarMapper.INSTANCE.entityToDTO(calendar.get());
        } else {
            LOGGER.error("Can not find calendar with id {}", id);
            throw new ResourceNotFoundException("No calendar with id " + id);
        }
    }

    @Override
    public Page<CalendarDto> getCalendarsByCategoryId(int pageNo, int categoryId) {
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

    @Override
    public List<CalendarDto> getRelatedCalendars(int id) {
        Optional<Calendar> calendar = calendarRepository.findById(id);
        if (calendar.isPresent()) {
            LOGGER.info("Get successfully calendar with id {}", id);

            Category category = calendar.get().getCategory();
            List<CalendarDto> calendarDTOs = calendarRepository.findTop4ByCategoryOrderByCalendarIdAsc(category)
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
    public void createCalendar(CalendarRequest calendarRequest) {

        Category category = categoryRepository.findById(calendarRequest.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));

        try {
            Calendar calendar = Calendar
                    .builder()
                    .title(calendarRequest.getTitle())
                    .description(calendarRequest.getDescription())
                    .linkNotion(calendarRequest.getLinkNotion())
                    .price(calendarRequest.getPrice())
                    .image(calendarRequest.getImage())
                    .category(category)
                    .build();

            calendarRepository.save(calendar);
            clearAllPageCacheKeys();
            LOGGER.info("Create calendar successfully with title {}", calendarRequest.getTitle());
        } catch (Exception e) {
            LOGGER.error("Create calendar failed with exception {}", e.getMessage());

            throw new IllegalStateException("Calendar save failed");
        }
    }

    private void clearAllPageCacheKeys() {
        Set<String> cacheKeys = redisTemplate.keys(REDIS_KEY + "_page_*");
        if (cacheKeys != null && !cacheKeys.isEmpty()) {
            redisTemplate.delete(cacheKeys);
            LOGGER.info("Cache keys for all pages cleared");
        }
    }
}

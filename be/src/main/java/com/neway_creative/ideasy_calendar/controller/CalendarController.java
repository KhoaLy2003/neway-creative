package com.neway_creative.ideasy_calendar.controller;

import com.neway_creative.ideasy_calendar.constant.MessageConstant;
import com.neway_creative.ideasy_calendar.constant.UriConstant;
import com.neway_creative.ideasy_calendar.dto.CalendarDto;
import com.neway_creative.ideasy_calendar.dto.request.CalendarRequest;
import com.neway_creative.ideasy_calendar.dto.response.BaseResponse;
import com.neway_creative.ideasy_calendar.dto.response.CalendarAdminResponse;
import com.neway_creative.ideasy_calendar.dto.response.CalendarDetailAdminResponse;
import com.neway_creative.ideasy_calendar.dto.response.CalendarDetailResponse;
import com.neway_creative.ideasy_calendar.entity.Calendar;
import com.neway_creative.ideasy_calendar.service.CalendarService;
import com.neway_creative.ideasy_calendar.utils.MessageLocalization;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.List;

import static com.neway_creative.ideasy_calendar.constant.MessageConstant.SUCCESSFUL_MESSAGE;


/**
 * CalendarController
 *
 * @author khoaly
 */
@RestController
@RequestMapping(UriConstant.CALENDAR_BASE_URI)
@RequiredArgsConstructor
public class CalendarController {

    private final CalendarService calendarService;
    private final MessageLocalization messageLocalization;

    @CrossOrigin
    @GetMapping
    public ResponseEntity<BaseResponse> getAllCalendars(@RequestParam int pageNo) {
        Page<CalendarDto> calendarDTOs = calendarService.getCalendars(pageNo);

        return ResponseEntity.status(HttpStatus.OK).body(new BaseResponse(HttpStatus.OK.value(), SUCCESSFUL_MESSAGE, calendarDTOs));
    }

    @CrossOrigin
    @GetMapping(UriConstant.CALENDAR_VARIABLE_URI)
    public ResponseEntity<BaseResponse> getCalendarByCalendarId(@PathVariable int calendarId) {
        CalendarDetailResponse calendarDetailResponse = calendarService.getCalendarDetailById(calendarId);

        return ResponseEntity.status(HttpStatus.OK).body(new BaseResponse(HttpStatus.OK.value(), SUCCESSFUL_MESSAGE, calendarDetailResponse));
    }

    @CrossOrigin
    @GetMapping(UriConstant.CALENDAR_CATEGORY_URI)
    public ResponseEntity<BaseResponse> getAllCalendarsByCategoryId(@RequestParam int categoryId, @RequestParam int pageNo) {
        Page<CalendarDto> calendarDTOs = calendarService.getCalendarsByCategoryId(pageNo, categoryId);

        return ResponseEntity.status(HttpStatus.OK).body(new BaseResponse(HttpStatus.OK.value(), SUCCESSFUL_MESSAGE, calendarDTOs));
    }

    @CrossOrigin
    @GetMapping(UriConstant.CALENDAR_RELATED_URI)
    public ResponseEntity<BaseResponse> getRelatedCalendars(@PathVariable int calendarId) {
        List<CalendarDto> calendarDTOs = calendarService.getRelatedCalendars(calendarId);

        return ResponseEntity.status(HttpStatus.OK).body(new BaseResponse(HttpStatus.OK.value(), SUCCESSFUL_MESSAGE, calendarDTOs));
    }

    @CrossOrigin
    @GetMapping(UriConstant.CALENDAR_LATEST_URI)
    public ResponseEntity<BaseResponse> getLatestCalendars() {
        List<CalendarDto> calendarDTOs = calendarService.getLatestCalendars();

        return ResponseEntity.status(HttpStatus.OK).body(new BaseResponse(HttpStatus.OK.value(), SUCCESSFUL_MESSAGE, calendarDTOs));
    }

    @PostMapping(UriConstant.CALENDAR_CREATE_URI)
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<BaseResponse> createCalendar(@Valid @RequestBody CalendarRequest calendarRequest,
                                                       BindingResult result) {
        if (result.hasErrors()) {
            List<String> errorMessages = result.getFieldErrors()
                    .stream()
                    .map(FieldError::getDefaultMessage)
                    .toList();

            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new BaseResponse(HttpStatus.BAD_REQUEST.value(), messageLocalization.getLocalizedMessage(MessageConstant.CREATE_CALENDAR_FAILED), errorMessages));
        }
        Calendar newCalendar = calendarService.createCalendar(calendarRequest);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new BaseResponse(HttpStatus.CREATED.value(), messageLocalization.getLocalizedMessage(MessageConstant.CREATE_CALENDAR_SUCCESSFULLY), newCalendar.getCalendarId()));
    }

    @PostMapping(UriConstant.CALENDAR_UPLOAD_URI)
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<BaseResponse> uploadCalendarImage(@RequestParam("id") int id, @RequestParam MultipartFile imageFile) {
        if (imageFile == null || imageFile.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new BaseResponse(HttpStatus.BAD_REQUEST.value(), messageLocalization.getLocalizedMessage(MessageConstant.UPLOAD_CALENDAR_IMAGE_FAILED), "File is empty or not provided"));
        }
        calendarService.uploadCalendarImage(imageFile, id);
        return ResponseEntity.status(HttpStatus.OK)
                .body(new BaseResponse(HttpStatus.OK.value(), messageLocalization.getLocalizedMessage(MessageConstant.UPLOAD_CALENDAR_IMAGE_SUCCESSFULLY), id));
    }

    @GetMapping(UriConstant.CALENDAR_ADMIN_LIST_URI)
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<BaseResponse> getAllCalendarsInAdminRole(@RequestParam int pageNo) {
        Page<CalendarAdminResponse> calendarAdminResponses = calendarService.getCalendarsInAdminRole(pageNo);

        return ResponseEntity.status(HttpStatus.OK).body(new BaseResponse(HttpStatus.OK.value(), SUCCESSFUL_MESSAGE, calendarAdminResponses));
    }

    @GetMapping(UriConstant.CALENDAR_ADMIN_DETAIL_URI)
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<BaseResponse> getCalendarByCalendarIdInAdminRole(@PathVariable int calendarId) {
        CalendarDetailAdminResponse calendarDetailResponse = calendarService.getCalendarDetailByIdInAdminRole(calendarId);

        return ResponseEntity.status(HttpStatus.OK).body(new BaseResponse(HttpStatus.OK.value(), SUCCESSFUL_MESSAGE, calendarDetailResponse));
    }
}

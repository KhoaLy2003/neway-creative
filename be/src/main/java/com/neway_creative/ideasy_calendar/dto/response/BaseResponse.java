package com.neway_creative.ideasy_calendar.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

/**
 * BaseResponse
 *
 * @author khoaly
 */
@Getter
@Setter
@AllArgsConstructor
public class BaseResponse {
    private int code;
    private String message;
    private Object data;
}

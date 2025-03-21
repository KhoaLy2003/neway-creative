package com.neway_creative.ideasy_calendar.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

/**
 * BaseExceptionContent
 *
 * @author khoaly
 */
@Getter
@Setter
@AllArgsConstructor
public class BaseExceptionContent {
    private int status;
    private String message;
    private String content;
}

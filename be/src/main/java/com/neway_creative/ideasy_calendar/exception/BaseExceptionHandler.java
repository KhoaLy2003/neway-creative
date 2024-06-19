package com.neway_creative.ideasy_calendar.exception;

import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import javax.persistence.EntityExistsException;
import java.security.InvalidParameterException;

/**
 * BaseExceptionHandler
 *
 * @author khoaly
 */
@ControllerAdvice
public class BaseExceptionHandler {
    /**
     * Handle resource not found exception response entity.
     *
     * @param exception the exception
     * @param request   the request
     * @return the response entity
     */
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<BaseExceptionContent> handleResourceNotFoundException(ResourceNotFoundException exception, WebRequest request) {
        BaseExceptionContent error = new BaseExceptionContent(HttpStatus.NOT_FOUND.value(), exception.getMessage(),
                request.getDescription(false));
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }

    /**
     * Handle invalid parameter exception response entity.
     *
     * @param exception the exception
     * @param request   the request
     * @return the response entity
     */
    @ExceptionHandler(InvalidParameterException.class)
    public ResponseEntity<BaseExceptionContent> handleInvalidParameterException(InvalidParameterException exception, WebRequest request) {
        BaseExceptionContent error = new BaseExceptionContent(HttpStatus.BAD_REQUEST.value(), exception.getMessage(),
                request.getDescription(false));
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    /**
     * Handle entity exists response entity.
     *
     * @param exception the exception
     * @param request   the request
     * @return the response entity
     */
    @ExceptionHandler(EntityExistsException.class)
    public ResponseEntity<BaseExceptionContent> handleEntityExistsException(EntityExistsException exception,WebRequest request) {
        BaseExceptionContent error = new BaseExceptionContent(HttpStatus.BAD_REQUEST.value(), exception.getMessage(),
                request.getDescription(false));
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(DuplicateEmailException.class)
    public ResponseEntity<BaseExceptionContent> handleDuplicateEmailException(DuplicateEmailException exception,WebRequest request) {
        BaseExceptionContent error = new BaseExceptionContent(HttpStatus.BAD_REQUEST.value(), exception.getMessage(),
                request.getDescription(false));
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(AccountNotVerifiedException.class)
    public ResponseEntity<BaseExceptionContent> handleAccountNotVerifiedException(AccountNotVerifiedException exception,WebRequest request) {
        BaseExceptionContent error = new BaseExceptionContent(HttpStatus.FORBIDDEN.value(), exception.getMessage(),
                request.getDescription(false));
        return new ResponseEntity<>(error, HttpStatus.FORBIDDEN);
    }
}

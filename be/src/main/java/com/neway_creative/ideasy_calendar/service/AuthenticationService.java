package com.neway_creative.ideasy_calendar.service;

import com.neway_creative.ideasy_calendar.dto.request.LoginRequest;
import com.neway_creative.ideasy_calendar.dto.request.RegisterRequest;

/**
 * AuthenticationService
 *
 * @author khoaly
 */
public interface AuthenticationService {
    void registerNewAccount(RegisterRequest request);
    String authenticateAccount(LoginRequest request);
}

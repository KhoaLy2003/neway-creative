package com.neway_creative.ideasy_calendar.service;

import com.neway_creative.ideasy_calendar.dto.request.LoginRequest;
import com.neway_creative.ideasy_calendar.dto.request.RegisterRequest;
import com.neway_creative.ideasy_calendar.dto.request.VerifyAccountRequest;
import com.neway_creative.ideasy_calendar.dto.response.LoginResponse;

/**
 * AuthenticationService
 *
 * @author khoaly
 */
public interface AuthenticationService {
    /**
     * Register new account.
     *
     * @param request the request
     */
    void registerNewAccount(RegisterRequest request);

    /**
     * Authenticate account login response.
     *
     * @param request the request
     * @return the login response
     */
    LoginResponse authenticateAccount(LoginRequest request);

    /**
     * Verify account boolean.
     *
     * @param verifyAccountRequest the verify account request
     * @return the boolean
     */
    boolean verifyAccount(VerifyAccountRequest verifyAccountRequest);

    /**
     * Regenerate otp.
     *
     * @param email the email
     */
    void regenerateOtp(String email);
}

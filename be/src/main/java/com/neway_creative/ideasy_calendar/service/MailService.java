package com.neway_creative.ideasy_calendar.service;

/**
 * MailService
 *
 * @author khoaly
 */
public interface MailService {
    void sendVerificationEmail(String recipientEmail, String otp);
}

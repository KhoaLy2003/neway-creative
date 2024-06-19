package com.neway_creative.ideasy_calendar.service;

import com.neway_creative.ideasy_calendar.entity.Package;

import java.util.List;

/**
 * MailService
 *
 * @author khoaly
 */
public interface MailService {
    void sendVerificationEmail(String recipientEmail, String otp);
    void sendMailTest();
    void sendMailLinkNotion(String recipientEmail, List<Package> packages);
    void sendMailNewOrderNotice(String customerEmail, String customerName);
}

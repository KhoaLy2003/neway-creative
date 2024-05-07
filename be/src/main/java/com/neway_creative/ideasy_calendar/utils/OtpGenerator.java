package com.neway_creative.ideasy_calendar.utils;

import org.springframework.stereotype.Component;

import java.util.Random;

@Component
public class OtpGenerator {
    private static final int OTP_LENGTH = 4;
    public String generateOTP() {
        Random random = new Random();
        StringBuilder otp = new StringBuilder(OTP_LENGTH);
        for (int i = 0; i < OTP_LENGTH; i++) {
            otp.append(random.nextInt(10));
        }
        return otp.toString();
    }
}

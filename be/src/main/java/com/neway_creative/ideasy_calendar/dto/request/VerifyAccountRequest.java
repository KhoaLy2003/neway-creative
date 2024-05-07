package com.neway_creative.ideasy_calendar.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class VerifyAccountRequest implements Serializable {
    @NotNull(message = "Email must not be null")
    @Email(message = "Email must be a valid email address")
    private String email;

    @NotNull(message = "Otp must not be null")
    private String otp;
}

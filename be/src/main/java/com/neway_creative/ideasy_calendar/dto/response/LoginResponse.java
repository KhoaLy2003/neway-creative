package com.neway_creative.ideasy_calendar.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@Builder
public class LoginResponse implements Serializable {
    private String name;
    private String email;
    private String token;
    private String role;
}

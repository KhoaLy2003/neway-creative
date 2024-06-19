package com.neway_creative.ideasy_calendar.dto.response;

import com.neway_creative.ideasy_calendar.enumeration.StatusEnum;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CustomerViewAdminResponse {
    private int customerId;
    private String name;
    private String emailAddress;
    private StatusEnum status;
}

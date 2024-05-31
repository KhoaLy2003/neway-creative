package com.neway_creative.ideasy_calendar.dto.response;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@NoArgsConstructor
@Builder
@Getter
public class CustomerListResponse {
    private List<CustomerViewAdminResponse> customers;

    public CustomerListResponse(List<CustomerViewAdminResponse> customers) {
        this.customers = customers;
    }

    public List<CustomerViewAdminResponse> getCustomers() {
        return customers;
    }

    public void setCustomers(List<CustomerViewAdminResponse> customers) {
        this.customers = customers;
    }
}

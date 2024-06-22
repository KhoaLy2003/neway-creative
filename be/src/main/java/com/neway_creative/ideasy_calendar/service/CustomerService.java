package com.neway_creative.ideasy_calendar.service;

import com.neway_creative.ideasy_calendar.dto.response.CustomerViewAdminResponse;

import java.util.List;

public interface CustomerService {
    List<CustomerViewAdminResponse> findAllCustomerViewAdminResponse();

}

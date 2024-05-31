package com.neway_creative.ideasy_calendar.service;

import com.neway_creative.ideasy_calendar.dto.response.CustomerViewAdminResponse;
import com.neway_creative.ideasy_calendar.entity.Customer;
import com.neway_creative.ideasy_calendar.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.stream.Collectors;

public interface CustomerService {
    List<CustomerViewAdminResponse> findAllCustomerViewAdminResponse();

}

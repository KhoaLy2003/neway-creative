package com.neway_creative.ideasy_calendar.service.impl;

import com.neway_creative.ideasy_calendar.dto.response.CustomerViewAdminResponse;
import com.neway_creative.ideasy_calendar.repository.CustomerRepository;
import com.neway_creative.ideasy_calendar.service.CustomerService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * CustomerServiceImpl
 *
 * @author khoaly
 */
@Service
public class CustomerServiceImpl implements CustomerService {

    private static final Logger LOGGER = LoggerFactory.getLogger(CustomerServiceImpl.class);

    @Autowired
    private CustomerRepository customerRepository;

    @Override
    public List<CustomerViewAdminResponse> findAllCustomerViewAdminResponse() {
        return customerRepository.findAllCustomerViewAdminResponse();
    }
}


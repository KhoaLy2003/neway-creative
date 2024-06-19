package com.neway_creative.ideasy_calendar.service.impl;

import com.neway_creative.ideasy_calendar.repository.OrderRepository;
import com.neway_creative.ideasy_calendar.service.OrderService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * OrderServiceImpl
 *
 * @author khoaly
 */
@Service
public class OrderServiceImpl implements OrderService {
    private static final Logger LOGGER = LoggerFactory.getLogger(OrderServiceImpl.class);

    @Autowired private OrderRepository orderRepository;
}

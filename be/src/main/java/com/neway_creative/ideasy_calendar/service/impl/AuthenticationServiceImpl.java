package com.neway_creative.ideasy_calendar.service.impl;

import com.neway_creative.ideasy_calendar.constant.MessageConstant;
import com.neway_creative.ideasy_calendar.dto.request.LoginRequest;
import com.neway_creative.ideasy_calendar.dto.request.RegisterRequest;
import com.neway_creative.ideasy_calendar.entity.Customer;
import com.neway_creative.ideasy_calendar.enumeration.RoleEnum;
import com.neway_creative.ideasy_calendar.enumeration.StatusEnum;
import com.neway_creative.ideasy_calendar.exception.DuplicateEmailException;
import com.neway_creative.ideasy_calendar.repository.CustomerRepository;
import com.neway_creative.ideasy_calendar.service.AuthenticationService;
import com.neway_creative.ideasy_calendar.utils.JwtService;
import com.neway_creative.ideasy_calendar.utils.MessageLocalization;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.text.MessageFormat;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {
    private static final Logger LOGGER = LoggerFactory.getLogger(AuthenticationServiceImpl.class);
    private final CustomerRepository customerRepository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final MessageLocalization messageLocalization;

    public void registerNewAccount(RegisterRequest request) {

        if (customerRepository.existsByEmailAddress(request.getEmail())) {
            throw new DuplicateEmailException(MessageFormat.format(
                    messageLocalization.getLocalizedMessage(MessageConstant.REGISTER_FAILED), request.getEmail()));
        }

        Customer newCustomer = Customer
                .builder()
                .name(request.getName())
                .emailAddress(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .status(StatusEnum.INACTIVE)
                .role(RoleEnum.CUSTOMER)
                .build();

        customerRepository.save(newCustomer);
    }

    public String authenticateAccount(LoginRequest request) {
        Optional<Customer> existingUser = customerRepository.findByEmailAddress(request.getEmail());
        if (existingUser.isEmpty()) {
            throw new ResourceNotFoundException(MessageFormat.format(
                    messageLocalization.getLocalizedMessage(MessageConstant.LOGIN_FAILED), request.getEmail()));
        } else {
            Customer currentCustomer = existingUser.get();

            if (!passwordEncoder.matches(request.getPassword(), currentCustomer.getPassword())) {
                throw new BadCredentialsException("Login fail");
            }

            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                    request.getEmail(), request.getPassword(),
                    currentCustomer.getAuthorities()
            );

            authenticationManager.authenticate(authenticationToken);
            return jwtService.generateToken(existingUser.get());
        }
    }
}

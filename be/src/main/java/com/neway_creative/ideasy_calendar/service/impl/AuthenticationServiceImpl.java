package com.neway_creative.ideasy_calendar.service.impl;

import com.neway_creative.ideasy_calendar.constant.MessageConstant;
import com.neway_creative.ideasy_calendar.dto.request.LoginRequest;
import com.neway_creative.ideasy_calendar.dto.request.RegisterRequest;
import com.neway_creative.ideasy_calendar.dto.request.VerifyAccountRequest;
import com.neway_creative.ideasy_calendar.dto.response.LoginResponse;
import com.neway_creative.ideasy_calendar.entity.Customer;
import com.neway_creative.ideasy_calendar.enumeration.RoleEnum;
import com.neway_creative.ideasy_calendar.enumeration.StatusEnum;
import com.neway_creative.ideasy_calendar.exception.DuplicateEmailException;
import com.neway_creative.ideasy_calendar.repository.CustomerRepository;
import com.neway_creative.ideasy_calendar.service.AuthenticationService;
import com.neway_creative.ideasy_calendar.service.MailService;
import com.neway_creative.ideasy_calendar.utils.JwtService;
import com.neway_creative.ideasy_calendar.utils.MessageLocalization;
import com.neway_creative.ideasy_calendar.utils.OtpGenerator;
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
import java.time.Duration;
import java.time.LocalDateTime;
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
    private final OtpGenerator otpGenerator;
    private final MailService mailService;

    @Override
    public void registerNewAccount(RegisterRequest request) {
        if (customerRepository.existsByEmailAddress(request.getEmail())) {
            throw new DuplicateEmailException(MessageFormat.format(
                    messageLocalization.getLocalizedMessage(MessageConstant.REGISTER_FAILED), request.getEmail()));
        }

        String otp = otpGenerator.generateOTP();
        mailService.sendVerificationEmail(request.getEmail(), otp);
        LOGGER.info("Send verification email successfully to account with email {}", request.getEmail());

        Customer newCustomer = Customer
                .builder()
                .name(request.getName())
                .emailAddress(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .status(StatusEnum.INACTIVE)
                .role(RoleEnum.CUSTOMER)
                .otp(otp)
                .otpGeneratedTime(LocalDateTime.now())
                .build();

        customerRepository.save(newCustomer);
    }

    @Override
    public LoginResponse authenticateAccount(LoginRequest request) {
        Optional<Customer> existingUser = customerRepository.findByEmailAddress(request.getEmail());
        if (existingUser.isEmpty()) {
            throw new ResourceNotFoundException(MessageFormat.format(
                    messageLocalization.getLocalizedMessage(MessageConstant.NO_ACCOUNT_WITH_THIS_EMAIL), request.getEmail()));
        } else {
            Customer currentCustomer = existingUser.get();

            if (currentCustomer.getStatus().equals(StatusEnum.INACTIVE)) {
                throw new ResourceNotFoundException(MessageFormat.format(
                        messageLocalization.getLocalizedMessage(MessageConstant.ACCOUNT_NOT_VERIFIED), request.getEmail()));
            }

            if (!passwordEncoder.matches(request.getPassword(), currentCustomer.getPassword())) {
                throw new BadCredentialsException("Login fail");
            }

            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                    request.getEmail(), request.getPassword(),
                    currentCustomer.getAuthorities()
            );

            authenticationManager.authenticate(authenticationToken);

            return LoginResponse
                    .builder()
                    .email(request.getEmail())
                    .token(jwtService.generateToken(existingUser.get()))
                    .role(currentCustomer.getRole().name())
                    .build();
        }
    }

    @Override
    public boolean verifyAccount(VerifyAccountRequest verifyAccountRequest) {
        String email = verifyAccountRequest.getEmail();
        String otp = verifyAccountRequest.getOtp();

        Optional<Customer> existingUser = customerRepository.findByEmailAddress(email);
        if (existingUser.isEmpty()) {
            throw new ResourceNotFoundException(MessageFormat.format(
                    messageLocalization.getLocalizedMessage(MessageConstant.NO_ACCOUNT_WITH_THIS_EMAIL), email));
        } else {
            Customer currentCustomer = existingUser.get();

            if (currentCustomer.getOtp().equals(otp) && Duration.between(currentCustomer.getOtpGeneratedTime(),
                    LocalDateTime.now()).getSeconds() < (60 * 5)) {
                currentCustomer.setStatus(StatusEnum.ACTIVE);
                customerRepository.save(currentCustomer);

                LOGGER.info("Account with email {} has been verified successfully", email);
                return true;
            }
            return false;
        }
    }

    @Override
    public void regenerateOtp(String email) {
        Optional<Customer> existingUser = customerRepository.findByEmailAddress(email);
        if (existingUser.isEmpty()) {
            throw new ResourceNotFoundException(MessageFormat.format(
                    messageLocalization.getLocalizedMessage(MessageConstant.NO_ACCOUNT_WITH_THIS_EMAIL), email));
        } else {
            Customer currentCustomer = existingUser.get();

            String otp = otpGenerator.generateOTP();
            mailService.sendVerificationEmail(email, otp);
            LOGGER.info("Send verification email successfully to account with email {}", email);

            currentCustomer.setOtp(otp);
            currentCustomer.setOtpGeneratedTime(LocalDateTime.now());
            customerRepository.save(currentCustomer);

            LOGGER.info("Account with email {} has been regenerated new otp successfully", email);
        }
    }
}

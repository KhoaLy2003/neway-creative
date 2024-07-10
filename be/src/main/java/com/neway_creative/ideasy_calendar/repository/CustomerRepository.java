package com.neway_creative.ideasy_calendar.repository;

import com.neway_creative.ideasy_calendar.dto.response.CustomerViewAdminResponse;
import com.neway_creative.ideasy_calendar.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * CustomerRepository
 *
 * @author khoaly
 */
@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer> {
    Optional<Customer> findByEmailAddress(String email);
    boolean existsByEmailAddress(String email);
    @Query("SELECT new com.neway_creative.ideasy_calendar.dto.response.CustomerViewAdminResponse(c.customerId, c.name, c.emailAddress, c.status) FROM Customer c WHERE c.role = 'CUSTOMER'")
    List<CustomerViewAdminResponse> findAllCustomerViewAdminResponse();
    Optional<Customer> findByFacebookUrlAndName(String facebookUrl, String name);
}

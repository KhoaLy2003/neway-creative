package com.neway_creative.ideasy_calendar.repository;

import com.neway_creative.ideasy_calendar.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * PaymentRepository
 *
 * @author khoaly
 */
@Repository
public interface PaymentRepository extends JpaRepository<Payment, Integer> {
}

package com.neway_creative.ideasy_calendar.repository;


import com.neway_creative.ideasy_calendar.entity.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * OrderDetailRepository
 *
 * @author khoaly
 */
@Repository
public interface OrderDetailRepository extends JpaRepository<OrderDetail, Integer> {
}

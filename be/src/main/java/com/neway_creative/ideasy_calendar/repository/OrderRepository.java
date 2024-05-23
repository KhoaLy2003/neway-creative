package com.neway_creative.ideasy_calendar.repository;

import com.neway_creative.ideasy_calendar.entity.Order;
import com.neway_creative.ideasy_calendar.entity.Package;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * OrderRepository
 *
 * @author khoaly
 */
@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {
    @Query("SELECT p.packageId FROM Order o JOIN o.packages p WHERE o.orderId = :orderId")
    List<Integer> findPackageIdsByOrderId(int orderId);
}

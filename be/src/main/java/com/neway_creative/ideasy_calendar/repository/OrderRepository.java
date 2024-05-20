package com.neway_creative.ideasy_calendar.repository;

import com.neway_creative.ideasy_calendar.entity.Order;
import com.neway_creative.ideasy_calendar.entity.Package;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * OrderRepository
 *
 * @author khoaly
 */
@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {
    @Query("SELECT o FROM Order o WHERE o.calendarPackage.packageId = ?1")
    Order findByPackageId(int packageId);
}

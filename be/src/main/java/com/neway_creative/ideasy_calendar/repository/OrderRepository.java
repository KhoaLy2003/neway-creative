package com.neway_creative.ideasy_calendar.repository;

import com.neway_creative.ideasy_calendar.entity.Order;
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

    @Query("SELECT o FROM Order o WHERE o.customer.customerId = ?1 ORDER BY o.updatedAt desc")
    List<Order> findByCustomerId(int customerId);
    @Query("SELECT o FROM Order o WHERE o.customer.customerId = ?1 AND o.orderId = ?2")
    Order findByCustomerIdAndOrderId(int customerId, int orderId);
    @Query("SELECT p.packageId FROM Order o JOIN o.packages p WHERE o.orderId = :orderId")
    List<Integer> findPackageIdsByOrderId(int orderId);
    List<Order> findAllByOrderByUpdatedAtDesc();
}

package com.neway_creative.ideasy_calendar.repository;

import com.neway_creative.ideasy_calendar.entity.Customer;
import com.neway_creative.ideasy_calendar.entity.Order;
import com.neway_creative.ideasy_calendar.enumeration.OrderEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

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
    List<Order> findAllByOrderByCreatedAt();
    Optional<Order> findByCustomerAndOrderDate(Customer customer, LocalDateTime orderDate);
    @Query("SELECT SUM(o.price) FROM Order o WHERE o.status = :status")
    Long getTotalPriceByStatus(@Param("status") OrderEnum status);
}

package com.neway_creative.ideasy_calendar.repository;

import com.neway_creative.ideasy_calendar.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * CategoryRepository
 *
 * @author khoaly
 */
@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {
    List<Category> findByIsDeleteFalse();
}

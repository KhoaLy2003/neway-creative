package com.neway_creative.ideasy_calendar.repository;

import com.neway_creative.ideasy_calendar.entity.Calendar;
import com.neway_creative.ideasy_calendar.entity.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * CalendarRepository
 *
 * @author khoaly
 */
@Repository
public interface CalendarRepository extends JpaRepository<Calendar, Integer> {
    Page<Calendar> findAllByCategoryCategoryId(int categoryId, Pageable pageable);
    List<Calendar> findTop4ByCategoryOrderByCalendarIdAsc(Category category);
    List<Calendar> findTop8ByOrderByUpdatedAtDesc();
    List<Calendar> findAllByTitleContaining(String title);
}

package com.neway_creative.ideasy_calendar.repository;

import com.neway_creative.ideasy_calendar.entity.Package;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * PackageRepository
 *
 * @author khoaly
 */
@Repository
public interface PackageRepository extends JpaRepository<Package, Integer> {
}

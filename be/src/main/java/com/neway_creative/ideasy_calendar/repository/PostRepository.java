package com.neway_creative.ideasy_calendar.repository;

import com.neway_creative.ideasy_calendar.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends JpaRepository<Post, Integer> {
}

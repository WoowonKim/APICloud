package com.billow.model.repository.addition;

import com.billow.domain.entity.addition.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByProgramId(Long programId);
}
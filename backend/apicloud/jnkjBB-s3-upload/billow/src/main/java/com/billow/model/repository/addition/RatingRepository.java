package com.billow.model.repository.addition;

import com.billow.domain.entity.addition.Rating;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RatingRepository extends JpaRepository<Rating, Long> {
    List<Rating> findByUser_Id(Long userId);

    Rating findByUser_IdAndProgram_Id(Long userId, Long programId);
}
package com.billow.model.repository.program;

import com.billow.domain.entity.program.ConditionRecommend;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConditionRecommendRepository extends JpaRepository<ConditionRecommend, Long>, ConditionRecommendCustomRepository {
}
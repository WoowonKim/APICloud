package com.billow.model.repository.program;

import com.billow.domain.entity.program.GenderAgeViewer;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GenderAgeViewerCustomRepository {

    List<GenderAgeViewer> findTop5ByGenderAge(Integer age, String gender);
}
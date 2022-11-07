package com.billow.model.repository.program;

import com.billow.domain.entity.program.GenderAgeViewer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GenderAgeViewerRepository extends JpaRepository<GenderAgeViewer, Long>, GenderAgeViewerCustomRepository {

    GenderAgeViewer findByProgramTitle(String programTitle);
}
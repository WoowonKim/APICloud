package com.billow.model.service.program;

import com.billow.domain.entity.program.GenderAgeViewer;
import com.billow.model.repository.program.GenderAgeViewerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class GenderAgeViewerService {
    private final GenderAgeViewerRepository genderAgeViewerRepository;

    public void save(GenderAgeViewer program) {
        genderAgeViewerRepository.save(program);
    }
}
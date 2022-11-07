package com.billow.model.repository.program;

import com.billow.domain.entity.addition.Rating;
import com.billow.domain.entity.program.Program;

import java.util.List;

public interface ProgramCustomRepository {

    List<Program> findPopularProgram();

    List<Rating> findGenderAgeRecommend(Long userId, Integer age, String gender, Long id, Long id1, Long id2, Long id3, Long id4);
}
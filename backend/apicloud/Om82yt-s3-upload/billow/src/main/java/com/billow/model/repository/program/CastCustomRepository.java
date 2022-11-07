package com.billow.model.repository.program;

import com.billow.domain.entity.program.Cast;

import java.util.List;

public interface CastCustomRepository {
    List<Cast> findByActorName(Long userId, String actorName);

    List<String> findActorName(Long userId);
}
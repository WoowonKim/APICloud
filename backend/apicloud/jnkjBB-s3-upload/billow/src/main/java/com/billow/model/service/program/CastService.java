package com.billow.model.service.program;

import com.billow.domain.dto.program.CastResponse;
import com.billow.domain.entity.program.Cast;
import com.billow.model.repository.program.CastRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class CastService {
    private final CastRepository castRepository;

    public void save(Cast cast) {
        castRepository.save(cast);
    }

    public List<Cast> findByProgram_Id(Long id) {
        return castRepository.findByProgram_Id(id);
    }

    public List<CastResponse> selectCast(Long programId) {
        List<Cast> castList = castRepository.findByProgram_Id(programId);
        return castList
                .stream()
                .map(cast -> CastResponse.builder()
                        .actorName(cast.getActorName())
                        .playName(cast.getPlayName())
                        .castImageUrl(cast.getImgUrl())
                        .build())
                .collect(Collectors.toList());
    }
}
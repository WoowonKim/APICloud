package com.billow.model.repository.program;

import com.billow.domain.entity.program.Genre;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GenreRepository extends JpaRepository<Genre, Long> {
    List<Genre> findByProgramId(Long programId);
}
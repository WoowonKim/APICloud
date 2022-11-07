package com.billow.model.repository.program;

import com.billow.domain.entity.program.Cast;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CastRepository extends JpaRepository<Cast, Long>, CastCustomRepository {

    List<Cast> findByProgram_Id(Long id);
}
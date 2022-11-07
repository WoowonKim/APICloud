package com.billow.model.repository.organization;

import com.billow.domain.entity.organization.ProgramOrganization;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ProgramOrganizationCustomRepository {
    List<ProgramOrganization> findByProgram_IdAndBroadcastingTime(Long programId, LocalDate date);
}
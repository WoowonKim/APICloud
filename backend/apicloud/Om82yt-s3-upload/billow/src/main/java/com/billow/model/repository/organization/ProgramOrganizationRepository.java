package com.billow.model.repository.organization;

import com.billow.domain.entity.organization.ProgramOrganization;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface ProgramOrganizationRepository extends JpaRepository<ProgramOrganization, Long>, ProgramOrganizationCustomRepository {

    List<ProgramOrganization> findByProgram_Id(Long id);

    List<ProgramOrganization> findByBroadcastingTimeBetween(Date date, Date now);

    List<ProgramOrganization> findByBroadcastingTimeBefore(Date date);
}
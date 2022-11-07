package com.billow.model.repository.addition;

import com.billow.domain.entity.addition.BroadcastingAlarm;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BroadcastingAlarmRepository extends JpaRepository<BroadcastingAlarm, Long> {
    List<BroadcastingAlarm> findByUser_Id(Long userId);

    Optional<BroadcastingAlarm> findByUser_IdAndProgramOrganization_Id(Long userId, Long programOrganizationId);

    List<BroadcastingAlarm> findByProgramOrganization_Id(Long programOrganizationId);
}
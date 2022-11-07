package com.billow.model.service.organization;

import com.billow.domain.dto.organization.OrganizationListResponse;
import com.billow.domain.dto.organization.OrganizationResponse;
import com.billow.domain.entity.organization.ProgramOrganization;
import com.billow.model.repository.organization.ProgramOrganizationRepository;
import com.billow.util.DateUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.format.TextStyle;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class ProgramOrganozationService {

    private final ProgramOrganizationRepository programOrganizationRepository;

    public void save(ProgramOrganization programOrganization) {
        programOrganizationRepository.save(programOrganization);
    }

    public List<ProgramOrganization> findByProgram_Id(Long id) {
        return programOrganizationRepository.findByProgram_Id(id);
    }

    public List<ProgramOrganization> findByBroadcastingTimeBefore(Date date) {
        return programOrganizationRepository.findByBroadcastingTimeBefore(date);
    }

    public void delete(ProgramOrganization programOrganization) {
        programOrganizationRepository.delete(programOrganization);
    }

    public List<OrganizationListResponse> selectProgramOrganization(Long programId) {
        LocalDate date = LocalDate.now();
        List<OrganizationListResponse> list = new ArrayList<>();
        for (int day = 0; day < 7; day++) {
            List<ProgramOrganization> programOrganizationList = programOrganizationRepository.findByProgram_IdAndBroadcastingTime(programId, date.plusDays(day));
            if (programOrganizationList.size() == 0) {
                DayOfWeek dayOfWeek = date.plusDays(day).getDayOfWeek();
                list.add(OrganizationListResponse.builder()
                        .day(DateUtil.toYYYY_MM_DD(date.plusDays(day)) + " (" + dayOfWeek.getDisplayName(TextStyle.SHORT, Locale.KOREAN) + ")")
                        .build());
                continue;
            }

            List<OrganizationResponse> organizationResponseList = programOrganizationList
                    .stream()
                    .map(organization -> OrganizationResponse.builder()
                            .programOrganizationId(organization.getId())
                            .broadcastingDay(DateUtil.toYYYY_MM_DD(organization.getBroadcastingTime()) + " " + organization.getBroadcastingDay())
                            .broadcastingTime(DateUtil.toHH_mm(organization.getBroadcastingTime()))
                            .broadcastingEpisode(organization.getBroadcastingEpisode())
                            .broadcastingAge(organization.getBroadcastingAge())
                            .broadcastingRerun(organization.getBroadcastingRerun())
                            .broadcastingStation(organization.getBroadcastingStation())
                            .build())
                    .collect(Collectors.toList());
            list.add(OrganizationListResponse.builder()
                    .day(DateUtil.toYYYY_MM_DD(programOrganizationList.get(0).getBroadcastingTime()) + " " + programOrganizationList.get(0).getBroadcastingDay())
                    .organizationResponseList(organizationResponseList)
                    .build());
        }
        for (OrganizationListResponse organization : list) {
            if (organization.getOrganizationResponseList() != null) {
                return list;
            }
        }
        return new ArrayList<>();
    }
}
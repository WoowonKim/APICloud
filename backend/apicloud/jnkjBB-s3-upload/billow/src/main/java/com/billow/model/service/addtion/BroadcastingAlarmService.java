package com.billow.model.service.addtion;

import com.billow.domain.dto.addtion.BroadcastingAlarmResponse;
import com.billow.domain.entity.addition.BroadcastingAlarm;
import com.billow.domain.entity.organization.ProgramOrganization;
import com.billow.domain.entity.user.User;
import com.billow.exception.NotFoundException;
import com.billow.model.repository.addition.BroadcastingAlarmRepository;
import com.billow.model.repository.organization.ProgramOrganizationRepository;
import com.billow.model.repository.user.UserRepository;
import com.billow.util.DateUtil;
import com.billow.util.Message;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class BroadcastingAlarmService {

    private static final String ALARM_NOT_FOUND = "등록되지 않은 알람입니다.";
    private static final String USER_NOT_FOUND = "사용자를 찾을 수 없습니다.";
    private static final String PROGRAM_ORGANIZATION_NOT_FOUND = "편성표 정보를 찾을 수 없습니다.";

    private final BroadcastingAlarmRepository broadcastingAlarmRepository;
    private final ProgramOrganizationRepository programOrganizationRepository;
    private final UserRepository userRepository;
    private final MessageService messageService;

    public List<BroadcastingAlarmResponse> selectAlarm(Long userId) {
        List<BroadcastingAlarm> broadcastingAlarmList = broadcastingAlarmRepository.findByUser_Id(userId);
        return broadcastingAlarmList
                .stream()
                .map(alarm -> BroadcastingAlarmResponse.builder()
                        .id(alarm.getProgramOrganization().getProgram().getId())
                        .title(alarm.getProgramOrganization().getProgram().getTitle())
                        .posterImg(alarm.getProgramOrganization().getProgram().getPosterImg())
                        .broadcastingAlarmId(alarm.getId())
                        .alarmDay(DateUtil.toYYYY_MM_DD(alarm.getProgramOrganization().getBroadcastingTime()) + " " + alarm.getProgramOrganization().getBroadcastingDay())
                        .alarmTime(DateUtil.toHH_mm(alarm.getProgramOrganization().getBroadcastingTime()))
                        .alarmStation(alarm.getProgramOrganization().getBroadcastingStation())
                        .alarmEpisode(alarm.getProgramOrganization().getBroadcastingEpisode())
                        .build())
                .collect(Collectors.toList());
    }

    public Message postAlarm(Long userId, Long programOrganizationId) {
        Optional<BroadcastingAlarm> findBroadcastingAlarm = broadcastingAlarmRepository.findByUser_IdAndProgramOrganization_Id(userId, programOrganizationId);
        if (!findBroadcastingAlarm.isEmpty()) {
            return new Message("이미 등록된 알림입니다.");
        }
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
        ProgramOrganization programOrganization = programOrganizationRepository.findById(programOrganizationId)
                .orElseThrow(() -> new NotFoundException(PROGRAM_ORGANIZATION_NOT_FOUND));

        String groupId = messageService.sendMessage(user.getMobile(), programOrganization);
        BroadcastingAlarm broadcastingAlarm = BroadcastingAlarm.builder()
                .groupId(groupId)
                .programOrganization(programOrganization)
                .user(user)
                .build();
        broadcastingAlarmRepository.save(broadcastingAlarm);
        return new Message("방영 알림 등록에 성공하였습니다.");
    }

    public Message deleteAlarm(Long alarmId) {
        BroadcastingAlarm findBroadcastingAlarm = broadcastingAlarmRepository.findById(alarmId)
                .orElseThrow(() -> new NotFoundException(ALARM_NOT_FOUND));
        messageService.cancleMessage(findBroadcastingAlarm.getGroupId());
        broadcastingAlarmRepository.delete(findBroadcastingAlarm);
        return new Message("방영 알림 삭제에 성공하였습니다.");
    }

    public List<BroadcastingAlarm> findByProgramOrganization_Id(Long programOrganizationId) {
        return broadcastingAlarmRepository.findByProgramOrganization_Id(programOrganizationId);
    }

    public List<BroadcastingAlarm> findAll() {
        return broadcastingAlarmRepository.findAll();
    }
}
package com.billow.domain.dto.addtion;

import lombok.*;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class BroadcastingAlarmResponse {

    private Long id;

    private String title;

    private List<String> genres;

    private String posterImg;

    private Long broadcastingAlarmId;

    private String alarmDay;

    private String alarmTime;

    private String alarmStation;

    private String alarmEpisode;
}
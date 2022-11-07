package com.billow.controller.addition;

import com.billow.domain.dto.addtion.BroadcastingAlarmResponse;
import com.billow.jwt.JwtTokenProvider;
import com.billow.model.service.addtion.BroadcastingAlarmService;
import com.billow.util.Message;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Api(tags = {"Alarm API"})
@RestController
@RequestMapping("/alarm")
public class BroadcastingAlarmController {

    private final BroadcastingAlarmService broadcastingAlarmService;

    @ApiOperation(value = "방영 알림 조회", response = Object.class)
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "방영 알림 조회 성공"),
            @ApiResponse(responseCode = "400", description = "오류가 발생하였습니다.")
    })
    @GetMapping
    public ResponseEntity<Object> selectAlarm(@RequestHeader("Auth-access") String token) {
        log.info("방영 알림 조회 API 호출");
        List<BroadcastingAlarmResponse> responses = broadcastingAlarmService.selectAlarm(JwtTokenProvider.getUserId(token));
        log.info("방영 알림 조회 성공");
        return ResponseEntity.ok()
                .body(responses);
    }

    @ApiOperation(value = "방영 알림 등록", response = Object.class)
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "방영 알림 등록 성공"),
            @ApiResponse(responseCode = "404", description = "사용자를 찾을 수 없습니다."),
            @ApiResponse(responseCode = "400", description = "편성표 정보를 찾을 수 없습니다."),
            @ApiResponse(responseCode = "400", description = "오류가 발생하였습니다.")
    })
    @PostMapping("/{programOrganizationId}")
    public ResponseEntity<Object> postAlarm(@PathVariable("programOrganizationId") Long programOrganizationId, @RequestHeader("Auth-access") String token) {
        log.info("방영 알림 등록 API 호출");
        Message responses = broadcastingAlarmService.postAlarm(JwtTokenProvider.getUserId(token), programOrganizationId);
        log.info("방영 알림 등록 성공");
        return ResponseEntity.ok()
                .body(responses);
    }

    @ApiOperation(value = "방영 알림 삭제", response = Object.class)
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "방영 알림 삭제 성공"),
            @ApiResponse(responseCode = "400", description = "등록되지 않은 알람입니다."),
            @ApiResponse(responseCode = "400", description = "오류가 발생하였습니다.")
    })
    @DeleteMapping("/{alarmId}")
    public ResponseEntity<Object> deleteAlarm(@PathVariable("alarmId") Long alarmId) {
        log.info("방영 알림 삭제 API 호출");
        Message responses = broadcastingAlarmService.deleteAlarm(alarmId);
        log.info("방영 알림 삭제 성공");
        return ResponseEntity.ok()
                .body(responses);
    }
}
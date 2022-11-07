package com.billow.controller.data;

import com.billow.model.service.addtion.BroadcastingAlarmService;
import com.billow.model.service.data.DataService;
import com.billow.model.service.organization.ProgramOrganozationService;
import com.billow.model.service.program.CastService;
import com.billow.model.service.program.ProgramService;
import com.billow.util.Message;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequiredArgsConstructor
@Api(tags = {"Data API"})
@RestController
@RequestMapping("/data")
public class DataController {

    private final DataService dataService;

    @ApiOperation(value = "kdrama 데이터 수집", response = Object.class)
    @GetMapping(value = "/kdrama")
    public ResponseEntity<Object> kdramaData() {
        log.info("kdrama 데이터 수집 API 호출");
        Message message = dataService.getkdramaData();
        log.info("kdrama 데이터 수집 API 성공");
        return ResponseEntity.ok()
                .body(message);
    }

    @ApiOperation(value = "kpop 데이터 수집", response = Object.class)
    @GetMapping(value = "/kpop")
    public ResponseEntity<Object> kpopData() {
        log.info("kpop 데이터 수집 API 호출");
        Message message = dataService.getkpopData();
        log.info("kpop 데이터 수집 API 성공");
        return ResponseEntity.ok()
                .body(message);
    }

    @ApiOperation(value = "성연령별 데이터 프로그램 매핑", response = Object.class)
    @GetMapping(value = "/insert")
    public ResponseEntity<Object> insertProgramId() {
        log.info("성연령별 데이터 프로그램 매핑 API 호출");
        Message message = dataService.insertProgramId();
        log.info("성연령별 데이터 프로그램 매핑 API 성공");
        return ResponseEntity.ok()
                .body(message);
    }
}
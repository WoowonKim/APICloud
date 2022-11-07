package com.billow.controller.program;

import com.billow.domain.dto.organization.OrganizationResponse;
import com.billow.domain.dto.program.CastResponse;
import com.billow.domain.dto.program.ProgramResponse;
import com.billow.jwt.JwtTokenProvider;
import com.billow.model.service.program.RecommendService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Api(tags = {"Recommend API"})
@RestController
@RequestMapping("/recommend")
public class RecommendController {

    private final RecommendService recommendService;

    @ApiOperation(value = "신규 프로그램 추천", response = Object.class)
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "신규 프로그램 추천 성공"),
            @ApiResponse(responseCode = "400", description = "오류가 발생하였습니다.")
    })
    @GetMapping("/new")
    public ResponseEntity<Object> recommendNew() {
        log.info("신규 프로그램 추천 API 호출");
        List<ProgramResponse> responses = recommendService.recommendNew();
        log.info("신규 프로그램 추천 성공");
        return ResponseEntity.ok()
                .body(responses);
    }

    @ApiOperation(value = "인기 프로그램 추천", response = Object.class)
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "인기 프로그램 추천 성공"),
            @ApiResponse(responseCode = "400", description = "오류가 발생하였습니다.")
    })
    @GetMapping("/popular")
    public ResponseEntity<Object> recommendPopular() {
        log.info("인기 프로그램 추천 API 호출");
        List<ProgramResponse> responses = recommendService.recommendPopular();
        log.info("인기 프로그램 추천 성공");
        return ResponseEntity.ok()
                .body(responses);
    }

    @ApiOperation(value = "특정 배우 프로그램 추천", response = Object.class)
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "특정 배우 추천 성공"),
            @ApiResponse(responseCode = "400", description = "오류가 발생하였습니다.")
    })
    @GetMapping("/actor")
    public ResponseEntity<Object> recommendActor(@RequestHeader("Auth-access") String token) {
        try {
            log.info("특정 배우 프로그램 추천 API 호출");
            List<CastResponse> response = recommendService.recommendActor(JwtTokenProvider.getUserId(token));
            log.info("특정 배우 프로그램 추천 API 성공");
            return ResponseEntity.ok()
                    .body(response);
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }

    @ApiOperation(value = "성연령별 프로그램 추천", response = Object.class)
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "성연령별 프로그램 추천 성공"),
            @ApiResponse(responseCode = "404", description = "해당 유저를 찾을 수 없습니다."),
            @ApiResponse(responseCode = "400", description = "오류가 발생하였습니다.")
    })
    @GetMapping("/gender-age")
    public ResponseEntity<Object> recommendGenderAge(@RequestHeader("Auth-access") String token) {
        log.info("성연령별 프로그램 추천 API 호출");
        List<ProgramResponse> response = recommendService.recommendGenderAge(JwtTokenProvider.getUserId(token));
        log.info("성연령별 프로그램 추천 API 성공");
        return ResponseEntity.ok()
                .body(response);
    }

    @ApiOperation(value = "온에어 프로그램 추천", response = Object.class)
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "온에어 프로그램 추천 성공"),
            @ApiResponse(responseCode = "400", description = "오류가 발생하였습니다.")
    })
    @GetMapping("/onair")
    public ResponseEntity<Object> recommendOnair() {
        log.info("온에어 프로그램 추천 API 호출");
        List<OrganizationResponse> response = recommendService.recommendOnair();
        log.info("온에어 프로그램 추천 API 성공");
        return ResponseEntity.ok()
                .body(response);
    }
}
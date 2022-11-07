package com.billow.controller.orgranization;

import com.billow.domain.dto.organization.OrganizationListResponse;
import com.billow.model.service.organization.ProgramOrganozationService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Api(tags = {"Organization API"})
@RestController
@RequestMapping("/organization")
public class OrganizationController {

    private final ProgramOrganozationService programOrganozationService;

    @ApiOperation(value = "편성표 조회", response = Object.class)
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "편성표 조회 성공"),
            @ApiResponse(responseCode = "400", description = "오류가 발생하였습니다.")
    })
    @GetMapping("/{programId}")
    public ResponseEntity<Object> selectProgramOrganization(@PathVariable("programId") Long programId) {
        log.info("편성표 조회 API 호출");
        List<OrganizationListResponse> responses = programOrganozationService.selectProgramOrganization(programId);
        log.info("편성표 조회 API 성공");
        return ResponseEntity.ok()
                .body(responses);
    }
}
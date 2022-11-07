package com.billow.controller.user;

import com.billow.exception.BadRequestException;
import com.billow.model.service.user.ProfileImageService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequiredArgsConstructor
@Api(tags = {"Profile Image API"})
@RestController
@RequestMapping("/profile")
public class ProfileImageController {

    private static final String PROFILE_ERROR = "프로필 조회 중 오류가 발생하였습니다.";

    private final ProfileImageService profileImageService;

    @ApiOperation(value = "초기 프로필 조회", response = Object.class)
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "초기 프로필 조회 성공"),
            @ApiResponse(responseCode = "404", description = "해당 프로필 이미지를 찾을 수 없습니다."),
            @ApiResponse(responseCode = "400", description = "오류가 발생하였습니다.")
    })
    @GetMapping("/{profileId}")
    public ResponseEntity<Resource> initialSelectProfile(@PathVariable("profileId") Long profileId) {
        try {
            log.info("초기 프로필 조회 API 호출");
            ResponseEntity<Resource> resource = profileImageService.initialSelectProfile(profileId);
            log.info("초기 프로필 조회 성공");
            return resource;
        } catch (Exception e) {
            throw new BadRequestException(PROFILE_ERROR);
        }
    }
}
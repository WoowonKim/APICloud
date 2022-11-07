package com.billow.controller.user;

import com.billow.domain.dto.addtion.RatingResponse;
import com.billow.domain.dto.user.*;
import com.billow.jwt.JwtTokenProvider;
import com.billow.model.service.user.UserService;
import com.billow.util.Message;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Api(tags = {"User API"})
@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    @ApiOperation(value = "회원 조회", response = Object.class)
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "회원 조회 성공"),
            @ApiResponse(responseCode = "404", description = "해당 유저를 찾을 수 없습니다."),
            @ApiResponse(responseCode = "400", description = "오류가 발생하였습니다.")
    })
    @GetMapping
    public ResponseEntity<Object> selectUser(@RequestHeader("Auth-access") String token) throws IOException {
        log.info("회원정보 조회 API 호출");
        UserResponse response = userService.selectUser(JwtTokenProvider.getUserId(token));
        log.info("회원정보 조회 성공");
        return ResponseEntity.ok()
                .body(response);
    }

    @ApiOperation(value = "소셜 로그인", response = Object.class)
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "소셜 로그인 성공"),
            @ApiResponse(responseCode = "404", description = "이메일 수집에 동의해주세요."),
            @ApiResponse(responseCode = "400", description = "오류가 발생하였습니다.")
    })
    @PostMapping("/oauth")
    public ResponseEntity<Object> kakaoLogin(@RequestBody SignUpRequest signUpRequest) {
        log.info("카카오 로그인 API 호출");
        LoginResponse response = userService.kakaoLogin(signUpRequest);
        log.info("카카오 로그인 API 성공");
        return ResponseEntity.ok()
                .body(response);
    }

    @ApiOperation(value = "닉네임 중복검사", response = Object.class)
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "닉네임 사용가능"),
            @ApiResponse(responseCode = "409", description = "이미 등록된 닉네임입니다."),
            @ApiResponse(responseCode = "400", description = "오류가 발생하였습니다.")
    })
    @GetMapping("/validation/nickname")
    public ResponseEntity<Object> validateNickname(@RequestParam String nickname) {
        log.info("닉네임 중복검사 API 호출");
        Message response = userService.validateNickname(nickname);
        log.info("닉네임 중복검사 성공");
        return ResponseEntity.ok()
                .body(response);
    }

    @ApiOperation(value = "회원가입", response = Object.class)
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "회원가입 성공"),
            @ApiResponse(responseCode = "400", description = "잘못된 요청입니다."),
            @ApiResponse(responseCode = "404", description = "프로필 이미지를 찾을 수 없습니다."),
            @ApiResponse(responseCode = "400", description = "오류가 발생하였습니다.")
    })
    @PostMapping("/signup")
    public ResponseEntity<Object> signUp(@RequestBody SignUpRequest signUpRequest) {
        log.info("회원가입 API 호출");
        Message response = userService.signUp(signUpRequest);
        log.info("회원가입 성공");
        return ResponseEntity.ok()
                .body(response);
    }

    @ApiOperation(value = "액세스 토큰 재발급", response = Object.class)
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "액세스 토큰 재발급 성공"),
            @ApiResponse(responseCode = "403", description = "토큰 정보가 올바르지 않습니다."),
            @ApiResponse(responseCode = "400", description = "오류가 발생하였습니다.")
    })
    @PostMapping("/refresh")
    public ResponseEntity<Object> refresh(@RequestBody RefreshRequest refreshRequest) {
        log.info("액세스 토큰 재발급 요청 API 호출");
        if (refreshRequest.getRefreshToken() == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new Message("재로그인 하시기 바랍니다."));
        }
        AuthTokenResponse response = userService.refresh(refreshRequest.getEmail(), refreshRequest.getRefreshToken());
        log.info("액세스 토큰 재발급 성공");
        return ResponseEntity.ok()
                .body(response);
    }

    @ApiOperation(value = "로그아웃", response = Object.class)
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "로그아웃 성공"),
            @ApiResponse(responseCode = "404", description = "해당 유저를 찾을 수 없습니다."),
            @ApiResponse(responseCode = "400", description = "오류가 발생하였습니다.")
    })
    @PostMapping("/logout")
    public ResponseEntity<Object> logout(@RequestHeader("Auth-access") String token) {
        log.info("로그아웃 API 호출");
        Message response = userService.logout(JwtTokenProvider.getUserId(token));
        log.info("로그아웃 성공");
        return ResponseEntity.ok()
                .body(response);
    }

    @ApiOperation(value = "회원 수정", response = Object.class)
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "회원 수정 성공"),
            @ApiResponse(responseCode = "404", description = "해당 유저를 찾을 수 없습니다."),
            @ApiResponse(responseCode = "404", description = "프로필 이미지를 찾을 수 없습니다."),
            @ApiResponse(responseCode = "400", description = "오류가 발생하였습니다.")
    })
    @PutMapping
    public ResponseEntity<Object> updateUser(@RequestHeader("Auth-access") String token, @RequestBody UserUpdateRequest userUpdateRequest) {
        log.info("회원정보 수정 API 호출");
        Message response = userService.updateUser(JwtTokenProvider.getUserId(token), userUpdateRequest);
        log.info("회원정보 수정 성공");
        return ResponseEntity.ok()
                .body(response);
    }

    @ApiOperation(value = "회원 삭제", response = Object.class)
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "회원 삭제 성공"),
            @ApiResponse(responseCode = "404", description = "해당 유저를 찾을 수 없습니다."),
            @ApiResponse(responseCode = "400", description = "오류가 발생하였습니다.")
    })
    @DeleteMapping
    public ResponseEntity<Object> deleteUser(@RequestHeader("Auth-access") String token) {
        log.info("회원 탈퇴 API 호출");
        Message response = userService.deleteUser(JwtTokenProvider.getUserId(token));
        log.info("회원 탈퇴 성공");
        return ResponseEntity.ok()
                .body(response);
    }

    @ApiOperation(value = "평점 조회", response = Object.class)
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "평점 조회 성공"),
            @ApiResponse(responseCode = "404", description = "해당 유저를 찾을 수 없습니다."),
            @ApiResponse(responseCode = "404", description = "남기신 평점이 없습니다!"),
            @ApiResponse(responseCode = "400", description = "오류가 발생하였습니다.")
    })
    @GetMapping("/rating")
    public ResponseEntity<Object> selectRating(@RequestHeader("Auth-access") String token) {
        log.info("평점 조회 API 호출");
        List<RatingResponse> response = userService.selectRating(JwtTokenProvider.getUserId(token));
        log.info("평점 조회 성공");
        return ResponseEntity.ok()
                .body(response);
    }

    @ApiOperation(value = "평점 삭제", response = Object.class)
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "평점 삭제 성공"),
            @ApiResponse(responseCode = "404", description = "해당 유저를 찾을 수 없습니다."),
            @ApiResponse(responseCode = "404", description = "해당 평점을 찾을 수 없습니다."),
            @ApiResponse(responseCode = "400", description = "잘못된 요청입니다."),
            @ApiResponse(responseCode = "400", description = "오류가 발생하였습니다.")
    })
    @DeleteMapping("/rating/{ratingId}")
    public ResponseEntity<Object> deleteRating(@RequestHeader("Auth-access") String token, @PathVariable("ratingId") Long ratingId) {
        log.info("평점 삭제 API 호출");
        Message response = userService.deleteRating(JwtTokenProvider.getUserId(token), ratingId);
        return ResponseEntity.ok()
                .body(response);
    }
}
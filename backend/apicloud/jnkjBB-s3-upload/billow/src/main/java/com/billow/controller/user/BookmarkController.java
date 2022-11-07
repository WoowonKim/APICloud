package com.billow.controller.user;

import com.billow.domain.dto.user.BookmarkResponse;
import com.billow.jwt.JwtTokenProvider;
import com.billow.model.service.user.BookmarkService;
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
@Api(tags = {"Bookmark API"})
@RestController
@RequestMapping("/bookmark")
public class BookmarkController {

    private final BookmarkService bookmarkService;

    @ApiOperation(value = "즐겨찾기 조회", response = Object.class)
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "즐겨찾기 조회 성공"),
            @ApiResponse(responseCode = "404", description = "담긴 즐겨찾기가 없습니다."),
            @ApiResponse(responseCode = "400", description = "오류가 발생하였습니다.")
    })
    @GetMapping
    public ResponseEntity<Object> selectBookmark(@RequestHeader("Auth-access") String token) {
        log.info("즐겨찾기 조회 API 호출");
        List<BookmarkResponse> responses = bookmarkService.selectBookmark(JwtTokenProvider.getUserId(token));
        log.info("즐겨찾기 조회 성공");
        return ResponseEntity.ok()
                .body(responses);
    }

    @ApiOperation(value = "즐겨찾기 사용자 조회", response = Object.class)
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "즐겨찾기 사용자 조회 성공"),
            @ApiResponse(responseCode = "404", description = "해당 유저를 찾을 수 없습니다."),
            @ApiResponse(responseCode = "404", description = "담긴 즐겨찾기가 없습니다."),
            @ApiResponse(responseCode = "400", description = "오류가 발생하였습니다.")
    })
    @GetMapping("/{programId}")
    public ResponseEntity<Object> selectUserBookmark(@RequestHeader("Auth-access") String token, @PathVariable("programId") Long programId) {
        log.info("즐겨찾기 사용자 조회 API 호출");
        Boolean responses = bookmarkService.selectUserBookmark(JwtTokenProvider.getUserId(token), programId);
        log.info("즐겨찾기 사용자 조회 성공");
        return ResponseEntity.ok()
                .body(responses);
    }

    @ApiOperation(value = "즐겨찾기 등록", response = Object.class)
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "즐겨찾기 등록 성공"),
            @ApiResponse(responseCode = "404", description = "해당 프로그램을 찾을 수 없습니다."),
            @ApiResponse(responseCode = "404", description = "해당 유저를 찾을 수 없습니다."),
            @ApiResponse(responseCode = "409", description = "이미 즐겨찾기에 담겼습니다."),
            @ApiResponse(responseCode = "400", description = "오류가 발생하였습니다.")
    })
    @PostMapping("/{programId}")
    public ResponseEntity<Object> postBookmark(@RequestHeader("Auth-access") String token, @PathVariable("programId") Long programId) {
        log.info("즐겨찾기 등록 API 호출");
        Message response = bookmarkService.postBookmark(JwtTokenProvider.getUserId(token), programId);
        log.info("즐겨찾기 등록 성공");
        return ResponseEntity.ok()
                .body(response);
    }

    @ApiOperation(value = "즐겨찾기 삭제", response = Object.class)
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "즐겨찾기 삭제 성공"),
            @ApiResponse(responseCode = "404", description = "해당 즐겨찾기를 찾을 수 없습니다."),
            @ApiResponse(responseCode = "404", description = "해당 유저를 찾을 수 없습니다."),
            @ApiResponse(responseCode = "400", description = "잘못된 요청입니다."),
            @ApiResponse(responseCode = "400", description = "오류가 발생하였습니다.")
    })
    @DeleteMapping("/{programId}")
    public ResponseEntity<Object> deleteBookmark(@RequestHeader("Auth-access") String token, @PathVariable("programId") Long programId) {
        log.info("즐겨찾기 삭제 API 호출");
        Message response = bookmarkService.deleteBookmark(JwtTokenProvider.getUserId(token), programId);
        log.info("즐겨찾기 삭제 성공");
        return ResponseEntity.ok()
                .body(response);
    }
}
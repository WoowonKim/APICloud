package com.billow.controller.addition;

import com.billow.domain.dto.addtion.ChatRequest;
import com.billow.domain.dto.addtion.ChatResponse;
import com.billow.jwt.JwtTokenProvider;
import com.billow.model.service.addtion.ChatService;
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
@Api(tags = {"Chat API"})
@RestController
@RequestMapping("/chat")
public class ChatController {

    private final ChatService chatService;

    @ApiOperation(value = "온에어 톡 조회", response = Object.class)
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "온에어 톡 조회 성공")})
    @GetMapping("/{programId}")
    public ResponseEntity<Object> selectChat(@PathVariable("programId") Long programId) {
        log.info("온에어톡 조회 API 호출");
        List<ChatResponse> responses = chatService.selectChat(programId);
        log.info("온에어톡 조회 성공");
        return ResponseEntity.ok()
                .body(responses);
    }

    @ApiOperation(value = "메시지 전송", response = Object.class)
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "메시지 전송 성공")})
    @PostMapping("/{programId}")
    public ResponseEntity<Object> sendMessage(@RequestHeader("Auth-access") String token, @PathVariable("programId") Long programId, @RequestBody ChatRequest chatRequest) {
        log.info("메시지 등록 API 호출");
        Message response = chatService.sendMessage(JwtTokenProvider.getUserId(token), programId, chatRequest);
        log.info("메시지 전송 성공");
        return ResponseEntity.ok()
                .body(response);
    }
}
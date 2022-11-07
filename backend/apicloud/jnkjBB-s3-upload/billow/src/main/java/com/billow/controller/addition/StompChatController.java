package com.billow.controller.addition;

import com.billow.domain.dto.addtion.ChatRequest;
import com.billow.jwt.JwtTokenProvider;
import com.billow.model.service.addtion.StompChatService;
import com.billow.util.Message;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@RequiredArgsConstructor
@Controller
@Slf4j
public class StompChatController {

    private final StompChatService stompChatService;

    @MessageMapping(value = "/message")
    @SendTo("/message")
    public Message message(@Header("Auth-access") String token, @Payload ChatRequest chatRequest) {
        System.out.println(token);
        log.info("메시지 등록 API 호출");
        Message response = stompChatService.sendMessage(JwtTokenProvider.getUserId(token), chatRequest);
        log.info("메시지 전송 성공");
        return response;
    }
}
package com.web.trackingtest.controller;


import com.web.trackingtest.Message;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/test")
public class TestController {

    @GetMapping
//    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<Object> test(String id, Message message, HttpServletRequest request) {
        System.out.println(request.getMethod());
        log.info("테스트 실행");
        Message message1 = Message.builder()
                .text("테스트").build();
        log.info("테스트 종료");
        return ResponseEntity.ok()
                .body(message);
    }

//    @GetMapping("/{programId}")
//    public ResponseEntity<Object> selectProgram(@PathVariable("programId") Long programId, HttpServletRequest httpRequest) throws ServletException, IOException {
//        System.out.println(httpRequest.getRequestURI());
//        System.out.println(httpRequest.getPathInfo());
//        log.info("프로그램 조회 API 호출");
//        ProgramResponse responses = programService.selectProgram(programId);
//        log.info("프로그램 조회 성공");
//        return ResponseEntity.ok()
//                .body(null);
//    }
}
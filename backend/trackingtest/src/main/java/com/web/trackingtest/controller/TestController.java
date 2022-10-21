package com.web.trackingtest.controller;


import com.web.trackingtest.Message;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.HandlerMapping;

import javax.servlet.http.HttpServletRequest;
import java.util.Iterator;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/test")
public class TestController {

    @GetMapping("{id}")
//    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<Message> test(HttpServletRequest request, @PathVariable("id") int id, @RequestBody Message message) {
//        System.out.println(webRequest.getParameterNames());
//        System.out.println(webRequest.getParameterNames());
//        Map<?, ?> pathVariables = (Map<?, ?>) request.getAttribute(HandlerMapping.URI_TEMPLATE_VARIABLES_ATTRIBUTE);
//        System.out.println(pathVariables);
//        Iterator<String> key = (Iterator<String>) pathVariables.keySet().iterator();
//        while (key.hasNext()){
//            String k = key.next();
////            System.out.println(webRequest.getParameter(k));
////            System.out.println(webRequest.getParameter(k).getClass());
//            System.out.println(pathVariables.get(k));
//            System.out.println(pathVariables.get(k).getClass());
//        }
        log.info("테스트 실행");
        Message message1 = Message.builder()
                .text(12L).build();
        log.info("테스트 종료");
        return ResponseEntity.ok()
                .body(message1);
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
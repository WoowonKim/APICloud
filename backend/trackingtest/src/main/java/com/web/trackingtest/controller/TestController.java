package com.web.trackingtest.controller;


import com.web.trackingtest.Message;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.HandlerMapping;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/test")
public class TestController {

    @GetMapping(value = "{id}")
//    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<Message> test(HttpServletRequest request, @PathVariable("id") int id, @RequestParam("word") Integer word, @RequestBody Message message) {
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
        Map<?, ?> pathVariables = (Map<?, ?>) request.getAttribute(HandlerMapping.URI_TEMPLATE_VARIABLES_ATTRIBUTE);
        Iterator<String> key = (Iterator<String>) pathVariables.keySet().iterator();
        while (key.hasNext()) {
            String k = key.next();
            System.out.println(pathVariables.get(k));
            System.out.println(pathVariables.get(k).getClass());
            //여기서 string만 인식
        }

        log.info("테스트 실행");
        Message message1 = Message.builder()
                .text(12L).build();
        log.info("테스트 종료");
        return ResponseEntity.ok()
                .body(message1);
    }

    @GetMapping()
    public ResponseEntity<Object> selectProgram(HttpServletRequest httpRequest) throws ServletException, IOException, IOException {
        showFilesInDIr("C:/S07P22B309");

//        List<String> lines = Files.readAllLines(Paths.get("C:/S07P22B309/backend/billow/src/main/java/com/billow/controller/program/ProgramController.java"));
//        for (String line :
//                lines) {
//            System.out.println(line);
//        }
        return ResponseEntity.ok()
                .body(null);
    }

    private void showFilesInDIr(String path) {
        File dir = new File("C:/S07P22B309");
        File files[] = dir.listFiles();

        for (int i = 0; i < files.length; i++) {
            File file = files[i];
            if (file.isDirectory()) {
                showFilesInDIr(file.getPath());
            } else {
                System.out.println("file: " + file);
            }
        }
    }
}
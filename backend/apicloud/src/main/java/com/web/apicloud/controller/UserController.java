package com.web.apicloud.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/users")
public class UserController {

    @GetMapping
    public ResponseEntity<String> test() {
        System.out.println("하하하하");
        return ResponseEntity.ok()
                .body("message1");
    }
}
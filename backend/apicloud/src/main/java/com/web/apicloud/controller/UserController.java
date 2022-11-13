package com.web.apicloud.controller;

import com.web.apicloud.domain.dto.UserResponse;
import com.web.apicloud.model.UserService;
import com.web.apicloud.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import com.web.apicloud.security.CurrentUser;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<UserResponse> getCurrentUser(@CurrentUser UserPrincipal userPrincipal) {
            log.info("Current User API 호출");
            UserResponse userResponse = new UserResponse(userService.findUserById(userPrincipal.getId()));
            return ResponseEntity.ok().body(userResponse);
    }

    @GetMapping("")
    public ResponseEntity<Object> searchUserByEmail(@RequestParam String email) {
            log.info("유저 검색 API 호출");
            UserResponse userResponse = new UserResponse(userService.findUserByEmail(email));
            return ResponseEntity.ok().body(userResponse);
    }

}

package com.web.apicloud.controller;

import com.web.apicloud.domain.dto.UserResponse;
import com.web.apicloud.domain.entity.User;
import com.web.apicloud.domain.repository.UserRepository;
import com.web.apicloud.exception.ResourceNotFoundException;
import com.web.apicloud.model.UserService;
import com.web.apicloud.security.UserPrincipal;
import com.web.apicloud.util.ResponseHandler;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import com.web.apicloud.security.CurrentUser;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;
    @GetMapping("/me")
    public ResponseEntity<UserResponse> getCurrentUser(@CurrentUser UserPrincipal userPrincipal) {
            log.info("DOC 생성 API 호출");
            UserResponse userResponse = userService.findUserById(userPrincipal.getId());
            return ResponseEntity.ok().body(userResponse);
    }
    @GetMapping("")
    public ResponseEntity<Object> searchUserByEmail(@RequestParam String email) {
            log.info("유저 검색 API 호출");
            UserResponse userResponse = userService.findUserByEmail(email);
            return ResponseEntity.ok().body(userResponse);
    }
}

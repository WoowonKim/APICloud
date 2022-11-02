package com.web.apicloud.controller;

import com.web.apicloud.model.ApiService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/apis")
public class ApiController {
    private final ApiService apiService;
    HttpStatus status;
    HashMap<String, Object> result;

    @GetMapping("/{docId}")
    ResponseEntity<Map<String, Object>> docDetail(@PathVariable Long docId) {
        result = new HashMap<>();
        String detail = apiService.getDetailById(docId);
        try {
            result.put("msg", "조회에 성공하였습니다.");
            result.put("apiInfo", detail);
            status = HttpStatus.OK;
        } catch (Exception e){
            result.put("error", e.getMessage());
            status = HttpStatus.BAD_REQUEST;
        }
        return new ResponseEntity<>(result,status);
    }


}

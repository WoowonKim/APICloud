package com.web.apicloud.controller;

import com.web.apicloud.domain.dto.ApiRequest;
import com.web.apicloud.domain.dto.ApiResponse;
import com.web.apicloud.model.ApiService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/apis")
public class ApiController {
    private final ApiService apiService;
    HttpStatus status;
    HashMap<String, Object> result;
    ApiResponse apiResponse = new ApiResponse();
    @GetMapping("/{docId}")
    ResponseEntity<Map<String, Object>> docDetail(@PathVariable Long docId) {
        result = new HashMap<>();
        try {
            log.info("DOC ApiInfo 조회 API 호출");
            apiResponse.setDetail(apiService.getDetailById(docId));
            result.put("msg", "조회에 성공하였습니다.");
            result.put("apiInfo", apiResponse);
            status = HttpStatus.OK;
        } catch (Exception e){
            log.info("DOC ApiInfo 조회 API 에러", e);
            result.put("error", e.getMessage());
            status = HttpStatus.BAD_REQUEST;
        }
        return new ResponseEntity<>(result,status);
    }
    @PutMapping("/{docId}")
    ResponseEntity<Map<String, Object>> updateDocDetail(@PathVariable Long docId, @RequestBody ApiRequest apiRequest) {
        result = new HashMap<>();
        try {
            log.info("Doc ApiDetail 수정 API 호출");
            apiResponse.setDetail(apiService.updateDetailById(docId, apiRequest.getDetail()));
            result.put("msg", "수정에 성공하였습니다.");
            result.put("apiInfo", apiResponse);
            status = HttpStatus.OK;
        } catch (Exception e) {
            log.info("Doc ApiDetail 수정 API 에러", e);
            result.put("error", e.getMessage());
            status = HttpStatus.BAD_REQUEST;
        }
        return new ResponseEntity<>(result, status);
    }

}

package com.web.apicloud.controller;

import com.web.apicloud.domain.dto.DetailRequest;
import com.web.apicloud.domain.dto.DetailResponse;
import com.web.apicloud.model.ApiService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/apis")
public class ApiController {

    private final ApiService apiService;

    @GetMapping("/{docId}")
    ResponseEntity<DetailResponse> docDetail(@PathVariable Long docId) {
        log.info("DOC ApiInfo 조회 API 호출");
        DetailResponse detailResponse = apiService.getDetailById(docId);
        return ResponseEntity.ok().body(detailResponse);
    }

    @PutMapping("/{docId}")
    ResponseEntity<DetailResponse> updateDocDetail(@PathVariable Long docId, @RequestBody DetailRequest detailRequest) {
        log.info("Doc ApiDetail 수정 API 호출");
        DetailResponse detailResponse = apiService.updateDetailById(docId, detailRequest.getDetail());
        return ResponseEntity.ok().body(detailResponse);
    }

}

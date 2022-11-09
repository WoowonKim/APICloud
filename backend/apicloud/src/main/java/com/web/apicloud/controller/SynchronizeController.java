package com.web.apicloud.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.web.apicloud.domain.dto.CodeResponse;
import com.web.apicloud.domain.dto.DetailRequest;
import com.web.apicloud.domain.dto.SynchronizeRequest;
import com.web.apicloud.domain.dto.SynchronizeUpdateRequest;
import com.web.apicloud.domain.dto.synchronize.ControllerDTO;
import com.web.apicloud.model.SynchronizeCodeService;
import com.web.apicloud.model.SynchronizeDocService;
import com.web.apicloud.util.Message;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/synchronize")
public class SynchronizeController {

    private final SynchronizeDocService synchronizeDocService;
    private final SynchronizeCodeService synchronizeCodeService;

    @PostMapping("/{docId}")
    public ResponseEntity<ControllerDTO> getFile(@PathVariable("docId") Long docId, @RequestPart(value = "file", required = false) MultipartFile multipartFile, @RequestBody SynchronizeRequest synchronizeRequest) throws IOException {
        log.info("프로젝트 동기화 API 요청");
        ControllerDTO response = synchronizeDocService.getFile(docId, synchronizeRequest, multipartFile);
        return ResponseEntity.ok()
                .body(response);
    }

    @PutMapping("/{docId}")
    public ResponseEntity<Message> updateDetail(@PathVariable("docId") Long docId, @RequestBody SynchronizeUpdateRequest synchronizeUpdateRequest) throws JsonProcessingException {
        log.info("동기화 변경사항 저장 API 요청");
        Message response = synchronizeDocService.updateDetail(docId, synchronizeUpdateRequest);
        return ResponseEntity.ok()
                .body(response);
    }

    @PostMapping("/{docId}/{controllerId}")
    public ResponseEntity<List<CodeResponse>> updateCode(@PathVariable("docId") Long docId, @RequestBody DetailRequest detailRequest) throws IOException {
        log.info("문서 => 코드 동기화 API 요청");
        List<CodeResponse> response = synchronizeCodeService.updateCode(docId, detailRequest);
        return ResponseEntity.ok()
                .body(response);
    }
}

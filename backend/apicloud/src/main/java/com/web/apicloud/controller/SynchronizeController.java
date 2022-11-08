package com.web.apicloud.controller;

import com.web.apicloud.domain.dto.SynchronizeRequest;
import com.web.apicloud.domain.dto.synchronize.ControllerDTO;
import com.web.apicloud.model.SynchronizeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/synchronize")
public class SynchronizeController {

    private final SynchronizeService synchronizeService;

    @PostMapping
    public ResponseEntity<ControllerDTO> getFile(@RequestPart(value = "file", required = false) MultipartFile multipartFile, @RequestBody SynchronizeRequest synchronizeRequest) throws IOException {
        String name = "Program";
        System.out.println(multipartFile);
        ControllerDTO response = synchronizeService.getFile(synchronizeRequest, multipartFile);
        return ResponseEntity.ok()
                .body(response);
    }
}

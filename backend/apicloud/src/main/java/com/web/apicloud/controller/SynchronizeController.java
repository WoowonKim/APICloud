package com.web.apicloud.controller;

import com.web.apicloud.domain.dto.synchronize.ControllerDTO;
import com.web.apicloud.model.SynchronizeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/synchronize")
public class SynchronizeController {

    private final SynchronizeService synchronizeService;

    @PostMapping
    public ResponseEntity<ControllerDTO> getFile(@RequestPart(value = "file", required = false) MultipartFile multipartFile) throws IOException {
        String name = "Program";
        System.out.println(multipartFile);
        ControllerDTO response = synchronizeService.getFile(1L, 0, name, multipartFile);
        return ResponseEntity.ok()
                .body(response);
    }
}

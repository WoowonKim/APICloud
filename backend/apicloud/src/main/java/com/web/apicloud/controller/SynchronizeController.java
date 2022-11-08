package com.web.apicloud.controller;

import com.web.apicloud.domain.dto.synchronize.ControllerDTO;
import com.web.apicloud.domain.vo.ControllerVO;
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

    @GetMapping
    public ResponseEntity<ControllerDTO> getFile() throws IOException {
        // TODO : doc id, controlloer id 받기
        String root = "C:/bilow";
//        String root = "/Users/bbb381/S07P22B309/";
        String name = "Program";
        ControllerDTO response = synchronizeService.getFile(1L, 0, root, null);
        return ResponseEntity.ok()
                .body(response);
    }

    @PostMapping
    public ResponseEntity<ControllerDTO> getFile(@RequestPart(value = "file", required = false) MultipartFile multipartFile) throws IOException {
        String root = "C:/bilow";
//        String root = "/Users/bbb381/S07P22B309/";
        String name = "Program";
        System.out.println(multipartFile);
        ControllerDTO response = synchronizeService.getFile(1L, 0, name, multipartFile);
//        String prefix = getPrefix(request.getRequestURI(), "/s3/upload/zip/");
//        s3Service.uploadZip(prefix, multipartFile);
        return ResponseEntity.ok()
                .body(response);
    }
}

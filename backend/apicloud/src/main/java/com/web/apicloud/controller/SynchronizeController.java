package com.web.apicloud.controller;

import com.web.apicloud.domain.vo.ControllerVO;
import com.web.apicloud.model.SynchronizeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/synchronize")
public class SynchronizeController {

    private final SynchronizeService synchronizeService;

    @GetMapping
    public ResponseEntity<ControllerVO> getFile() throws IOException {
        String root = "C:/billow";
        String name = "Program";
        ControllerVO response = synchronizeService.getFile(root, name);
        return ResponseEntity.ok()
                .body(response);
    }
}

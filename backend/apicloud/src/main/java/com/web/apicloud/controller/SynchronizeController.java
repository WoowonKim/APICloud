package com.web.apicloud.controller;

import com.web.apicloud.domain.dto.synchronize.ControllerDTO;
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
    public ResponseEntity<ControllerDTO> getFile() throws IOException {
        // TODO : doc id, controlloer id 받기
        String root = "C:/billow";
//        String root = "/Users/bbb381/S07P22B309/";
        String name = "Program";
        ControllerDTO response = synchronizeService.getFile(1L, 0, root, name);
        return ResponseEntity.ok()
                .body(response);
    }
}

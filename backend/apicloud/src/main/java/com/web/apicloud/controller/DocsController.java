package com.web.apicloud.controller;

import com.web.apicloud.model.DocsService;
import io.spring.initializr.web.controller.ProjectGenerationController;
import io.spring.initializr.web.project.ProjectRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/docs")
public class DocsController {
    private final DocsService docsService;
    // FIXME: controller 안의 로직 밖에서 수행하거나 해당 controller api 막기
    private final ProjectGenerationController<ProjectRequest> projectGenerationController;

    @GetMapping("/{docsId}/project")
    public ResponseEntity<byte[]> exportProject(@PathVariable Long docsId) throws IOException {
        return projectGenerationController.springZip(docsService.getProjectRequestByDocsId(docsId));
    }

}

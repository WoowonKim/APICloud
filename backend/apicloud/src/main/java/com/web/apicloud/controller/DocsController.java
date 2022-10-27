package com.web.apicloud.controller;

import com.web.apicloud.domain.entity.Docs;
import com.web.apicloud.model.DocsService;
import io.spring.initializr.web.controller.ProjectGenerationController;
import io.spring.initializr.web.project.ProjectRequest;
import io.spring.initializr.web.project.WebProjectRequest;
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

    @GetMapping("/{docId}/project")
    public ResponseEntity<byte[]> exportProject(@PathVariable Long docId) throws IOException {
        Docs doc = docsService.findByDocId(docId);
        ProjectRequest pr = convertDocsToProjectRequest(doc);
        return projectGenerationController.springZip(pr);
    }

    private WebProjectRequest convertDocsToProjectRequest(Docs doc) {
        WebProjectRequest pr = new WebProjectRequest();
        // type
        if(doc.getBuildManagement() == 1) {
            pr.setType("maven-project");
        } else if(doc.getBuildManagement() == 2) {
            pr.setType("gradle-project");
        } else {
            // TODO: 잘못된 입력 처리
        }

        // TODO: 다양한 language 처리
        pr.setLanguage("java");

        // bootVersion
        pr.setBootVersion(doc.getSpringVersion());

        // baseDir
        pr.setBaseDir(doc.getDocsName());

        // groupId
        pr.setGroupId(doc.getGroupPackage());

        //artifactId
        pr.setArtifactId(doc.getDocsName());

        //name
        pr.setName(doc.getDocsName());

        // description
        pr.setDescription("");

        // packageName
        pr.setPackageName(doc.getPackageName());

        // packaging
        if(doc.getPackaging() == 1) {
            pr.setPackaging("jar");
        } else if(doc.getPackaging() == 2) {
            pr.setPackaging("war");
        } else {
            // TODO: 에러 처리
        }

        // javaVersion
        pr.setJavaVersion(doc.getJavaVersion().toString());
        return pr;
    }
}

package com.web.apicloud.model;

import com.web.apicloud.domain.entity.Docs;
import com.web.apicloud.domain.repository.DocsRepository;
import io.spring.initializr.web.project.ProjectRequest;
import io.spring.initializr.web.project.WebProjectRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class DocsServiceImpl implements DocsService{
    private final DocsRepository docsRepository;

    @Override
    public Docs findByDocsId(Long docsId) {
        return docsRepository.findById(docsId).orElse(null);
    }

    @Override
    public ProjectRequest getProjectRequestByDocsId(Long docId) {
        Docs doc = findByDocsId(docId);
        return convertDocsToProjectRequest(doc);
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

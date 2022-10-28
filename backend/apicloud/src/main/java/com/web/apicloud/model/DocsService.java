package com.web.apicloud.model;

import com.web.apicloud.domain.dto.CreateDocDto;
import com.web.apicloud.domain.entity.Docs;
import java.security.NoSuchAlgorithmException;
import io.spring.initializr.web.project.ProjectRequest;

public interface DocsService {
    Docs findByDocsId(Long docsId);

    Long saveDocs(CreateDocDto createDocDto);

    String encryptUrl(Long docId) throws NoSuchAlgorithmException;

    ProjectRequest getProjectRequestByDocsId(Long docId);
}

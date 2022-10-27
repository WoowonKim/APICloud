package com.web.apicloud.model;

import com.web.apicloud.domain.entity.Docs;
import io.spring.initializr.web.project.ProjectRequest;

public interface DocsService {
    Docs findByDocsId(Long docId);

    ProjectRequest getProjectRequestByDocsId(Long docId);
}

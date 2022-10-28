package com.web.apicloud.model;

import com.web.apicloud.domain.dto.CreateDocDto;
import com.web.apicloud.domain.dto.DocListResponse;
import com.web.apicloud.domain.entity.Docs;
import java.security.NoSuchAlgorithmException;
import java.util.List;

import com.web.apicloud.domain.entity.User;
import io.spring.initializr.web.project.ProjectRequest;

public interface DocsService {
    Docs findByDocsId(Long docsId);

    User findByUserId(Long userId);

    Long saveDocGetDocId(CreateDocDto createDocDto);

    String encryptUrl(Long docId) throws NoSuchAlgorithmException;

    List<DocListResponse> getDocs(Long userId);

    ProjectRequest getProjectRequestByDocsId(Long docId);
}

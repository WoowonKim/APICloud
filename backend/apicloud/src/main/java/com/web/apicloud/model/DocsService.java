package com.web.apicloud.model;

import com.web.apicloud.domain.dto.CreateDocRequest;
import com.web.apicloud.domain.dto.DocListResponse;
import com.web.apicloud.domain.dto.UpdateDocDto;
import com.web.apicloud.domain.entity.Docs;
import java.security.NoSuchAlgorithmException;
import java.util.List;
import com.web.apicloud.domain.entity.User;
import io.spring.initializr.web.project.ProjectRequest;

public interface DocsService {
    Docs findByDocsId(Long docsId);

    User findByUserId(Long userId);

    Long saveDocGetDocId(CreateDocRequest createDocDto);

    String encryptUrl(Long docId) throws NoSuchAlgorithmException;

    List<DocListResponse> getDocs(Long userId);

    UpdateDocDto updateDoc(Long docId, UpdateDocDto updateDocDto);

    ProjectRequest getProjectRequestByDocsId(Long docId);
}

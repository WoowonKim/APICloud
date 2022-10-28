package com.web.apicloud.model;

import com.web.apicloud.domain.dto.CreateDocDto;
import com.web.apicloud.domain.entity.Docs;
import java.security.NoSuchAlgorithmException;


public interface DocsService {
    Docs findByDocId(Long docId);

    Long saveDocs(CreateDocDto createDocDto);

    String encryptUrl(Long docId) throws NoSuchAlgorithmException;

}

package com.web.apicloud.model;

import com.web.apicloud.domain.entity.Docs;

public interface DocsService {
    Docs findByDocId(Long docId);
}

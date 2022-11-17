package com.web.apicloud.model;

import com.web.apicloud.domain.dto.NotionTokenResponse;
import com.web.apicloud.domain.vo.DocVO;

public interface NotionService {
    void makeApiPage(String token, String databaseId, DocVO doc);

    NotionTokenResponse getAccessToken(String token);
}

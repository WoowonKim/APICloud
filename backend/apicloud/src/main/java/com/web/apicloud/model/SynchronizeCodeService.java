package com.web.apicloud.model;

import com.web.apicloud.domain.dto.CodeResponse;
import com.web.apicloud.domain.dto.DetailRequest;
import com.web.apicloud.util.Message;

import java.io.IOException;
import java.util.List;

public interface SynchronizeCodeService {
    List<CodeResponse> updateCode(Long docId, DetailRequest detailRequest) throws IOException;
}

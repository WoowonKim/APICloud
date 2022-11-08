package com.web.apicloud.model;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.web.apicloud.domain.dto.SynchronizeRequest;
import com.web.apicloud.domain.dto.SynchronizeUpdateRequest;
import com.web.apicloud.domain.dto.synchronize.ControllerDTO;
import com.web.apicloud.util.Message;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface SynchronizeService {
    ControllerDTO getFile(Long docId, SynchronizeRequest synchronizeRequest, MultipartFile multipartFile) throws IOException;

    Message updateDetail(Long docId, SynchronizeUpdateRequest synchronizeUpdateRequest) throws JsonProcessingException;
}

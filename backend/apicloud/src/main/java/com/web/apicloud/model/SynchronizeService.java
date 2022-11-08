package com.web.apicloud.model;

import com.web.apicloud.domain.dto.SynchronizeRequest;
import com.web.apicloud.domain.dto.synchronize.ControllerDTO;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface SynchronizeService {
    ControllerDTO getFile(SynchronizeRequest synchronizeRequest, MultipartFile multipartFile) throws IOException;
}

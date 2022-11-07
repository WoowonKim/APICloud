package com.web.apicloud.model;

import com.web.apicloud.domain.dto.synchronize.ControllerDTO;
import com.web.apicloud.domain.vo.ControllerVO;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface SynchronizeService {
    ControllerDTO getFile(Long docId, int controllerId, String root, String name, MultipartFile multipartFile) throws IOException;
}

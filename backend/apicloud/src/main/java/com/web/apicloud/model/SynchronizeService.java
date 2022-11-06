package com.web.apicloud.model;

import com.web.apicloud.domain.vo.ControllerVO;

import java.io.IOException;

public interface SynchronizeService {
    ControllerVO getFile(String root, String name) throws IOException;
}

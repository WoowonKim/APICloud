package com.web.apicloud.domain.dto;

import com.web.apicloud.domain.dto.synchronize.ControllerDTO;
import lombok.Getter;

@Getter
public class SynchronizeUpdateRequest {

    private Integer controllerId;

    private ControllerDTO controllerDTO;
}

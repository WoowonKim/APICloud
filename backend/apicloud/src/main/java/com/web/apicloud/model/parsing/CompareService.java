package com.web.apicloud.model.parsing;

import com.web.apicloud.domain.dto.synchronize.ControllerDTO;
import com.web.apicloud.domain.vo.ControllerVO;

public interface CompareService {
    ControllerDTO compareControllerVO(ControllerVO original, ControllerVO controllerVO);
}

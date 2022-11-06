package com.web.apicloud.model.parsing;

import com.web.apicloud.domain.dto.synchronize.ControllerDTO;
import com.web.apicloud.domain.vo.ControllerVO;
import org.springframework.stereotype.Service;

public interface CompareService {
    ControllerDTO compareControllerVO(ControllerVO original, ControllerVO controllerVO);
}

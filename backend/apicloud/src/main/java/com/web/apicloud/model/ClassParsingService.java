package com.web.apicloud.model;

import com.web.apicloud.domain.vo.PropertyVO;

public interface ClassParsingService {
    PropertyVO getBody(String token);
}
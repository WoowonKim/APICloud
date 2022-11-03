package com.web.apicloud.model.parsing;

import com.web.apicloud.domain.vo.PropertyVO;

import java.io.IOException;

public interface ClassParsingService {
    PropertyVO getBody(String root, String token) throws IOException;
}

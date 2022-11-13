package com.web.apicloud.model.parsing;

import com.web.apicloud.domain.vo.PropertyVO;

import java.io.IOException;

public interface ClassUpdateService {
    void updateObject(String groupSecretKey, PropertyVO propertyVO, int index) throws IOException;
}

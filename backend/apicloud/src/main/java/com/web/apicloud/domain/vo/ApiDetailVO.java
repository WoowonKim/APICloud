package com.web.apicloud.domain.vo;

import com.web.apicloud.domain.vo.HeaderVO;
import com.web.apicloud.domain.vo.PropertyVO;
import com.web.apicloud.domain.vo.ResponseVO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ApiDetailVO {

    private PropertyVO requestBody;

    private List<PropertyVO> parameters;

    private PropertyVO query;

    private List<HeaderVO> headers;

    private Map<String, ResponseVO> responses;
}
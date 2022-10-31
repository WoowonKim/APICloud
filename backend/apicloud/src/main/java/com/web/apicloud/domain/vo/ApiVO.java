package com.web.apicloud.domain.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ApiVO {

    private String name;

    private String uri;

    private String method;

    private PropertyVO requestBody;

    private List<PropertyVO> parameters;

    private PropertyVO queries;

    private List<HeaderVO> headers;
}
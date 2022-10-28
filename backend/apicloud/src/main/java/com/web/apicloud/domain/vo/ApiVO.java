package com.web.apicloud.domain.vo;

import java.util.List;

public class ApiVO {

    private String name;

    private String uri;

    private String method;

    private PropertyVO requestBody;

    private List<PropertyVO> parameters;

    private PropertyVO queries;

    private List<HeaderVO> headers;
}
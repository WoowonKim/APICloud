package com.example.test.vo;

import lombok.Data;

import java.util.List;

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
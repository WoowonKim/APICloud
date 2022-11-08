package com.web.apicloud.domain.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Builder
@AllArgsConstructor
//@NoArgsConstructor
@Data
public class ApiDetailVO {

    private String name;

    private PropertyVO requestBody;

    private List<PropertyVO> parameters;

    private List<PropertyVO> queries;

    private List<HeaderVO> headers;

    private Map<String, ResponseVO> responses;

    public ApiDetailVO() {
        this.requestBody = new PropertyVO();
        this.parameters = new ArrayList<>();
        this.queries = new ArrayList<>();
        this.headers = new ArrayList<>();
        this.responses = new HashMap<>();
    }
}

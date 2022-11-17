package com.web.apicloud.domain.vo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.web.apicloud.util.code.java.JavaType;
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
//@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class ApiVO {

    private String name;

    private String uri;

    private String method;

    private PropertyVO requestBody;

    private List<PropertyVO> parameters;

    private List<PropertyVO> queries;

    private List<HeaderVO> headers;

    private Map<String, ResponseVO> responses;

    @JsonIgnore
    public JavaType getReturnJavaType(boolean isCreation, String packageName) {
        ResponseVO response;
        PropertyVO success;
        if (responses == null || (response = responses.get("success")) == null
                || (success = response.getResponseBody()) == null
                || !success.canMakeDto()) {
            return JavaType.builder().type("Void").build();
        } else {
            return responses.get("success").getResponseBody().getJavaType(packageName, isCreation);
        }
    }

    @JsonIgnore
    public void getAvailableDTO(Map<String, PropertyVO> dtos) {
        if (requestBody != null) {
            requestBody.getDtos(dtos);
        }
        if (queries != null) {
            for (PropertyVO query : queries) {
                query.getDtos(dtos);
            }
        }
        if (responses != null) {
            for (ResponseVO response : responses.values()) {
                if (response.getResponseBody() != null) {
                    response.getResponseBody().getDtos(dtos);
                }
            }
        }
    }
}

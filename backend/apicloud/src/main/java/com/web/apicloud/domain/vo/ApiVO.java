package com.web.apicloud.domain.vo;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.*;

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

    private PropertyVO query;

    private List<HeaderVO> headers;

    private Map<String, ResponseVO> responses;

    // TODO: ResponseEntity로 묶을지
    public String getReturning() {
        if(responses == null || responses.get("success") == null
            || responses.get("success").getResponseBody() == null) {
            return "void";
        } else {
            return responses.get("success").getResponseBody().getTypeForCode();
        }
    }

    public List<PropertyVO> getAvailableDTO() {
        List<PropertyVO> dtos = new ArrayList<>();
        Set<String> dtoNames = new HashSet<>();
        if(requestBody != null) {
            requestBody.getDtos(dtos, dtoNames);
        }
        if(query != null) {
            query.getDtos(dtos, dtoNames);
        }
        if(responses != null) {
            for(ResponseVO response : responses.values()) {
                if(response.getResponseBody() != null) {
                    response.getResponseBody().getDtos(dtos, dtoNames);
                }
            }
        }
        return dtos;
    }
}

package com.web.apicloud.domain.vo;

import com.fasterxml.jackson.annotation.JsonIgnore;
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

    private List<PropertyVO> queries;

    private List<HeaderVO> headers;

    private Map<String, ResponseVO> responses;

    @JsonIgnore
    public String getReturning(boolean isCreation) {
        if(responses == null || responses.get("success") == null
            || responses.get("success").getResponseBody() == null) {
            return "Void";
        } else {
            if(isCreation) {
                return responses.get("success").getResponseBody().getImplementedTypeForCode();
            }
            return responses.get("success").getResponseBody().getTypeForCode();
        }
    }

    @JsonIgnore
     public Map<String, PropertyVO> getAvailableDTO(Map<String, PropertyVO> dtos) {
         if(requestBody != null) {
             requestBody.getDtos(dtos);
         }
         if(queries != null) {
             for(PropertyVO query : queries) {
                 query.getDtos(dtos);
             }
         }
         if(responses != null) {
             for(ResponseVO response : responses.values()) {
                 if(response.getResponseBody() != null) {
                     response.getResponseBody().getDtos(dtos);
                 }
             }
         }
         return dtos;
     }
}

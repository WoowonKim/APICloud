package com.example.test.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class API {
    private String description;
    private String uri;
    private String path;
    private String query;
    private String requestBody;
    private String requestHeader;
    private String responseBody;
    private String responseStatus;
    private String method;
    private int controllerId;
}

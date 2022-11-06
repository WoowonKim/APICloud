package com.web.apicloud.domain.dto.synchronize;

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
public class ApiDTO {

    private String name;

    private String uri;

    private String method;

    private PropertyDTO requestBody;

    private List<PropertyDTO> parameters;

    private List<PropertyDTO> queries;

    private Map<String, ResponseDTO> responses;

    private boolean uriFlag;

    private boolean methodFlag;

    private boolean createFlag;
}

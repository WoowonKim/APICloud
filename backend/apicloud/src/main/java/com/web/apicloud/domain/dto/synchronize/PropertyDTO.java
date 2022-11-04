package com.web.apicloud.domain.dto.synchronize;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Builder
@AllArgsConstructor
@Data
public class PropertyDTO {

    private String dtoName;

    private String name;

    private String type;

    private String collectionType;

    private boolean required;

    private List<PropertyDTO> properties;

    private Integer dtoNameFlag;

    private Integer nameFlag;

    private Integer typeFlag;

    private Integer collectionTypeFlag;

    private Integer requiredFlag;

    public PropertyDTO() {
        this.properties = new ArrayList<>();
    }
}

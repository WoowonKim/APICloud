package com.web.apicloud.domain.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Builder
@AllArgsConstructor
//@NoArgsConstructor
@Data
public class PropertyVO {
    static final String DTO_CREATE_TYPE = "Object";

    static final String LIST = "List";

    private String dtoName;

    private String name;

    private String type;

    private String collectionType;

    private boolean required;

    private List<PropertyVO> properties;

    public PropertyVO() {
        this.properties = new ArrayList<>();
    }

    public void getDtos(List<PropertyVO> dtos, Set<String> dtoNames) {
        if (DTO_CREATE_TYPE.equals(type) && !dtoNames.contains(dtoName)) {
            dtoNames.add(dtoName);
            dtos.add(this);
            for (PropertyVO property : properties) {
                property.getDtos(dtos, dtoNames);
            }
        }
    }

    public String getTypeForCode() {
        String type;
        if (isDtoCreationRequired()) {
            type = dtoName;
        } else {
            type = this.type;
        }

        if (LIST.equals(collectionType)) {
            return LIST + "<" + type + ">";
        } else {
            return type;
        }
    }

    public boolean isDtoCreationRequired() {
        return DTO_CREATE_TYPE.equals(type);
    }
}
package com.web.apicloud.domain.vo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.web.apicloud.util.Message;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Builder
@AllArgsConstructor
//@NoArgsConstructor
@Data
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class PropertyVO {
    static final String DTO_CREATE_TYPE = "Object";

    static final String LIST = "List";
    static final String JAVA_UTIL = "java.util.";
    private static final String ARRAY_LIST = "ArrayList";

    private String dtoName;

    private String name;

    private String type;

    private String collectionType;

    private boolean required;

    private List<PropertyVO> properties;

    public PropertyVO() {
        this.properties = new ArrayList<>();
    }

    public void getDtos(Map<String, PropertyVO> dtos) {
        if (isDtoCreationRequired()
                && (!dtos.containsKey(dtoName) || dtos.get(dtoName).hasEmptyProperties())) {
            dtos.put(dtoName, this);
            for (PropertyVO property : properties) {
                property.getDtos(dtos);
            }
        }
    }

    private boolean hasEmptyProperties() {
        return properties == null || properties.isEmpty();
    }

    @JsonIgnore
    public String getTypeForCode() {
        String type;
        if (isDtoCreationRequired()) {
            type = dtoName;
        } else {
            type = this.type;
        }

        if (LIST.equals(collectionType)) {
            return JAVA_UTIL + LIST + "<" + type + ">";
        } else {
            return type;
        }
    }

    @JsonIgnore
    public String getImplementedTypeForCode() {
        String type;
        if (isDtoCreationRequired()) {
            type = dtoName;
        } else {
            type = this.type;
        }

        if (LIST.equals(collectionType)) {
            return JAVA_UTIL + ARRAY_LIST + "<" + type + ">";
        } else {
            return type;
        }
    }

    @JsonIgnore
    public boolean isDtoCreationRequired() {
        return DTO_CREATE_TYPE.equals(type);
    }
}

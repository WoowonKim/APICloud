package com.web.apicloud.domain.vo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.web.apicloud.util.TextUtils;
import com.web.apicloud.util.code.java.JavaType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Builder
@AllArgsConstructor
//@NoArgsConstructor
@Data
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
    public JavaType getJavaType(String packageName, boolean isImplemented) {
        JavaType type = JavaType.builder().type(makeTypeWithPackage(packageName)).build();
        if (LIST.equals(collectionType)) {
            return JavaType.builder().type(JAVA_UTIL + (isImplemented ? ARRAY_LIST : LIST))
                    .genericType(type).build();
        } else {
            return type;
        }
    }

    private String makeTypeWithPackage(String packageName) {
        String type = "";
        if (isDtoCreationRequired()) {
            if (packageName != null) {
                type = packageName + ".";
            }
            type += TextUtils.getValidName(dtoName);
        } else {
            type = this.type;
        }
        return type;
    }

    @JsonIgnore
    public boolean isDtoCreationRequired() {
        return DTO_CREATE_TYPE.equals(type);
    }

    @JsonIgnore
    public boolean hasType() {
        if(isDtoCreationRequired()) {
            return StringUtils.hasText(dtoName);
        } else {
            return StringUtils.hasText(type);
        }
    }
}

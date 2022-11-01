package com.web.apicloud.domain.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class PropertyVO {

    private String name;

    private String type;

    private boolean required;

    private List<PropertyVO> properties;

    public void getDtos(List<PropertyVO> dtos) {
        if("Object".equals(type)) {
            for(PropertyVO property : properties) {
                property.getDtos(dtos);
            }
            dtos.add(this);
        }
    }

    public String getNameToType() {
        return Character.toUpperCase(name.charAt(0)) + name.substring(1);
    }
}
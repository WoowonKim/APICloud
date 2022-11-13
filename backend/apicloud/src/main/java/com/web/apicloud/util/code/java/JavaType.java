package com.web.apicloud.util.code.java;

import lombok.Builder;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Builder
public class JavaType {
    private String type;
    private JavaType genericType;

    public String getCode() {
        String code = getUnqualifiedType();
        if (genericType != null) {
            code += "<" + genericType.getCode() + ">";
        }
        return code;
    }

    public List<String> getImports() {
        List<String> imports = new ArrayList<>();

        imports.add(type);
        if (genericType != null) {
            imports.addAll(genericType.getImports());
        }
        return imports;
    }

    private String getUnqualifiedType() {
        if (!type.contains(".")) {
            return type;
        }
        return type.substring(type.lastIndexOf(".") + 1);
    }
}

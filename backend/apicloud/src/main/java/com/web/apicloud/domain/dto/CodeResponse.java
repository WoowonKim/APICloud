package com.web.apicloud.domain.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CodeResponse {
    private String name;

    private String importPackage;

    private List<String> code;

    @Builder
    public CodeResponse(String name, String importPackage, List<String> code) {
        this.name = name;
        this.importPackage = importPackage;
        this.code = code;
    }
}

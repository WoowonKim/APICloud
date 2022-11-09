package com.web.apicloud.domain.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CodeResponse {
    private String name;

    private List<String> code;

    @Builder
    public CodeResponse(String name, List<String> code) {
        this.name = name;
        this.code = code;
    }
}

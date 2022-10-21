package com.example.test.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
public class ControllerDto {
    private String requestMapping;
    private boolean requiredArgsFlag;
    private String crossOrigin;
    private int docsId;
    private List<API> apiList;

    public ControllerDto() {}

    @Builder
    public ControllerDto(String requestMapping, boolean requiredArgsFlag, String crossOrigin, int docsId, List<API> apiList) {
        this.requestMapping = requestMapping;
        this.requiredArgsFlag = requiredArgsFlag;
        this.crossOrigin = crossOrigin;
        this.docsId = docsId;
        this.apiList = apiList;
    }
}

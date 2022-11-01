package com.web.apicloud.domain.dto;

import lombok.Data;

@Data
public class UpdateDocDto {
    private Long docId;

    private String serverUrl;

    private String contextUrl;

    private Integer javaVersion;

    private String springVersion;

    private Integer buildManagement;

    private String groupPackage;

    private String packageName;

    private Integer packaging;

    private Long groupId;

}

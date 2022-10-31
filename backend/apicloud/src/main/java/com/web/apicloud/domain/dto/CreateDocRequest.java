package com.web.apicloud.domain.dto;

import com.web.apicloud.domain.entity.Docs;
import com.web.apicloud.domain.entity.Group;
import lombok.Data;

@Data
public class CreateDocRequest {
    private Long userId;

    private String docsName;

    private String serverUrl;

    private String contextUri;

    private Integer javaVersion;

    private String springVersion;

    private Integer buildManagement;

    private String groupPackage;

    private String packageName;

    private Integer packaging;

    private Group group;

    public Docs toEntity() {
        return Docs.builder()
                .docsName(docsName)
                .serverUrl(serverUrl)
                .contextUri(contextUri)
                .javaVersion(javaVersion)
                .springVersion(springVersion)
                .buildManagement(buildManagement)
                .groupPackage(groupPackage)
                .packageName(packageName)
                .packaging(packaging)
                .group(group)
                .build();
    }
}

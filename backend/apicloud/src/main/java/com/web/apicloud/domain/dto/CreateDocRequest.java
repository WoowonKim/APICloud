package com.web.apicloud.domain.dto;

import com.web.apicloud.domain.entity.Docs;
import com.web.apicloud.domain.entity.Group;
import com.web.apicloud.domain.vo.UserAuthorityVO;
import lombok.Data;

import java.util.List;

@Data
public class CreateDocRequest {

    private Long userId;

    private String docsName;

    private String serverUrl;

    private String contextUri;

    private String javaVersion;

    private String springVersion;

    private Integer buildManagement;

    private String groupPackage;

    private String packageName;

    private Integer packaging;

    private Group group;

    private List<UserAuthorityVO> userAuthorityVO;

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

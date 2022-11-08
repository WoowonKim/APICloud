package com.web.apicloud.domain.dto;

import com.web.apicloud.domain.entity.Docs;
import com.web.apicloud.domain.entity.Group;
import com.web.apicloud.domain.vo.UserAuthorityVO;
import com.web.apicloud.util.TextUtils;
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

    private String buildManagement;

    private String groupPackage;

    private String packageName;

    private String packaging;

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

    public Docs toValidEntity() {
        String docsName = TextUtils.getValidDocsName(this.docsName);
        String contextUri = TextUtils.getValidUri(this.contextUri);
        String groupPackage = TextUtils.getValidGroupPackage(this.groupPackage);
        String packageName = TextUtils.getValidPackageName(docsName, groupPackage, this.packageName);
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

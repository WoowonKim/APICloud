package com.web.apicloud.domain.entity;

import com.web.apicloud.domain.dto.DocListResponse;
import com.web.apicloud.domain.dto.UpdateDocDto;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import javax.persistence.*;
import javax.validation.constraints.NotNull;


@ToString
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "tb_docs")
@Entity
public class Docs {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "docs_id")
    private Long id;

    @NotNull
    private String docsName;

    private String serverUrl;

    private String contextUri;

    private String javaVersion;

    private String springVersion;

    private String buildManagement;

    private String groupPackage;

    private String packageName;

    private String packaging;

    private String encryptedUrl;

    @Lob
    private String detail;

    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "group_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Group group;

    public void setEncryptedUrl(String encryptedUrl) {
        this.encryptedUrl = encryptedUrl;
    }

    public void updateDetail(String detail) {
        this.detail = detail;
    }

    @Builder
    public Docs(Long id, String docsName, String serverUrl, String contextUri, String javaVersion, String springVersion, String buildManagement, String groupPackage, String packageName, String packaging, String encryptedUrl, Group group, String detail) {
        this.id = id;
        this.docsName = docsName;
        this.serverUrl = serverUrl;
        this.contextUri = contextUri;
        this.javaVersion = javaVersion;
        this.springVersion = springVersion;
        this.buildManagement = buildManagement;
        this.groupPackage = groupPackage;
        this.packageName = packageName;
        this.packaging = packaging;
        this.encryptedUrl = encryptedUrl;
        this.group = group;
        this.detail = detail;
    }

    public DocListResponse toDto(Long docId, String docName, Long groupId, User groupUser, Integer authority) {
        return DocListResponse.builder()
                .docId(docId)
                .docName(docName)
                .groupId(groupId)
                .groupUser(groupUser)
                .authority(authority)
                .build();
    }

    public UpdateDocDto toDto(Long docId, String docsName, String serverUrl, String contextUri, String javaVersion, String springVersion, String buildManagement, String groupPackage, String packageName, String packaging) {
        return UpdateDocDto.builder()
                .docId(docId)
                .docsName(docsName)
                .serverUrl(serverUrl)
                .contextUri(contextUri)
                .javaVersion(javaVersion)
                .springVersion(springVersion)
                .buildManagement(buildManagement)
                .groupPackage(groupPackage)
                .packageName(packageName)
                .packaging(packaging)
                .build();
    }
}
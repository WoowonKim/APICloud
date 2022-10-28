package com.web.apicloud.domain.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Getter
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

    private Integer javaVersion;

    private String springVersion;

    private Integer buildManagement;

    private String groupPackage;

    private String packageName;

    private Integer packaging;

    private String encryptedUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "group_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Group group;

    public void setEncryptedUrl(String encryptedUrl) {
        this.encryptedUrl = encryptedUrl;
    }

    @Builder
    public Docs(Long id, String docsName, String serverUrl, String contextUri, Integer javaVersion, String springVersion, Integer buildManagement, String groupPackage, String packageName, Integer packaging, String encryptedUrl, Group group) {
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
    }
}
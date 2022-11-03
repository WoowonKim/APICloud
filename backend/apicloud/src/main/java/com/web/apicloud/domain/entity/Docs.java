package com.web.apicloud.domain.entity;

import com.web.apicloud.domain.dto.DocListResponse;
import com.web.apicloud.domain.vo.DocVO;
import com.web.apicloud.domain.vo.ServerVO;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import javax.persistence.*;
import javax.validation.constraints.NotNull;


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

    private Integer buildManagement;

    private String groupPackage;

    private String packageName;

    private Integer packaging;

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

    @Builder
    public Docs(Long id, String docsName, String serverUrl, String contextUri, String javaVersion, String springVersion, Integer buildManagement, String groupPackage, String packageName, Integer packaging, String encryptedUrl, Group group, String detail) {
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
}

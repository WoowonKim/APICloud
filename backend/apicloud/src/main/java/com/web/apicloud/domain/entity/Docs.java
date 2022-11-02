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

    private Integer javaVersion;

    private String springVersion;

    private Integer buildManagement;

    private String groupPackage;

    private String packageName;

    private Integer packaging;

    private String encryptedUrl;

    @Lob
    private String detail;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "group_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Group group;

    public void setEncryptedUrl(String encryptedUrl) {
        this.encryptedUrl = encryptedUrl;
    }

    @Builder
    public Docs(Long id, String docsName, String serverUrl, String contextUri, Integer javaVersion, String springVersion, Integer buildManagement, String groupPackage, String packageName, Integer packaging, String encryptedUrl, Group group, String detail) {
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

    // FIXME: content 필드 만들고 지우기
    public String getContent() {
//        DocVO.builder().server(
//                ServerVO.builder().artifactId().build()
//        )
        return "{\"server\": {\"bootVersion\": \"2.7.4\",\"type\": \"gradle-project\",\"language\": \"java\",\"baseDir\": \"apicloud\",\"groupId\": \"com.ssafy\",\"artifactId\": \"apicloud\",\"name\": \"apicloud\",\"description\": \"api auto creation tool\",\"packageName\": \"com.ssafy.apicloud\",\"packaging\": \"jar\",\"javaVersion\": \"11\",\"dependencies\": []},\"controllers\": [{\"name\": \"UserController\",\"commonUri\": \"/user\",\"apis\": [{\"name\": \"login\",\"uri\": \"/login\",\"method\": \"post\",\"requestBody\": {\"dtoName\": \"LoginRequest\",\"name\": \"loginRequest\",\"type\": \"Object\",\"properties\": [{\"name\": \"id\",\"type\": \"String\",\"required\": true},{\"name\": \"password\",\"type\": \"String\",\"required\": true}]},\"responses\": {\"fail\": {},\"success\": {\"status\": 200,\"responseBody\": {\"name\": \"msg\",\"type\": \"String\"}}}},{\"name\": \"logout\",\"uri\": \"/logout/{id}\",\"method\": \"get\",\"parameters\": [{\"name\": \"id\",\"type\": \"String\",\"required\": true}],\"responses\": {\"fail\": {},\"success\": {\"status\": 200,\"responseBody\": {\"name\": \"msg\",\"type\": \"String\"}}}},{\"name\": \"find\",\"uri\": \"/find/{userId}\",\"method\": \"post\",\"parameters\": [{\"name\": \"userId\",\"type\": \"String\",\"required\": true}],\"query\" : {\"dtoName\": \"FindRequest\",\"name\": \"findRequest\",\"type\": \"Object\",\"properties\": [{\"name\": \"id\",\"type\": \"String\",\"required\": false},{\"name\": \"name\",\"type\": \"String\",\"required\": false}]},\"responses\": {\"fail\": {},\"success\": {\"status\": 200,\"responseBody\": {\"dtoName\": \"FindResponse\",\"name\": \"findResponses\",\"type\": \"Object\",\"collectionType\": \"List\",\"properties\": [{\"name\": \"id\",\"type\": \"String\"},{\"dtoName\": \"FindInfo\",\"name\": \"findInfo\",\"type\": \"Object\",\"properties\": [{\"name\": \"count\",\"type\": \"Integer\"},{\"name\": \"score\",\"type\": \"Double\"}]}]}}}}]}]}";
    }
}
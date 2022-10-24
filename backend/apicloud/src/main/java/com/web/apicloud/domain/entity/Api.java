package com.web.apicloud.domain.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "tb_api")
@Entity
public class Api {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "api_id")
    private Long id;

    private String summary;

    private String uri;

    private String path;

    private String query;

    private String requestBody;

    private String requestHeader;

    private String responseBody;

    private String responseStatus;

    private String method;

    private String apiName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "controller_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Controller controller;

    @Builder
    public Api(Long id, String summary, String uri, String path, String query, String requestBody, String requestHeader, String responseBody, String responseStatus, String method, String apiName, Controller controller) {
        this.id = id;
        this.summary = summary;
        this.uri = uri;
        this.path = path;
        this.query = query;
        this.requestBody = requestBody;
        this.requestHeader = requestHeader;
        this.responseBody = responseBody;
        this.responseStatus = responseStatus;
        this.method = method;
        this.apiName = apiName;
        this.controller = controller;
    }
}
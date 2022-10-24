package com.web.apicloud.domain.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Null;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "tb_controller")
@Entity
public class Controller {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "controller_id")
    private Long id;

    @NotNull
    private String controllerName;

    @NotNull
    private String mappingUri;

    @NotNull
    private boolean requiredArgsConstructor;

    private String crossOrigin;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "docs_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Docs docs;

    @Builder

    public Controller(Long id, String controllerName, String mappingUri, boolean requiredArgsConstructor, String crossOrigin, Docs docs) {
        this.id = id;
        this.controllerName = controllerName;
        this.mappingUri = mappingUri;
        this.requiredArgsConstructor = requiredArgsConstructor;
        this.crossOrigin = crossOrigin;
        this.docs = docs;
    }
}
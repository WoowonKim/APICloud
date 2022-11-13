package com.web.apicloud.domain.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "tb_group")
@Entity
public class Group {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "group_id")
    private Long id;

    @NotNull
    @Column(unique = true)
    private String groupSecretKey;

    @Builder
    public Group(Long id, String groupSecretKey) {
        this.id = id;
        this.groupSecretKey = groupSecretKey;
    }
}

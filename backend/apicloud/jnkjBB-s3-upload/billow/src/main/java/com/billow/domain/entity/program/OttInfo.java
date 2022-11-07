package com.billow.domain.entity.program;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "tb_ott_info")
@Entity
public class OttInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ott_info_id")
    private Long id;

    @NotNull
    private String name;

    @NotNull
    private String url;

    @NotNull
    private String imgUrl;

    @Builder
    public OttInfo(Long id, String name, String url, String imgUrl) {
        this.id = id;
        this.name = name;
        this.url = url;
        this.imgUrl = imgUrl;
    }
}
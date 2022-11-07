package com.billow.domain.entity.program;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "tb_genre_info")
@Entity
public class GenreInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "genre_info_id")
    private Long id;

    private String name;

    @Builder
    public GenreInfo(Long id, String name) {
        this.id = id;
        this.name = name;
    }
}
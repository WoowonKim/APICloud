package com.billow.domain.entity.program;

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
@Table(name = "tb_genre")
@Entity
public class Genre {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "genre_id")
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "program_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Program program;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "genre_info_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private GenreInfo genreInfo;

    @Builder
    public Genre(Long id, Program program, GenreInfo genreInfo) {
        this.id = id;
        this.program = program;
        this.genreInfo = genreInfo;
    }
}
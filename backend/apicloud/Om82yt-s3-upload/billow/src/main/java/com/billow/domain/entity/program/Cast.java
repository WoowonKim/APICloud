package com.billow.domain.entity.program;

import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@ToString
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "tb_cast")
@Entity
public class Cast {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cast_id")
    private Long id;

    @NotNull
    private String actorName;

    @NotNull
    private String playName;

    private String imgUrl;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "program_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Program program;

    @Builder
    public Cast(Long id, String actorName, String playName, String imgUrl, Program program) {
        this.id = id;
        this.actorName = actorName;
        this.playName = playName;
        this.imgUrl = imgUrl;
        this.program = program;
    }
}
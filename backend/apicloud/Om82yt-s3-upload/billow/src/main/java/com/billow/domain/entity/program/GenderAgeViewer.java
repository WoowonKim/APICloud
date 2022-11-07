package com.billow.domain.entity.program;

import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "tb_gender_age_viewer")
@Entity
@ToString
public class GenderAgeViewer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "gender_age_viewer_id")
    private Long id;

    private String programTitle;

    private String area;

    private String genreLclas;

    private String genreMlsfc;

    private String genreSclas;

    private Float male0;

    private Float male10;

    private Float male20;

    private Float male30;

    private Float male40;

    private Float male50;

    private Float male60;

    private Float female0;

    private Float female10;

    private Float female20;

    private Float female30;

    private Float female40;

    private Float female50;

    private Float female60;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "program_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Program program;

    @Builder
    public GenderAgeViewer(Long id, String programTitle, String area, String genreLclas, String genreMlsfc, String genreSclas, Float male0, Float male10, Float male20, Float male30, Float male40, Float male50, Float male60, Float female0, Float female10, Float female20, Float female30, Float female40, Float female50, Float female60, Program program) {
        this.id = id;
        this.programTitle = programTitle;
        this.area = area;
        this.genreLclas = genreLclas;
        this.genreMlsfc = genreMlsfc;
        this.genreSclas = genreSclas;
        this.male0 = male0;
        this.male10 = male10;
        this.male20 = male20;
        this.male30 = male30;
        this.male40 = male40;
        this.male50 = male50;
        this.male60 = male60;
        this.female0 = female0;
        this.female10 = female10;
        this.female20 = female20;
        this.female30 = female30;
        this.female40 = female40;
        this.female50 = female50;
        this.female60 = female60;
        this.program = program;
    }
}
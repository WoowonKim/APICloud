package com.billow.domain.entity.data;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.Size;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "tb_k_drama")
@Entity
public class kDrama {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "k_drama_id")
    private Long id;

    private String brdcstDe;

    private String brdcstEndDe;

    private String chnnelNm;

    private String programBeginTime;

    private String programEndTime;

    private String programNm;

    private String programDc;

    private String brdcstTmeNm;

    private String programBrdcstAreaNm;

    private String brdcstTime;

    private String programGenreLclasNm;

    private String programGenreMlsfcNm;

    private String programGenreSclasNm;

    @Column(name = "MALE_4_9YO_WTCHNG_RT")
    private Float male49YoWtchngRt;

    @Column(name = "MALE_N10S_WTCHNG_RT")
    private Float maleN10sWtchngRt;

    @Column(name = "MALE_N20S_WTCHNG_RT")
    private Float maleN20sWtchngRt;

    @Column(name = "MALE_N30S_WTCHNG_RT")
    private Float maleN30sWtchngRt;

    @Column(name = "MALE_N40S_WTCHNG_RT")
    private Float maleN40sWtchngRt;

    @Column(name = "MALE_N50S_WTCHNG_RT")
    private Float maleN50sWtchngRt;

    @Column(name = "MALE_N60S_ABOVE_WTCHNG_RT")
    private Float maleN60sAboveWtchngRt;

    @Column(name = "FEMALE_4_9YO_WTCHNG_RT")
    private Float female49YoWtchngRt;

    @Column(name = "FEMALE_N10S_WTCHNG_RT")
    private Float femaleN10sWtchngRt;

    @Column(name = "FEMALE_N20S_WTCHNG_RT")
    private Float femaleN20sWtchngRt;

    @Column(name = "FEMALE_N30S_WTCHNG_RT")
    private Float femaleN30sWtchngRt;

    @Column(name = "FEMALE_N40S_WTCHNG_RT")
    private Float femaleN40sWtchngRt;

    @Column(name = "FEMALE_N50S_WTCHNG_RT")
    private Float femaleN50sWtchngRt;

    @Column(name = "FEMALE_N60S_ABOVE_WTCHNG_RT")
    private Float femaleN60sAboveWtchngRt;

    @Size(max = 1000)
    private String cstCn;
}
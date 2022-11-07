package com.billow.model.repository.data;

import com.billow.domain.dto.program.GenderAgeViewerInformation;
import com.billow.domain.entity.data.kDrama;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface kDramaRepository extends JpaRepository<kDrama, Long> {

    @Query(value = "select k.program_nm as program_title, \n" +
            "k.program_brdcst_area_nm as area, \n" +
            "k.program_genre_lclas_nm as genre_lclas, \n" +
            "k.program_genre_mlsfc_nm as genre_mlsfc, \n" +
            "k.program_genre_sclas_nm as genre_sclas, \n" +
            "sum(k.female_4_9yo_wtchng_rt)/count(k.program_nm) as female0,\n" +
            "sum(k.female_n10s_wtchng_rt)/count(k.program_nm) as female10,\n" +
            "sum(k.female_n20s_wtchng_rt)/count(k.program_nm) as female20,\n" +
            "sum(k.female_n30s_wtchng_rt)/count(k.program_nm) as female30,\n" +
            "sum(k.female_n40s_wtchng_rt)/count(k.program_nm) as female40,\n" +
            "sum(k.female_n50s_wtchng_rt)/count(k.program_nm) as female50,\n" +
            "sum(k.female_n60s_above_wtchng_rt)/count(k.program_nm) as female60,\n" +
            "sum(k.male_4_9yo_wtchng_rt)/count(k.program_nm) as male0,\n" +
            "sum(k.male_n10s_wtchng_rt)/count(k.program_nm) as male10,\n" +
            "sum(k.male_n20s_wtchng_rt)/count(k.program_nm) as male20,\n" +
            "sum(k.male_n30s_wtchng_rt)/count(k.program_nm) as male30,\n" +
            "sum(k.male_n40s_wtchng_rt)/count(k.program_nm) as male40,\n" +
            "sum(k.male_n50s_wtchng_rt)/count(k.program_nm) as male50,\n" +
            "sum(k.male_n60s_above_wtchng_rt)/count(k.program_nm) as male60\n" +
            "from tb_k_drama k group by k.program_nm", nativeQuery = true)
    Optional<List<GenderAgeViewerInformation>> getData();
}
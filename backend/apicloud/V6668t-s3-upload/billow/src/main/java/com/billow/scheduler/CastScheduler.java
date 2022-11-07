package com.billow.scheduler;

import com.billow.domain.entity.program.Cast;
import com.billow.domain.entity.program.Program;
import com.billow.model.service.program.CastService;
import com.billow.model.service.program.ProgramService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;

import java.io.IOException;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Controller
@EnableScheduling
public class CastScheduler {

    private final ProgramService programService;
    private final CastService castService;

    //매주 월요일 0시 5분 실행
    @ApiOperation(value = "출연진 데이터 수집", response = Object.class)
    @Scheduled(cron = "0 5 0 ? * MON")
    public void cast() throws IOException {
        log.info("출연진 데이터 수집 Scheduler 실행");
        List<Program> programList = programService.findAll();
        for (int i = 0; i < programList.size(); i++) {
            List<Cast> castList = castService.findByProgram_Id(programList.get(i).getId());
            if (castList.size() == 0) {
                Connection connection = Jsoup.connect("https://search.naver.com/search.naver?query=" + programList.get(i).getTitle() + "출연진");
                Document document = connection.get();

                Elements castInfos = document.select(".list_image_info .item");
                for (Element castInfo : castInfos) {
                    String imgUrl = castInfo.select("img").attr("abs:src");
                    String playName = castInfo.select(".title_box .name a").text();
                    String actorName = castInfo.select(".title_box .sub_text").text();
                    if (actorName.equals("진행") || actorName.equals("출연") || actorName.equals("")) {
                        actorName = playName;
                    }
                    Cast cast = Cast.builder()
                            .program(programList.get(i))
                            .actorName(actorName)
                            .playName(playName)
                            .imgUrl(imgUrl)
                            .build();
                    castService.save(cast);
                }
            }
        }
        log.info("출연진 데이터 수집 Scheduler 성공");
    }
}
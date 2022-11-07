package com.billow.scheduler;

import com.billow.domain.entity.program.Program;
import com.billow.model.service.program.ProgramService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
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
public class ProgramScheduler {

    private final ProgramService programService;

    //매주 월요일 0시 실행
    @ApiOperation(value = "프로그램 방영정보 데이터 수집", response = Object.class)
    @Scheduled(cron = "0 0 0 ? * MON")
    public void programDetail() throws IOException {
        log.info("프로그램 방영정보 데이터 수집 Scheduler 호출");
        List<Program> programList = programService.findAll();
        for (int i = 0; i < programList.size(); i++) {
            if (programList.get(i).getBookmarkCnt() == null) {
                programList.get(i).setBookmarkCnt(0);
            }
            if (programList.get(i).getRatingCnt() == null) {
                programList.get(i).setRatingCnt(0L);
            }
            Connection connection = Jsoup.connect("https://search.naver.com/search.naver?query=" + programList.get(i).getTitle());
            Document document = connection.get();

            Elements subTitles = document.select(".title_area");
            if (subTitles.size() == 0) continue;
            Elements subTitle = subTitles.get(0).select(".sub_title span");
            if (subTitle.size() > 1) {
                String age = subTitle.get(2).text();
                programList.get(i).setAge(age);
            }
            Elements info = document.select(".info_group");
            if (info.size() > 0) {
                Elements infoDetail = info.get(0).select("dd span");
                if (infoDetail.size() > 1) {
                    String day = infoDetail.get(1).text();
                    if (!day.equals("") && day != null) {
                        programList.get(i).setEndFlag(true);
                        programList.get(i).setBroadcastingDay(day);
                    } else {
                        programList.get(i).setEndFlag(false);
                    }
                }
                String episode = info.get(0).select("dd .state").text();
                programList.get(i).setBroadcastingEpisode(episode);
            }
            programService.save(programList.get(i));
        }
        log.info("프로그램 방영정보 데이터 수집 Scheduler 성공");
    }
}
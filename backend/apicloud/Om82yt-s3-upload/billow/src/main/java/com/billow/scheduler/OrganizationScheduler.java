package com.billow.scheduler;

import com.billow.domain.entity.addition.BroadcastingAlarm;
import com.billow.domain.entity.organization.ProgramOrganization;
import com.billow.domain.entity.program.Program;
import com.billow.model.service.addtion.BroadcastingAlarmService;
import com.billow.model.service.organization.ProgramOrganozationService;
import com.billow.model.service.program.ProgramService;
import com.billow.util.DateUtil;
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
import java.text.ParseException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Controller
@EnableScheduling
public class OrganizationScheduler {

    private final ProgramService programService;
    private final ProgramOrganozationService programOrganozationService;

    private final BroadcastingAlarmService broadcastingAlarmService;

    //매일 0시 7분 실행
    @ApiOperation(value = "프로그램 편성표 데이터 수집", response = Object.class)
    @Scheduled(cron = "0 7 0 * * *")
    public void programOrganization() throws IOException, ParseException {
        log.info("프로그램 편성표 데이터 수집 Scheduler 호출");
        LocalDate today = LocalDate.now();
        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("MM.dd.");

        List<Program> programList = programService.findAll();
        for (int i = 0; i < programList.size(); i++) {
            Connection connection = Jsoup.connect("https://search.naver.com/search.naver?query=" + programList.get(i).getTitle() + "방송시간");
            Document document = connection.get();
            List<ProgramOrganization> programOrganizationList = programOrganozationService.findByProgram_Id(programList.get(i).getId());

            Elements channel = document.select(".table_scroll_wrap>.table_top_area>.cm_table tr a");
            if (!channel.isEmpty()) {
                Elements broadcastingDay = document.select(".table_fixed_wrap span");
                Elements broadcastingDayRow = document.select(".table_scroll_wrap>.table_body_area>.cm_table tr"); //이 사이즈는 날짜 index와 매칭

                for (int d = 0; d < broadcastingDayRow.size(); d++) {
                    if (!programOrganizationList.isEmpty() && !broadcastingDay.get(d).text().substring(0, 6).equals(today.plusDays(6).format(dateTimeFormatter))) {
                        continue;
                    }
                    Elements broadcastingTimeRow = broadcastingDayRow.get(d).select(">td");
                    for (int c = 0; c < broadcastingTimeRow.size(); c++) {
                        Elements broadcastingInfos = broadcastingTimeRow.get(c).select(".info");
                        if (!broadcastingInfos.isEmpty()) {
                            for (Element broadcastingInfo : broadcastingInfos) {
                                String time = Calendar.getInstance().get(Calendar.YEAR) + "." + broadcastingDay.get(d).text().substring(0, 5) + " " + broadcastingInfo.select(".time").text();
                                String day = broadcastingDay.get(d).text().substring(7);
                                ProgramOrganization programOrganization = ProgramOrganization.builder()
                                        .program(programList.get(i))
                                        .broadcastingDay(day)
                                        .broadcastingTime(DateUtil.toDate(time))
                                        .broadcastingEpisode(broadcastingInfo.select(".number_text").text())
                                        .broadcastingAge(broadcastingInfo.select(".age_limit").text())
                                        .broadcastingRerun(broadcastingInfo.select(".blind").text())
                                        .broadcastingStation(channel.get(c).text())
                                        .build();
                                programOrganozationService.save(programOrganization);
                            }
                        }
                    }
                }
            } else {
                Elements broadcastingDayRow = document.select(".tvtime_list .info_list");
                for (int d = 0; d < broadcastingDayRow.size(); d++) {
                    Elements broadcastingInfos = broadcastingDayRow.get(d).select(".info");
                    String broadcastingDay = broadcastingDayRow.get(d).select(".cm_date").text();
                    if (!programOrganizationList.isEmpty() && !broadcastingDay.substring(0, 6).equals(today.plusDays(6).format(dateTimeFormatter))) {
                        continue;
                    }
                    for (Element broadcastingInfo : broadcastingInfos) {
                        String time = Calendar.getInstance().get(Calendar.YEAR) + "." + broadcastingDay.substring(0, 5) + " " + broadcastingInfo.select(".time").text();
                        String day = broadcastingDay.substring(7);
                        ProgramOrganization programOrganization = ProgramOrganization.builder()
                                .program(programList.get(i))
                                .broadcastingDay(day)
                                .broadcastingTime(DateUtil.toDate(time))
                                .broadcastingEpisode(broadcastingInfo.select(".number_text").text())
                                .broadcastingAge(broadcastingInfo.select(".age_limit").text())
                                .broadcastingRerun(broadcastingInfo.select(".blind").text())
                                .broadcastingStation(broadcastingInfo.select("a").text())
                                .build();
                        programOrganozationService.save(programOrganization);
                    }
                }
            }
        }
        log.info("프로그램 편성표 데이터 수집 Scheduler 성공");
    }

    //2시간 주기로 실행
    @Scheduled(cron = "0 0 */2 * * *")
    @ApiOperation(value = "지난 편성표 데이터 삭제", response = Object.class)
    public void organizationDelete() throws IOException {
        log.info("지난 편성표 데이터 삭제 Scheduler 호출");
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.HOUR, -2);
        Date date = new Date(calendar.getTimeInMillis());
        List<ProgramOrganization> programOrganizationList = programOrganozationService.findByBroadcastingTimeBefore(date);
        for (ProgramOrganization programOrganization : programOrganizationList) {
            List<BroadcastingAlarm> broadcastingAlarmList = broadcastingAlarmService.findByProgramOrganization_Id(programOrganization.getId());
            for (BroadcastingAlarm broadcastingAlarm : broadcastingAlarmList) {
                broadcastingAlarmService.deleteAlarm(broadcastingAlarm.getId());
            }
            programOrganozationService.delete(programOrganization);
        }
        log.info("지난 편성표 데이터 삭제 Scheduler 삭제");
    }

    //10분 주기로 실행
    @Scheduled(cron = "0 */10 * * * *")
    @ApiOperation(value = "지난 편성표 데이터 삭제", response = Object.class)
    public void alarmDelete() throws IOException {
        log.info("지난 알림 데이터 삭제 Scheduler 호출");
        Date date = new Date();
        List<BroadcastingAlarm> broadcastingAlarmList = broadcastingAlarmService.findAll();
        for (BroadcastingAlarm broadcastingAlarm : broadcastingAlarmList) {
            if (broadcastingAlarm.getProgramOrganization().getBroadcastingTime().before(date)) {
                broadcastingAlarmService.deleteAlarm(broadcastingAlarm.getId());
            }
        }
        log.info("지난 알림 데이터 삭제 Scheduler 삭제");
    }
}

package com.billow.model.service.webClient;

import com.billow.domain.dto.program.ConditionRecommendRequest;
import com.billow.domain.dto.program.ProgramResponse;
import com.billow.domain.entity.addition.Rating;
import com.billow.domain.entity.program.ConditionRecommend;
import com.billow.domain.entity.program.Program;
import com.billow.domain.entity.user.User;
import com.billow.exception.NotFoundException;
import com.billow.model.repository.addition.RatingRepository;
import com.billow.model.repository.program.ConditionRecommendRepository;
import com.billow.model.repository.program.ProgramRepository;
import com.billow.model.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.text.DateFormat;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Service
public class webClientService {

    private static final String USER_NOT_FOUND = "해당 유저를 찾을 수 없습니다.";
    private static final String PROGRAM_NOT_FOUND = "해당 프로그램을 찾을 수 없습니다.";

    private final WebClient webClient;
    private final UserRepository userRepository;
    private final ProgramRepository programRepository;
    private final ConditionRecommendRepository conditionRecommendRepository;
    private final RatingRepository ratingRepository;

    public List<ProgramResponse> userProgramRecommend(Long userId) {
        List<Long> programIdList = callDjangoApi(userId);
        List<Program> programList = new ArrayList<>();
        for (Long programId : programIdList) {
            Program program = programRepository.findById(programId)
                    .orElseThrow(() -> new NotFoundException("프로그램이 없습니다."));
            programList.add(program);
        }
        return programList
                .stream()
                .map(program -> ProgramResponse.builder()
                        .id(program.getId())
                        .title(program.getTitle())
                        .age(program.getAge())
                        .summary(program.getSummary())
                        .broadcastingDay(program.getBroadcastingDay())
                        .broadcastingEpisode(program.getBroadcastingEpisode())
                        .broadcastingStation(program.getBroadcastingStation())
                        .endFlag(program.isEndFlag())
                        .firstAirDate(DateFormat.getDateInstance(DateFormat.LONG).format(program.getFirstAirDate()))
                        .averageRating(program.getAverageRating())
                        .bookmarkCnt(program.getBookmarkCnt())
                        .ratingCnt(program.getRatingCnt())
                        .posterImg(program.getPosterImg())
                        .backdropPath(program.getBackdropPath())
                        .build())
                .collect(Collectors.toList());
    }

    private List<Long> callDjangoApi(Long userId) {
        return webClient.get()
                .uri("db/" + userId + "/")
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .bodyToFlux(Long.class)
                .toStream()
                .collect(Collectors.toList());
    }

    public List<ProgramResponse> conditionRecommend(Long userId, ConditionRecommendRequest conditionRecommendRequest) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));

        String who = conditionRecommendRequest.getWho();
        String genre = conditionRecommendRequest.getGenre();
        List<Long> programList = conditionRecommendRequest.getProgramList();
        for (Long programId : programList) {
            Program program = programRepository.findById(programId)
                    .orElseThrow(() -> new NotFoundException(PROGRAM_NOT_FOUND));
            ConditionRecommend conditionRecommend = ConditionRecommend.builder()
                    .who(who)
                    .genre(genre)
                    .user(user)
                    .program(program)
                    .build();
            conditionRecommendRepository.save(conditionRecommend);
        }
        log.info("유저가 고른 프로그램 : " + conditionRecommendRequest.getProgramList().toString());

        List<Long> result = conditionRecommendRepository.findTop3ByWithWhomAndGenre(who, genre);
        log.info("해당 {}과 {}에 맞는 상위 프로그램 3개 추출 : {}", who, genre, result.toString());

        Set<Long> programIdSet = new HashSet<>();
        int cnt = 0;
        for (Long programId : result) {
            programRepository.findById(programId)
                    .orElseThrow(() -> new NotFoundException(PROGRAM_NOT_FOUND));
            List<Long> idList = getConditionProgramIdByDjango(programId);
            log.info("상위 프로그램 3개를 넣어서 나온 프로그램 : " + ++cnt + "회차, 프로그램 id : " + idList.toString());
            programIdSet.addAll(idList);
        }
        log.info("중복이 제거된 셋 : " + programIdSet);

        List<ProgramResponse> responses = new ArrayList<>();
        for (Long id : programIdSet) {
            Program program = programRepository.findById(id)
                    .orElseThrow(() -> new NotFoundException(PROGRAM_NOT_FOUND));
            ProgramResponse build = ProgramResponse.builder()
                    .id(program.getId())
                    .title(program.getTitle())
                    .age(program.getAge())
                    .genres(program.getGenreList()
                            .stream()
                            .map(g -> g.getGenreInfo().getName())
                            .collect(Collectors.toList()))
                    .summary(program.getSummary())
                    .broadcastingDay(program.getBroadcastingDay())
                    .broadcastingEpisode(program.getBroadcastingEpisode())
                    .broadcastingStation(program.getBroadcastingStation())
                    .endFlag(program.isEndFlag())
                    .firstAirDate(DateFormat.getDateInstance(DateFormat.LONG).format(program.getFirstAirDate()))
                    .averageRating(Float.valueOf(String.format("%.1f", program.getAverageRating())))
                    .bookmarkCnt(program.getBookmarkCnt())
                    .ratingCnt(program.getRatingCnt())
                    .posterImg(program.getPosterImg())
                    .backdropPath(program.getBackdropPath())
                    .build();
            responses.add(build);
        }
        return responses;
    }

    private List<Long> getConditionProgramIdByDjango(Long programId) {
        return webClient.get()
                .uri("db/program/" + programId + "/")
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .bodyToFlux(Long.class)
                .toStream()
                .collect(Collectors.toList());
    }

    public void makeRandomData() {
        int userCnt = (int) userRepository.count();
        int programCnt = (int) programRepository.count();

        Random r = new Random();
        String[] genre = new String[]{"행복", "우울", "심심", "화남"};
        String[] who = new String[]{"친구", "혼자", "가족", "애인"};

        for (int i = 0; i < 100; i++) {
            int randomUser = r.nextInt(userCnt);
            int randomGenre = r.nextInt(genre.length);
            int randomWho = r.nextInt(who.length);
            int randomProgram = r.nextInt(programCnt);

            User user = userRepository.findById((long) randomUser)
                    .orElseThrow(() -> new NotFoundException("없어"));
            Program program = programRepository.findById((long) randomProgram)
                    .orElseThrow(() -> new NotFoundException("프로그램 없어"));
            String pickedGenre = genre[randomGenre];
            String pickedWho = who[randomWho];

            ConditionRecommend build = ConditionRecommend.builder()
                    .program(program)
                    .user(user)
                    .genre(pickedGenre)
                    .who(pickedWho)
                    .build();
            conditionRecommendRepository.save(build);
        }
    }

    public void makeRandomRating() {
        int userCnt = (int) userRepository.count();
        int programCnt = (int) programRepository.count();

        Random r = new Random();
        float[] scoreSet = new float[]{1, 2, 3, 4, 5, 6, 7, 8, 9, 10};

        for (int i = 0; i < 1000; i++) {
            int randomUser = r.nextInt(userCnt);
            int randomProgram = r.nextInt(programCnt);
            int randomScore = r.nextInt(10);

            User user = userRepository.findById((long) randomUser)
                    .orElseThrow(() -> new NotFoundException("사용자 없어"));
            Program program = programRepository.findById((long) randomProgram)
                    .orElseThrow(() -> new NotFoundException("프로그램 없어"));
            float score = scoreSet[randomScore];

            Rating build = Rating.builder()
                    .program(program)
                    .user(user)
                    .score(score)
                    .build();

            ratingRepository.save(build);
        }
    }
}
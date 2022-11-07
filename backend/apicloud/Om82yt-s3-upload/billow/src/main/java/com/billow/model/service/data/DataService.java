package com.billow.model.service.data;

import com.billow.domain.dto.program.GenderAgeViewerInformation;
import com.billow.domain.entity.program.GenderAgeViewer;
import com.billow.domain.entity.program.Program;
import com.billow.exception.NotFoundException;
import com.billow.model.repository.data.kDramaRepository;
import com.billow.model.repository.data.kPopRepository;
import com.billow.model.repository.program.GenderAgeViewerRepository;
import com.billow.model.repository.program.ProgramRepository;
import com.billow.util.Message;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class DataService {

    private static final String DATA_NOT_FOUND = "데이터가 존재하지 않습니다.";
    private final kDramaRepository kDramaRepository;
    private final kPopRepository kPopRepository;
    private final GenderAgeViewerRepository genderAgeViewerRepository;
    private final ProgramRepository programRepository;

    public Message getkdramaData() {
        List<GenderAgeViewerInformation> kDramaList = kDramaRepository.getData()
                .orElseThrow(() -> new NotFoundException(DATA_NOT_FOUND));
        for (GenderAgeViewerInformation drama : kDramaList) {
            GenderAgeViewer program = GenderAgeViewer.builder()
                    .programTitle(drama.getProgram_Title())
                    .area(drama.getArea())
                    .genreLclas(drama.getGenre_Lclas()).genreMlsfc(drama.getGenre_Mlsfc()).genreSclas(drama.getGenre_Sclas())
                    .male0(drama.getMale0()).male10(drama.getMale10()).male20(drama.getMale20()).male30(drama.getMale30()).male40(drama.getMale40()).male50(drama.getMale50()).male60(drama.getMale60())
                    .female0(drama.getFemale0()).female10(drama.getFemale10()).female20(drama.getFemale20()).female30(drama.getFemale30())
                    .female40(drama.getFemale40()).female50(drama.getFemale50()).female60(drama.getFemale60())
                    .build();
            genderAgeViewerRepository.save(program);
        }
        return new Message("succeeded");
    }

    public Message getkpopData() {
        List<GenderAgeViewerInformation> kPopList = kPopRepository.getData()
                .orElseThrow(() -> new NotFoundException(DATA_NOT_FOUND));
        for (GenderAgeViewerInformation pop : kPopList) {

            GenderAgeViewer program = GenderAgeViewer.builder()
                    .programTitle(pop.getProgram_Title())
                    .area(pop.getArea())
                    .genreLclas(pop.getGenre_Lclas()).genreMlsfc(pop.getGenre_Mlsfc()).genreSclas(pop.getGenre_Sclas())
                    .male0(pop.getMale0()).male10(pop.getMale10()).male20(pop.getMale20()).male30(pop.getMale30()).male40(pop.getMale40()).male50(pop.getMale50()).male60(pop.getMale60())
                    .female0(pop.getFemale0()).female10(pop.getFemale10()).female20(pop.getFemale20()).female30(pop.getFemale30())
                    .female40(pop.getFemale40()).female50(pop.getFemale50()).female60(pop.getFemale60())
                    .build();
            genderAgeViewerRepository.save(program);
        }
        return new Message("succeeded");
    }

    public Message insertProgramId() {
        List<Program> programList = programRepository.findAll();
        for (Program program : programList) {
            String programTitle = program.getTitle().replaceAll(" ", "");
            GenderAgeViewer genderAgeViewer = genderAgeViewerRepository.findByProgramTitle(programTitle);
            if (genderAgeViewer != null) {
                genderAgeViewer.setProgram(program);
                genderAgeViewerRepository.save(genderAgeViewer);
            }
        }
        return new Message("succeeded");
    }
}
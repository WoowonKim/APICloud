package com.web.apicloud.model;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.web.apicloud.domain.dto.CodeResponse;
import com.web.apicloud.domain.dto.DetailRequest;
import com.web.apicloud.domain.entity.Docs;
import com.web.apicloud.domain.entity.Group;
import com.web.apicloud.domain.vo.ControllerVO;
import com.web.apicloud.exception.NotFoundException;
import com.web.apicloud.model.parsing.ParsingService;
import com.web.apicloud.model.parsing.S3Service;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class SynchronizeCodeServiceImpl implements SynchronizeCodeService {

    private static final String REQUEST_MAPPING = "@RequestMapping";
    private static final String VALUE = "value";
    private static final String METHOD = "Mapping";

    private static final String NOT_FOUND_FILE = "해당 파일을 찾을 수 없습니다.";

    private final DocsService docsService;
    private final GroupService groupService;
    private final S3Service s3Service;
    private final ParsingService parsingService;

    private static final ObjectMapper objectMapper = new ObjectMapper();
    private static List<CodeResponse> codeList = new ArrayList<>();
    private int count = 0;

    @Override
    public List<CodeResponse> updateCode(Long docId, DetailRequest detailRequest) throws IOException {
        codeList = new ArrayList<>();
        ControllerVO detailVO = objectMapper.readValue(detailRequest.getDetail(), ControllerVO.class);
        Docs doc = docsService.findByDocsId(docId);
        Group group = groupService.findById(doc.getGroup().getId());

        List<String> lines = s3Service.getFile(detailVO.getName(), null, group.getGroupSecretKey());
        if (lines == null) new NotFoundException(NOT_FOUND_FILE);

        codeList.add(CodeResponse.builder().name(detailVO.getName()).code(lines).build());
        getUpdateCode(detailVO);
        return codeList;
    }

    private void getUpdateCode(ControllerVO detailVO) {
        int i = 0;
        while (i < codeList.get(0).getCode().size()) {
            if (parsingService.KMP(codeList.get(0).getCode().get(i), REQUEST_MAPPING) != -1) {
                int target = parsingService.KMP(codeList.get(0).getCode().get(i), VALUE);
                String value = null;
                if (target != -1) {
                    value = parsingService.getValue(codeList.get(0).getCode().get(i).substring(target + 1, codeList.get(0).getCode().get(i).length()));
                } else {
                    value = parsingService.getValue(codeList.get(0).getCode().get(i));
                }
                // TODO : uri 없을 경우랑 삭제하는 경우 처리
                codeList.get(0).getCode().set(i, codeList.get(0).getCode().get(i).replace(value, detailVO.getCommonUri()));
                i++;
                break;
            }
            i++;
        }

        int start = i;
        while (i < codeList.get(0).getCode().size()) {
            if (parsingService.KMP(codeList.get(0).getCode().get(i), METHOD) != -1) {
                apiParsing(detailVO, start, i - 1);
                start = i;
            }
            i++;
        }

    }

    private void apiParsing(ControllerVO detailVO, int start, int end) {
        if (detailVO.getApis().size() <= count) return;
        updateMethodAndUri(detailVO, start);
        count++;
    }

    private void updateMethodAndUri(ControllerVO detailVO, int start) {
        List<String> getMethod = parsingService.getMethod(codeList.get(0).getCode().get(start));
        if (getMethod == null) return;
        if (getMethod.size() > 0) {
            codeList.get(0).getCode().set(start, codeList.get(0).getCode().get(start).replace(getMethod.get(0), detailVO.getApis().get(count).getMethod()));
        }
        if (getMethod.size() > 1) {
            if (detailVO.getApis().get(count).getUri() == null) {
                codeList.get(0).getCode().set(start, codeList.get(0).getCode().get(start).replace(getMethod.get(1), ""));
            } else {
                codeList.get(0).getCode().set(start, codeList.get(0).getCode().get(start).replace(getMethod.get(1), detailVO.getApis().get(count).getUri()));
            }
        } else {
            if (detailVO.getApis().get(count).getUri() != null) {
                String uri = "(\"" + detailVO.getApis().get(count).getUri() + "\")";
                codeList.get(0).getCode().set(start, codeList.get(0).getCode().get(start) + uri);
            }
        }
        System.out.println("메소드 변경");
        System.out.println(codeList.get(0).getCode().get(start));
    }
}

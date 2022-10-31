package com.web.apicloud.controller;

import com.web.apicloud.domain.dto.CreateDocDto;
import com.web.apicloud.domain.dto.DocListResponse;
import com.web.apicloud.model.DocsService;
import com.web.apicloud.util.ResponseHandler;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.io.IOException;
import java.util.List;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/docs")
public class DocsController {
    private final DocsService docsService;
    // FIXME: controller 안의 로직 밖에서 수행하거나 해당 controller api 막기
    private final ProjectWithControllerGenerationController projectGenerationController;

    @PostMapping()
    public ResponseEntity<Object> createDoc(@RequestBody CreateDocDto createDocDto) {
        try {
            log.info("DOC 생성 API 호출");
            Long docId = docsService.saveDocGetDocId(createDocDto);
            String encryptedUrl = docsService.encryptUrl(docId);
            return ResponseHandler.generateResponse("요청에 성공했습니다.", HttpStatus.OK, "encryptedUrl", encryptedUrl);
        } catch (Exception e) {
            log.error("DOC 생성 API 에러", e);
            return ResponseHandler.generateResponse("요청에 실패했습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping()
    public ResponseEntity<Object> getDocListByUser() {
        try {
            log.info("사용자별 DOC 리스트 조회 API 호출");
            List<DocListResponse> docListResponses = docsService.getDocs(1L);
            return ResponseHandler.generateResponse("요청에 성공했습니다.", HttpStatus.OK, "docList", docListResponses);
        } catch (Exception e) {
            log.info("사용자별 DOC 리스트 조회 API 에러", e);
            return ResponseHandler.generateResponse("요청에 실패했습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{docsId}/project")
    public ResponseEntity<byte[]> exportProject(@PathVariable Long docsId, @RequestHeader Map<String, String> headers) throws IOException {
        return projectGenerationController.springZip(docsService.getDocVOByDocsId(docsId), headers);
    }
}

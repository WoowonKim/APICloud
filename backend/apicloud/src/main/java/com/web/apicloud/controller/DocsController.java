package com.web.apicloud.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.web.apicloud.domain.dto.*;
import com.web.apicloud.domain.vo.DocVO;
import com.web.apicloud.model.DocsService;
import com.web.apicloud.model.NotionService;
import com.web.apicloud.util.FileUtils;
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

    private final NotionService notionService;

    private final ProjectWithControllerGenerationController projectGenerationController;

    @PostMapping()
    public ResponseEntity<Object> createDoc(@RequestBody CreateDocRequest createDocRequest) {
        log.info("DOC 생성 API 호출");
        Long docId = docsService.saveDocGetDocId(createDocRequest);
        String encryptedUrl = docsService.encryptUrl(docId);
        return ResponseEntity.ok().body(Map.of("encryptedUrl", encryptedUrl));
    }

    @GetMapping()
    public ResponseEntity<Object> getDocListByUser() {
        log.info("사용자별 DOC 리스트 조회 API 호출");
        List<DocListResponse> docListResponses = docsService.getDocs(1L);
        return ResponseEntity.ok().body(Map.of("docList", docListResponses));
    }

    @GetMapping("/{docId}")
    public ResponseEntity<Object> getSpecificDoc(@PathVariable Long docId) {
        log.info("특정 API DOC 조회 API 호출");
        UpdateDocDto updateDocDto = docsService.getDoc(docId);
        return ResponseEntity.ok().body(Map.of("docInformation", updateDocDto));
    }

    @PutMapping("/{docId}")
    public ResponseEntity<Object> updateDoc(@PathVariable Long docId, @RequestBody UpdateDocDto updateDocDto) {
        log.info("DOC 수정 API 호출");
        UpdateDocDto updateDocResponse = docsService.updateDoc(docId, updateDocDto);
        return ResponseEntity.ok().body(Map.of("updateDocDto", updateDocResponse));
    }

    @DeleteMapping("/{docId}")
    public ResponseEntity<Object> deleteDoc(@PathVariable Long docId) {
        log.info("DOC 삭제 API 호출");
        docsService.deleteDoc(docId);
        return ResponseEntity.ok(null);
    }

    @GetMapping("/{docsId}/project")
    public ResponseEntity<byte[]> exportProject(@PathVariable("docsId") Long docsId, @RequestHeader Map<String, String> headers) throws IOException {
        log.info("프로젝트 추출 API 호출");
        return projectGenerationController.springZip(docsService.getDocVOByDocsId(docsId), headers);
    }

    @GetMapping("/{docsId}/csv")
    public ResponseEntity<byte[]> exportCsv(@PathVariable("docsId") Long docsId) {
        log.info("csv 추출 API 호출");
        DocVO doc = docsService.getDocVOByDocsId(docsId);
        byte[] file = docsService.getCsvFile(doc.getControllers());
        return FileUtils.createResponseEntity(file, "text/csv", doc.getServer().getName() + ".csv");
    }

    @PostMapping("/{docsId}/notion")
    public ResponseEntity<NotionExportResponse> exportNotion(@PathVariable("docsId") Long docsId,
                                                             @RequestBody(required = false) NotionExportRequest request) {
        log.info("노션 추출 API 호출");
        DocVO doc = docsService.getDocVOByDocsId(docsId);
        notionService.makeApiPage(request.getToken(), request.getDatabaseId(), doc);
        return ResponseEntity.ok().body(new NotionExportResponse("https://www.notion.so/" + request.getDatabaseId()));
    }
}

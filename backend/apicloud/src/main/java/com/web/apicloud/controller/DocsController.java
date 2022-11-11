package com.web.apicloud.controller;

import com.web.apicloud.domain.dto.*;
import com.web.apicloud.domain.entity.Group;
import com.web.apicloud.domain.entity.GroupUser;
import com.web.apicloud.domain.entity.User;
import com.web.apicloud.domain.vo.DocVO;
import com.web.apicloud.domain.vo.UserAuthorityVO;
import com.web.apicloud.model.DocsService;
import com.web.apicloud.model.GroupUserService;
import com.web.apicloud.model.NotionService;
import com.web.apicloud.model.UserService;
import com.web.apicloud.security.CurrentUser;
import com.web.apicloud.security.UserPrincipal;
import com.web.apicloud.util.FileUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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

    private final GroupUserService groupUserService;

    private final UserService userService;

    @GetMapping("/authority/{docId}")
    public ResponseEntity<Object> getAuthority(@CurrentUser UserPrincipal userPrincipal, @PathVariable Long docId) {
        log.info("Doc 권한 조회 API 요청");
        Group group = docsService.findByDocsId(docId).getGroup();
        User user = userService.findUserById(userPrincipal.getId());
        GroupUser groupUser = groupUserService.getGroupUserByGroupAndUser(group, user);
        return ResponseEntity.ok().body(groupUser.getAuthority());
    }

    @PostMapping()
    public ResponseEntity<Object> createDoc(@RequestBody CreateDocRequest createDocRequest) {
        log.info("DOC 생성 API 호출");
        Long docId = docsService.saveDocGetDocId(createDocRequest);
        String encryptedUrl = docsService.encryptUrl(docId);
        Group group = docsService.findByDocsId(docId).getGroup();
        for (UserAuthorityVO userAuthorityVO : createDocRequest.getUserAuthorityVO()) {
            groupUserService.registerUser(group, userAuthorityVO);
        }
        return ResponseEntity.ok().body(new CreateDocResponse(encryptedUrl));
    }

    @GetMapping()
    public ResponseEntity<Object> getDocListByUser(@CurrentUser UserPrincipal userPrincipal) {
        log.info("사용자별 DOC 리스트 조회 API 호출");
        List<DocListResponse> docListResponses = docsService.getDocs(userPrincipal.getId());
        return ResponseEntity.ok().body(docListResponses);
    }

    @GetMapping("/{encryptedDocId}")
    public ResponseEntity<Object> getSpecificDoc(@PathVariable String encryptedDocId) {
        log.info("특정 API DOC 조회 API 호출");
        UpdateDocDto updateDocDto = docsService.getDoc(encryptedDocId);
        return ResponseEntity.ok().body(updateDocDto);
    }

    @PutMapping("/{docId}")
    public ResponseEntity<Object> updateDoc(@PathVariable Long docId, @RequestBody UpdateDocDto updateDocDto) {
        log.info("DOC 수정 API 호출");
        UpdateDocDto updateDocResponse = docsService.updateDoc(docId, updateDocDto);
        return ResponseEntity.ok().body(updateDocResponse);
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

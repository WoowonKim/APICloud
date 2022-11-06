package com.web.apicloud.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.web.apicloud.domain.dto.CreateDocRequest;
import com.web.apicloud.domain.dto.DocListResponse;
import com.web.apicloud.domain.dto.UpdateDocDto;
import com.web.apicloud.domain.entity.Group;
import com.web.apicloud.domain.entity.GroupUser;
import com.web.apicloud.domain.entity.User;
import com.web.apicloud.domain.vo.DocVO;
import com.web.apicloud.domain.vo.UserAuthorityVO;
import com.web.apicloud.model.DocsService;
import com.web.apicloud.model.GroupUserService;
import com.web.apicloud.model.UserService;
import com.web.apicloud.security.CurrentUser;
import com.web.apicloud.security.UserPrincipal;
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
    // FIXME: controller 안의 로직 밖에서 수행하거나 해당 controller api 막기

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
        try {
            log.info("DOC 생성 API 호출");
            Long docId = docsService.saveDocGetDocId(createDocRequest);
            String encryptedUrl = docsService.encryptUrl(docId);
            Group group = docsService.findByDocsId(docId).getGroup();
            for (UserAuthorityVO userAuthorityVO : createDocRequest.getUserAuthorityVO()) {
                groupUserService.registerUser(group, userAuthorityVO);
            }
            return ResponseHandler.generateResponse("API DOC 생성에 성공했습니다.", HttpStatus.OK, "encryptedUrl", encryptedUrl);
        } catch (Exception e) {
            log.error("DOC 생성 API 에러", e);
            return ResponseHandler.generateResponse("API DOC 생성에 실패했습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping()
    public ResponseEntity<Object> getDocListByUser() {
        try {
            log.info("사용자별 DOC 리스트 조회 API 호출");
            List<DocListResponse> docListResponses = docsService.getDocs(1L);
            return ResponseHandler.generateResponse("사용자별 API DOC 리스트 조회에 성공했습니다.", HttpStatus.OK, "docList", docListResponses);
        } catch (Exception e) {
            log.info("사용자별 DOC 리스트 조회 API 에러", e);
            return ResponseHandler.generateResponse("사용자별 API DOC 리스트 조회에 실패했습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{docId}")
    public ResponseEntity<Object> updateDoc(@PathVariable Long docId, @RequestBody UpdateDocDto updateDocDto) {
        try {
            log.info("DOC 수정 API 구현");
            UpdateDocDto updateDocResponse = docsService.updateDoc(docId, updateDocDto);
            return ResponseHandler.generateResponse("API DOC 수정에 성공했습니다.", HttpStatus.OK, "updateDocDto", updateDocResponse);
        } catch (Exception e) {
            log.info("DOC 수정 API 에러", e);
            return ResponseHandler.generateResponse("API DOC 수정에 실패했습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{docId}")
    public ResponseEntity<Object> deleteDoc(@PathVariable Long docId) {
        try {
            log.info("DOC 삭제 API 구현");
            docsService.deleteDoc(docId);
            return ResponseHandler.generateResponse("API DOC 삭제에 성공했습니다.", HttpStatus.OK);
        } catch (Exception e) {
            log.info("DOC 삭제 API 에러", e);
            return ResponseHandler.generateResponse("API DOC 삭제에 실패했습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{docsId}/project")
    public ResponseEntity<byte[]> exportProject(@PathVariable("docsId") Long docsId, @RequestHeader Map<String, String> headers) throws IOException {
        return projectGenerationController.springZip(docsService.getDocVOByDocsId(docsId), headers);
    }

    @GetMapping("/{docsId}/csv")
    public ResponseEntity<byte[]> exportCsv(@PathVariable("docsId") Long docsId) throws JsonProcessingException {
        DocVO doc = docsService.getDocVOByDocsId(docsId);
        byte[] file = docsService.getExcelFile(doc.getControllers());
        return FileUtils.createResponseEntity(file, "text/csv", doc.getServer().getName() + ".csv");
    }
}

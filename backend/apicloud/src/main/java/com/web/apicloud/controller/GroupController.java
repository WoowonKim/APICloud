package com.web.apicloud.controller;

import com.web.apicloud.domain.entity.Group;
import com.web.apicloud.domain.entity.GroupUser;
import com.web.apicloud.domain.entity.User;
import com.web.apicloud.domain.vo.UserAuthorityVO;
import com.web.apicloud.exception.UnauthorizedException;
import com.web.apicloud.model.DocsService;
import com.web.apicloud.model.GroupUserService;
import com.web.apicloud.model.UserService;
import com.web.apicloud.security.CurrentUser;
import com.web.apicloud.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/group")
public class GroupController {

    private  final GroupUserService groupUserService;

    private final DocsService docsService;

    private final UserService userService;

    @PutMapping("/{docId}")
    public ResponseEntity<Object> changeAuthority(@CurrentUser UserPrincipal userPrincipal, @PathVariable Long docId, @RequestBody UserAuthorityVO userAuthorityVO) {
        log.info("권한 수정 API 호출");
        Group group = docsService.findByDocsId(docId).getGroup();
        User user = userService.findUserById(userPrincipal.getId());
        GroupUser groupUser = groupUserService.getGroupUserByGroupAndUser(group,user);
        if (groupUser.getAuthority() != 1) {
            throw new UnauthorizedException("권한이 없습니다.");
        } else {
            groupUserService.updateUserAuthority(group, userAuthorityVO);
            return ResponseEntity.ok().body("성공!");
        }
    }

    @PostMapping("/{docId}")
    public ResponseEntity<Object> registerUser(@CurrentUser UserPrincipal userPrincipal, @PathVariable Long docId, @RequestBody UserAuthorityVO userAuthorityVO) {
        Group group = docsService.findByDocsId(docId).getGroup();
        User user = userService.findUserById(userPrincipal.getId());
        GroupUser groupUser = groupUserService.getGroupUserByGroupAndUser(group,user);
        if (groupUser.getAuthority() > 2) {
            throw new UnauthorizedException("권한이 없습니다.");
        } else {
            groupUserService.registerUser(group, userAuthorityVO);
            return ResponseEntity.ok().body("성공!");
        }
    }

    @DeleteMapping("/{docId}/{userId}")
    public ResponseEntity<Object> deleteUser(@CurrentUser UserPrincipal userPrincipal, @PathVariable Long docId, @PathVariable Long userId) {
        Group group = docsService.findByDocsId(docId).getGroup();
        User user = userService.findUserById(userPrincipal.getId());
        GroupUser groupUser = groupUserService.getGroupUserByGroupAndUser(group,user);
        if (groupUser.getAuthority() > 2) {
            throw new UnauthorizedException("권한이 없습니다.");
        } else {
            groupUserService.deleteUser(group, userService.findUserById(userId));
            return ResponseEntity.accepted().body("성공!");
        }
    }

}

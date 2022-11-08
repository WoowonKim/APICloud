package com.web.apicloud.model;

import com.web.apicloud.domain.entity.Group;
import com.web.apicloud.domain.entity.GroupUser;
import com.web.apicloud.domain.entity.User;
import com.web.apicloud.domain.vo.UserAuthorityVO;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface GroupUserService {

    void registerUser(Group group, UserAuthorityVO userAuthorityVO);

    void updateUserAuthority(Group group, UserAuthorityVO userAuthorityVO);

    GroupUser getGroupUserByGroupAndUser(Group group, User user);

    @Transactional
    void deleteUser(Group group, User user);
}

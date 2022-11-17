package com.web.apicloud.domain.dto;


import com.web.apicloud.domain.entity.GroupUser;
import com.web.apicloud.domain.entity.User;
import com.web.apicloud.domain.vo.UserAuthorityVO;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
public class GroupResponse {
    private List<UserAuthorityVO> users = new ArrayList<>();

    public GroupResponse(List<GroupUser> users) {
        for(GroupUser user: users) {
            this.users.add(new UserAuthorityVO(user.getId(), user.getAuthority()));
        }
    }
}

package com.web.apicloud.domain.dto;

import com.web.apicloud.domain.entity.User;
import lombok.Getter;

@Getter
public class UserAutorityResponse {
    private Long userId;
    private String name;
    private String email;
    private String imgUrl;
    private int authority;

    public UserAutorityResponse(User user, int authority) {
        this.authority = authority;
        this.imgUrl = user.getImageUrl();
        this.email = user.getEmail();
        this.name = user.getName();
        this.userId = user.getId();
    }
}

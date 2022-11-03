package com.web.apicloud.domain.dto;

import com.web.apicloud.domain.entity.User;
import lombok.Getter;

@Getter
public class UserResponse {
    private Long id;
    private String email;
    private String name;
    private String imgUrl;

    public UserResponse(User user) {
        this.id = user.getId();
        this.email = user.getEmail();
        this.name = user.getName();
        this.imgUrl = user.getImageUrl();
    }
}

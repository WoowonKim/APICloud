package com.web.apicloud.model;

import com.web.apicloud.domain.dto.UserResponse;
import com.web.apicloud.domain.entity.User;

import java.util.Optional;

public interface UserService {
    public UserResponse findUserById(Long id);
    public UserResponse findUserByEmail(String email);
}

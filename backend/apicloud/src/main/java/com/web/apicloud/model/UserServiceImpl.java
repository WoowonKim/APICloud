package com.web.apicloud.model;

import com.web.apicloud.domain.dto.UserResponse;
import com.web.apicloud.domain.repository.UserRepository;
import com.web.apicloud.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public UserResponse findUserById(Long id) {
        return new UserResponse(userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("user", "id", id)));
    }

    @Override
    public UserResponse findUserByEmail(String email) {
        return new UserResponse(userRepository.findByEmail(email).orElseThrow(() -> new ResourceNotFoundException("user", "id", email)));
    }

}

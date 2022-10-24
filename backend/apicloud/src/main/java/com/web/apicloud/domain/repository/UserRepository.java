package com.web.apicloud.domain.repository;

import com.web.apicloud.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
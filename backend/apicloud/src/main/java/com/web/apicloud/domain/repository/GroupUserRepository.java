package com.web.apicloud.domain.repository;

import com.web.apicloud.domain.entity.GroupUser;
import com.web.apicloud.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GroupUserRepository extends JpaRepository<GroupUser, Long> {

    List<GroupUser> findByUser(User user);
}

package com.web.apicloud.domain.repository;

import com.web.apicloud.domain.entity.Group;
import com.web.apicloud.domain.entity.GroupUser;
import com.web.apicloud.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface GroupUserRepository extends JpaRepository<GroupUser, Long> {

    List<GroupUser> findByGroup(Group group);

    List<GroupUser> findByUser(User user);

    Optional<GroupUser> findByGroupAndUser(Group group, User user);

    void deleteByGroupAndUser(Group group, User user);
}

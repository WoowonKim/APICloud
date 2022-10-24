package com.web.apicloud.domain.repository;

import com.web.apicloud.domain.entity.Group;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GroupRepository extends JpaRepository<Group, Long> {
}
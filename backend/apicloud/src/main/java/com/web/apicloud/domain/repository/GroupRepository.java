package com.web.apicloud.domain.repository;

import com.web.apicloud.domain.entity.Group;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


public interface GroupRepository extends JpaRepository<Group, Long> {

    @Query(value = "select max(group_id) from tb_group", nativeQuery = true)
    Long getLatestValue();
}
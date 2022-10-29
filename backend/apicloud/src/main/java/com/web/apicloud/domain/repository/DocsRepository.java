package com.web.apicloud.domain.repository;

import com.web.apicloud.domain.entity.Docs;
import com.web.apicloud.domain.entity.Group;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DocsRepository extends JpaRepository<Docs, Long> {
    List<Docs> findByGroup(Group group);
}
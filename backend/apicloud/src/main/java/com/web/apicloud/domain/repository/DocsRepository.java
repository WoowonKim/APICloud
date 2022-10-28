package com.web.apicloud.domain.repository;

import com.web.apicloud.domain.entity.Docs;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface DocsRepository extends JpaRepository<Docs, Long> {
    Docs getById(Long id);
}
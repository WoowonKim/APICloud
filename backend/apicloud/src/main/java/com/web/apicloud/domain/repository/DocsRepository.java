package com.web.apicloud.domain.repository;

import com.web.apicloud.domain.entity.Docs;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DocsRepository extends JpaRepository<Docs, Long> {
}
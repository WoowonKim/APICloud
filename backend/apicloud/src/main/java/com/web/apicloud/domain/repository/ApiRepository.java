package com.web.apicloud.domain.repository;

import com.web.apicloud.domain.entity.Api;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ApiRepository extends JpaRepository<Api, Long> {
}
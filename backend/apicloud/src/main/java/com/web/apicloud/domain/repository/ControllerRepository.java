package com.web.apicloud.domain.repository;

import com.web.apicloud.domain.entity.Controller;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ControllerRepository extends JpaRepository<Controller, Long> {
}
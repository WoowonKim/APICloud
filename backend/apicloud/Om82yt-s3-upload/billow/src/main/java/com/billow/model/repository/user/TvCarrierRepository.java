package com.billow.model.repository.user;

import com.billow.domain.entity.user.TvCarrier;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TvCarrierRepository extends JpaRepository<TvCarrier, Long> {

    TvCarrier findByCompany(String company);
}
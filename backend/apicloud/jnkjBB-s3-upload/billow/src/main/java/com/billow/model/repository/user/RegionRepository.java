package com.billow.model.repository.user;

import com.billow.domain.entity.user.Region;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RegionRepository extends JpaRepository<Region, Long> {

    Region findByRegion(String region);
}
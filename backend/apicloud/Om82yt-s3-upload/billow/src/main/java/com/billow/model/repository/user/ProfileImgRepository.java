package com.billow.model.repository.user;

import com.billow.domain.entity.user.ProfileImg;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfileImgRepository extends JpaRepository<ProfileImg, Long> {
}
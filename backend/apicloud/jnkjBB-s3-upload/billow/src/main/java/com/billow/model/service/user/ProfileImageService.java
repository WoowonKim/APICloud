package com.billow.model.service.user;

import com.billow.domain.entity.user.ProfileImg;
import com.billow.exception.NotFoundException;
import com.billow.model.repository.user.ProfileImgRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
@Service
public class ProfileImageService {
    private static final String IMAGE_NOT_FOUND = "해당 프로필 이미지를 찾을 수 없습니다.";

    private final ProfileImgRepository profileImgRepository;

    private final ResourceLoader resourceLoader;

    public ResponseEntity<Resource> initialSelectProfile(Long profileId) throws IOException {
        ProfileImg profileImg = profileImgRepository.findById(profileId)
                .orElseThrow(() -> new NotFoundException(IMAGE_NOT_FOUND));
        Resource resource = resourceLoader.getResource(profileImg.getUrl());
        HttpHeaders header = new HttpHeaders();
        header.add(HttpHeaders.CONTENT_TYPE, "image/png");
        return new ResponseEntity<Resource>(resource, header, HttpStatus.OK);
    }
}
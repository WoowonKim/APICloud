package com.web.apicloud.model.parsing;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface S3Service {
    void uploadZip(MultipartFile file) throws IOException;
}

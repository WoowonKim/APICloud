package com.web.apicloud.model.parsing;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface S3Service {
    void uploadZip(MultipartFile file, String groupSecretKey) throws IOException;

    List<String> getFile(String name, MultipartFile file, String s) throws IOException;
}

package com.web.apicloud.util;

import org.springframework.http.ResponseEntity;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

public class FileUtils {
    public static ResponseEntity<byte[]> createResponseEntity(byte[] content, String contentType, String fileName) {
        String contentDispositionValue = "attachment; filename=\"" + fileName + "\"";
        return ResponseEntity.ok().header("Content-Type", contentType)
                .header("Content-Disposition", contentDispositionValue).body(content);
    }

    public static byte[] readFromTemp(Path temp)
            throws IOException {
        byte[] bytes = Files.readAllBytes(temp);
        Files.deleteIfExists(temp);
        return bytes;
    }
}

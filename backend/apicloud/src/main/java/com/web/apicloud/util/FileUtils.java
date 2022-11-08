package com.web.apicloud.util;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileOutputStream;
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

    public static File convert(MultipartFile multipartFile) throws IOException {
        final int INPUT_STREAM_BUFFER_SIZE = 2048;
        File convertFile = new File(multipartFile.getOriginalFilename());
        if (convertFile.exists()) {
            remove(convertFile);
        }
        if (convertFile.createNewFile()) { // 로컬에 File이 생성됨 (이미 해당 File이 존재한다면 생성 불가)
            try (BufferedInputStream bis= new BufferedInputStream(multipartFile.getInputStream());
                 FileOutputStream fos = new FileOutputStream(convertFile)) {
                int length;
                byte[] bytes = new byte[INPUT_STREAM_BUFFER_SIZE];
                while((length = bis.read(bytes)) >= 0) {
                    fos.write(bytes,0, length);
                }
            }
            return convertFile;
        } else {
            throw new IllegalArgumentException("error: MultipartFile -> File convert fail");
        }
    }

    public static void remove(File file) throws IOException {
        if (file.isDirectory()) {
            removeDirectory(file);
        } else {
            removeFile(file);
        }
    }

    public static void removeDirectory(File directory) throws IOException {
        File[] files = directory.listFiles();
        for (File file : files) {
            remove(file);
        }
        removeFile(directory);
    }

    public static void removeFile(File file) throws IOException {
        if (file.delete()) {
            System.out.println("File [" + file.getName() + "] delete success");
            return;
        }
//        throw new FileNotFoundException("File [" + file.getName() + "] delete fail");
    }
}

package com.web.apicloud.model.parsing;

import com.amazonaws.services.s3.AbstractAmazonS3;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ListObjectsRequest;
import com.amazonaws.services.s3.model.ObjectListing;
import com.amazonaws.services.s3.model.S3ObjectSummary;
import com.amazonaws.services.s3.transfer.MultipleFileUpload;
import com.amazonaws.services.s3.transfer.TransferManager;
import com.amazonaws.services.s3.transfer.TransferProgress;
import com.web.apicloud.config.S3Config;
import com.web.apicloud.util.FileUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.lingala.zip4j.ZipFile;
import org.apache.commons.lang3.RandomStringUtils;
import org.aspectj.util.FileUtil;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class S3ServiceImpl implements S3Service {

    private final TransferManager transferManager;

    private final AmazonS3 amazonS3;


    @Value("${cloud.aws.s3.bucket}")
    public String bucket;

    @Override
    public void uploadZip(MultipartFile file, String groupSecretKey) throws IOException {
        File zipSource = FileUtils.convert(file);
        ZipFile zipFile = new ZipFile(zipSource);

        String uploadLocalPath = groupSecretKey + "-s3-upload";
        zipFile.extractAll(uploadLocalPath);
        FileUtils.remove(zipSource);
        File localDirectory = new File(uploadLocalPath);

        try {
            MultipleFileUpload uploadDirectory = transferManager.uploadDirectory(bucket, groupSecretKey, localDirectory, true);
            while (!uploadDirectory.isDone()) {
            }
        } finally {
            FileUtils.remove(localDirectory);
        }
    }

    @Override
    public List<String> getFile(String name, MultipartFile file, String groupSecretKey) throws IOException {
        String fileName = name + "Controller.java";
        if (file == null) {
            if (findPath(groupSecretKey)) {
                System.out.println("패스 존재함");
                findFile(fileName, groupSecretKey);
            } else {
                System.out.println("파일도 없고 패스도 없다.");
                return null;
            }
        } else {
            System.out.println("zip 파일 업로드");
//            uploadZip(file, groupSecretKey);
        }
        return null;
    }

    private boolean findPath(String groupSecretKey) {
        ListObjectsRequest listObjectsRequest = new ListObjectsRequest();
        listObjectsRequest.setBucketName(bucket);
        listObjectsRequest.setPrefix(groupSecretKey);
        ObjectListing s3Objects = amazonS3.listObjects(listObjectsRequest);
        if (s3Objects.getObjectSummaries().size() == 0) return false;
        return true;
    }

    public void findFile(String name, String groupSecretKey) {
        ListObjectsRequest listObjectsRequest = new ListObjectsRequest();
        listObjectsRequest.setBucketName(bucket);
        listObjectsRequest.setPrefix(groupSecretKey);

        ObjectListing s3Objects;
        do {
            s3Objects = amazonS3.listObjects(listObjectsRequest);
            for (S3ObjectSummary s3ObjectSummary : s3Objects.getObjectSummaries()) {
                String[] tokens = s3ObjectSummary.getKey().split("/");
                if (tokens[tokens.length - 1].equals(name)) {
                    System.out.println(tokens[tokens.length - 1]);
                    System.out.println(amazonS3.getUrl(bucket, s3ObjectSummary.getKey()).toString());
                }
            }
            listObjectsRequest.setMarker(s3Objects.getNextMarker());
        } while (s3Objects.isTruncated());
//        return S3GetResponseDto.from(fileNames);
    }

}

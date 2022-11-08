package com.web.apicloud.model.parsing;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.*;
import com.amazonaws.services.s3.transfer.MultipleFileUpload;
import com.amazonaws.services.s3.transfer.TransferManager;
import com.web.apicloud.util.FileUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.lingala.zip4j.ZipFile;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
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
        String fileName = name + ".java";
        if (file == null) {
            if (!findPath(groupSecretKey)) return null;
        }
        //else uploadZip(file, groupSecretKey);
        return findFile(fileName, groupSecretKey);
    }

    private boolean findPath(String groupSecretKey) {
        ListObjectsRequest listObjectsRequest = new ListObjectsRequest();
        listObjectsRequest.setBucketName(bucket);
        listObjectsRequest.setPrefix(groupSecretKey);
        ObjectListing s3Objects = amazonS3.listObjects(listObjectsRequest);
        if (s3Objects.getObjectSummaries().size() == 0) return false;
        return true;
    }

    public List<String> findFile(String name, String groupSecretKey) throws IOException {
        ListObjectsRequest listObjectsRequest = new ListObjectsRequest();
        listObjectsRequest.setBucketName(bucket);
        listObjectsRequest.setPrefix(groupSecretKey);

        ObjectListing s3Objects;
        do {
            s3Objects = amazonS3.listObjects(listObjectsRequest);
            for (S3ObjectSummary s3ObjectSummary : s3Objects.getObjectSummaries()) {
                String[] tokens = s3ObjectSummary.getKey().split("/");
                if (tokens[tokens.length - 1].equals(name)) {
                    return getCode(s3ObjectSummary.getKey());
                }
            }
            listObjectsRequest.setMarker(s3Objects.getNextMarker());
        } while (s3Objects.isTruncated());
        return null;
    }

    public List<String> getCode(String key) throws IOException {
        S3Object o = amazonS3.getObject(new GetObjectRequest(bucket, key));
        S3ObjectInputStream ois = null;
        BufferedReader br = null;
        List<String> line = new ArrayList<>();
        try {
            ois = o.getObjectContent();
            br = new BufferedReader(new InputStreamReader(ois, "UTF-8"));
            String str;
            while ((str = br.readLine()) != null) {
                line.add(str);
            }
        } finally {
            if (ois != null) {
                ois.close();
            }
            if (br != null) {
                br.close();
            }
        }
        if (line == null || line.size() == 0) return null;
        return line;
    }
}

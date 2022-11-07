package com.web.apicloud.model.parsing;

import com.amazonaws.services.s3.transfer.MultipleFileUpload;
import com.amazonaws.services.s3.transfer.TransferManager;
import com.amazonaws.services.s3.transfer.TransferProgress;
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

@Slf4j
@RequiredArgsConstructor
@Service
public class S3ServiceImpl implements S3Service{

    private final TransferManager transferManager;

    @Value("${cloud.aws.s3.bucket}")
    public String bucket;

    @Override
    public void uploadZip(MultipartFile file) throws IOException {
        File zipSource = FileUtils.convert(file);
        ZipFile zipFile = new ZipFile(zipSource);

        String uploadLocalPath = "1" + "-s3-upload";
        zipFile.extractAll(uploadLocalPath);
        FileUtils.remove(zipSource);
        File localDirectory = new File(uploadLocalPath);

        try {
            MultipleFileUpload uploadDirectory = transferManager.uploadDirectory(bucket, "1", localDirectory, true);
            while (!uploadDirectory.isDone()) {
            }
        } finally {
            FileUtils.remove(localDirectory);
        }
    }
}

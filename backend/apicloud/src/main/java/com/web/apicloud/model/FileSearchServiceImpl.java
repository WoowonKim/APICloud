package com.web.apicloud.model;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
@Service
public class FileSearchServiceImpl implements FileSearchService {

    private boolean state = false;
    private String searchPath;

    @Override
    public String getControllerPath(String root, String name) {
        String fileName = name + "Controller.java";
        subDirList(root, fileName);
        System.out.println("컨트롤러 파일 : " + searchPath);
        if (state) {
            state = false;
            return searchPath;
        }
        return null;
    }

    @Override
    public String getClassPath(String root, String name) {
        String fileName = name + ".java";
        subDirList(root, fileName);
        System.out.println("오브젝트 파일 : " + searchPath);
        if (state) {
            state = false;
            return searchPath;
        }
        return null;
    }

    public void subDirList(String filePath, String fileName) {
        if (state) return;
        File file = new File(filePath);
        File[] fileList = file.listFiles();

        try {
            for (File tmpFile : fileList) {
                if (tmpFile.isFile()) {
//                    System.out.println("\t 파일 = " + filePath + "/" + tmpFile.getName());
                    if (tmpFile.getName().equals(fileName)) {
                        state = true;
                        searchPath = filePath + "/" + tmpFile.getName();
                        return;
                    }
                } else if (tmpFile.isDirectory()) {
//                    System.out.println("디렉토리 = " + filePath + "/" + tmpFile.getName());
                    subDirList(tmpFile.getCanonicalPath().toString(), fileName);
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
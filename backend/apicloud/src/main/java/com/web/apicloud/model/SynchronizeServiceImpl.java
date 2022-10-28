package com.web.apicloud.model;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestHeader;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class SynchronizeServiceImpl implements SynchronizeService {

    private static final String REQUEST_MAPPING = "@RequestMapping";
    private static final String METHOD = "Mapping";

    @Override
    public Object getFile(String root, String name) throws IOException {
        List<String> lines = Files.readAllLines(Paths.get("C:/S07P22B309/backend/billow/src/main/java/com/billow/controller/program/ProgramController.java"));
        int i = 0;
        while (i < lines.size()) {
            if (KMP(lines.get(i++), REQUEST_MAPPING)) {
                //TODO : uri 추출해서 저장
                break;
            }
        }

        List<String> api = new ArrayList<>();
        while (i < lines.size()) {
            if (KMP(lines.get(i), METHOD)) {
                apiParsing(api);
                api = new ArrayList<>();
            }
            api.add(lines.get(i++));
        }
        return null;
    }

    private void apiParsing(List<String> api) {
        String method = getMethod(api.get(0));
        if(method == null) return;
        System.out.println("method" + method.toUpperCase());
        //public ResponseEntity<Object> selectUser(@RequestHeader("Auth-access") String token) throws IOException {
    }

    private String getMethod(String str) {
        int targetIdx1 = str.indexOf("@");
        int targetIdx2 = str.indexOf(METHOD);

        if (targetIdx1 == -1 || targetIdx2 == -1) return null;
        String method = str.substring(targetIdx1 + 1, targetIdx2);

        targetIdx1 = str.indexOf("(");
        targetIdx2 = str.indexOf(")");
        return method;
    }

    static boolean KMP(String parent, String pattern) {
        int parentLength = parent.length();
        int patternLength = pattern.length();

        int[] table = new int[patternLength];

        int idx = 0; // 현재 대응되는 글자 수
        for (int i = 0; i < parentLength; i++) {
            // idx번 글자와 짚더미의 해당 글자가 불일치할 경우,
            // 현재 대응된 글자의 수를 table[idx-1]번으로 줄인다.
            while (idx > 0 && parent.charAt(i) != pattern.charAt(idx)) {
                idx = table[idx - 1];
            }
            // 글자가 대응될 경우
            if (parent.charAt(i) == pattern.charAt(idx)) {
                if (idx == patternLength - 1) {
                    System.out.println(parent);
                    idx = table[idx];
                    return true;
                } else {
                    idx += 1;
                }
            }
        }
        return false;
    }
}
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
        List<String> getMethod = `getMethod`(api.get(0));
        if (getMethod != null && getMethod.size() > 0) {
            //메소드 저장
        }
        if (getMethod != null && getMethod.size() > 1) {
            //uri 저장
        }

        for (int i = 1; i < api.size(); i++) {
            int targetIdx1 = api.get(i).indexOf("ResponseEntity");
            System.out.println(targetIdx1);
            if (targetIdx1 == -1) continue;
            String[] split = api.get(i).split(",");
            for (int j = 0; j < split.length; j++) {
                System.out.println(split[j]);
            }
            System.out.println(api.get(i));
            break;
        }
        //public ResponseEntity<Object> selectUser(@RequestHeader("Auth-access") String token) throws IOException {
    }

    private List<String> getMethod(String str) {
        List<String> getMethod = new ArrayList<>();

        int targetIdx1 = str.indexOf("@");
        int targetIdx2 = str.indexOf(METHOD);

        if (targetIdx1 == -1 || targetIdx2 == -1) return null;
        String method = str.substring(targetIdx1 + 1, targetIdx2);
        getMethod.add(method.toUpperCase());

        targetIdx1 = str.indexOf("\"");
        if (targetIdx1 == -1) return getMethod;
        String subString = str.substring(targetIdx1 + 1, str.length());
        targetIdx2 = subString.indexOf("\"");
        String uri = subString.substring(0, targetIdx2);

        getMethod.add(uri);
        return getMethod;
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
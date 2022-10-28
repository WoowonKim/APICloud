package com.web.apicloud.model;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class SynchronizeServiceImpl implements SynchronizeService{
    @Override
    public Object getFile(String root, String name) throws IOException {
        List<String> lines = Files.readAllLines(Paths.get("C:/S07P22B309/backend/billow/src/main/java/com/billow/controller/program/ProgramController.java"));
        for (String line :
                lines) {
//            System.out.println(line);
            KMP(line, "@");
        }
        return null;
    }

    static void KMP(String parent, String pattern) {

        int n1 = parent.length();
        int n2 = pattern.length();

        int[] table = new int[n2];

        int idx = 0; // 현재 대응되는 글자 수
        for(int i=0; i< n1; i++) {
            // idx번 글자와 짚더미의 해당 글자가 불일치할 경우,
            // 현재 대응된 글자의 수를 table[idx-1]번으로 줄인다.
            while(idx>0 && parent.charAt(i) != pattern.charAt(idx)) {
                idx = table[idx-1];
            }
            // 글자가 대응될 경우
            if(parent.charAt(i) == pattern.charAt(idx)) {
                if(idx == n2-1) {
                    System.out.println(i-idx+1 + "번째에서 찾았습니다. ~" + (i+1) );
                    System.out.println(parent);
                    idx =table[idx];
                }else {
                    idx += 1;
                }
            }
        }
    }
}
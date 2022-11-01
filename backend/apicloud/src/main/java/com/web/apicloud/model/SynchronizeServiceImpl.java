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
import java.util.Stack;
import java.util.StringTokenizer;

@Slf4j
@RequiredArgsConstructor
@Service
public class SynchronizeServiceImpl implements SynchronizeService {

    private static final String REQUEST_MAPPING = "@RequestMapping";
    private static final String METHOD = "Mapping";
    private static final String RESPONSE_ENTITY = "ResponseEntity";
    private static final String REQUEST_PARAM = "RequestParam";
    private static final String PATH_VARIABLE = "PathVariable";
    private static final String REQUEST_BODY = "RequestBody";

    @Override
    public Object getFile(String root, String name) throws IOException {
        List<String> lines = Files.readAllLines(Paths.get("C:/S07P22B309/backend/billow/src/main/java/com/billow/controller/program/ProgramController.java"));
        int i = 0;
        while (i < lines.size()) {
            if (KMP(lines.get(i++), REQUEST_MAPPING) != -1) {
                //TODO : uri 추출해서 저장
                break;
            }
        }

        List<String> api = new ArrayList<>();
        while (i < lines.size()) {
            if (KMP(lines.get(i), METHOD) != -1) {
                apiParsing(api);
                api = new ArrayList<>();
            }
            api.add(lines.get(i++));
        }
        return null;
    }

    private void apiParsing(List<String> api) {
        List<String> getMethod = getMethod(api.get(0));
        if (getMethod != null && getMethod.size() > 0) {
            //메소드 저장
        }
        if (getMethod != null && getMethod.size() > 1) {
            //uri 저장
        }

        for (int i = 1; i < api.size(); i++) {
            if (KMP(api.get(i), RESPONSE_ENTITY) != -1) {
                getApi(i, api);
                break;
            }
        }
    }

    private void getRequestDetail(String request) {
        if (request == "") return;
//        request = request.replaceAll(",$", "");
        System.out.println("getRequestDetail ==> " + request);
        String[] tokens = request.split(" ");

        if (KMP(tokens[0], REQUEST_PARAM) != -1) {

        } else if (KMP(tokens[0], PATH_VARIABLE) != -1) {

        } else if (KMP(tokens[0], REQUEST_BODY) != -1) {

        }

        for (int i = 0; i < tokens.length; i++) {
            System.out.println(tokens[i]);
        }
    }

    private void getResponseDetail(String response) {
        if (response == "") return;
        System.out.println("getResponseDetail ==> " + response);
    }

    private void getApi(int i, List<String> api) {
        Stack<Character> stack = new Stack<>();
        boolean responseFlag = false;
        boolean requestFlag = false;
        String response = "";
        String request = "";

        while (i < api.size()) {
            for (int j = 0; j < api.get(i).length(); j++) {
                switch (api.get(i).charAt(j)) {
                    case '<':
                        stack.push('<');
                        if (requestFlag) {
                            request += api.get(i).charAt(j);
                        } else {
                            responseFlag = true;
                        }
                        break;
                    case '(':
                        stack.push('(');
                        if (requestFlag) {
                            request += api.get(i).charAt(j);
                        }
                        break;
                    case '{':
                        stack.push('{');
                        if (requestFlag) {
                            request += api.get(i).charAt(j);
                        }
                        break;
                    case '[':
                        stack.push('[');
                        if (requestFlag) {
                            request += api.get(i).charAt(j);
                        }
                        break;
                    case '>':
                        if (stack.peek() == '<') stack.pop();
                        if (requestFlag) {
                            request += api.get(i).charAt(j);
                        } else {
                            responseFlag = false;
                            getResponseDetail(response);
                        }
                        break;
                    case ')':
                        if (stack.peek() == '(') stack.pop();
                        if (stack.isEmpty()) {
                            getRequestDetail(request);
                            return;
                        }
                        if (requestFlag) {
                            request += api.get(i).charAt(j);
                        }
                        break;
                    case '}':
                        if (stack.peek() == '}') stack.pop();
                        if (requestFlag) {
                            request += api.get(i).charAt(j);
                        }
                        break;
                    case ']':
                        if (stack.peek() == ']') stack.pop();
                        if (requestFlag) {
                            request += api.get(i).charAt(j);
                        }
                        break;
                    case '@':
                        getRequestDetail(request);
                        request = "";
                        requestFlag = true;
                        request += api.get(i).charAt(j);
                        break;
                    default:
                        if (responseFlag) {
                            response += api.get(i).charAt(j);
                        }
                        if (requestFlag) {
                            request += api.get(i).charAt(j);
                        }
                }
            }
            i++;
        }
    }

    private List<String> getMethod(String str) {
        List<String> getMethod = new ArrayList<>();

        int targetIdx1 = KMP(str, "@");
        int targetIdx2 = KMP(str, METHOD);

        if (targetIdx1 == -1 || targetIdx2 == -1) return null;
        String method = str.substring(targetIdx1 + 1, targetIdx2 - METHOD.length() + 1);
        getMethod.add(method.toUpperCase());

        targetIdx1 = KMP(str, "\"");
        if (targetIdx1 == -1) return getMethod;
        String subString = str.substring(targetIdx1 + 1, str.length());
        targetIdx2 = KMP(subString, "\"");
        String uri = subString.substring(0, targetIdx2);
        getMethod.add(uri);

        return getMethod;
    }

    static int KMP(String parent, String pattern) {
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
                    idx = table[idx];
                    return i;
                } else {
                    idx += 1;
                }
            }
        }
        return -1;
    }
}
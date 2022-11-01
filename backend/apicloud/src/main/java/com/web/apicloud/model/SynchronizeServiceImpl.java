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
    private static final String VALUE = "value";
    private static final String[] type = {"String", "Long", "long", "Integer", "int", "float", "Float"};

    @Override
    public Object getFile(String root, String name) throws IOException {
        List<String> lines = Files.readAllLines(Paths.get("C:/S07P22B309/backend/billow/src/main/java/com/billow/controller/program/ProgramController.java"));
        int i = 0;
        while (i < lines.size()) {
            if (KMP(lines.get(i), REQUEST_MAPPING) != -1) {
                int target = KMP(lines.get(i), VALUE);
                String value = null;
                if (target != -1) {
                    value = getValue(lines.get(i).substring(target + 1, lines.get(i).length()));
                } else {
                    value = getValue(lines.get(i));
                }
                // TODO: 저장
                break;
            }
            i++;
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
        if(api.size() == 0) return;
        System.out.println("api ==> "+api);
        List<String> getMethod = getMethod(api.get(0));
        if (getMethod != null && getMethod.size() > 0) {
            // TODO: 저장
        }
        if (getMethod != null && getMethod.size() > 1) {
            // TODO: uri 저장
        }

        for (int i = 1; i < api.size(); i++) {
            if (KMP(api.get(i), RESPONSE_ENTITY) != -1) {
                getApi(i, api);
                break;
            }
        }
    }

    private void getRequestDetail(String request) {
        if (request.equals("")) return;
        System.out.println("getRequestDetail ==> " + request);
        String type = getType(request);
        String value = null;
        int pathVariable = KMP(request, PATH_VARIABLE);
        if (pathVariable != -1) {
            String str = request.substring(pathVariable + 1, request.length());
            value = getValue(str);
        } else {
            int requestParam = KMP(request, REQUEST_PARAM);
            if (requestParam != -1) {
                int target = KMP(request, VALUE);
                if (target != -1) {
                    String str = request.substring(target + 1, request.length());
                    value = getValue(str);
                }
            } else {
                int requestBody = KMP(request, REQUEST_BODY);
                if (requestBody != -1) {
                    String[] tokens = request.split(" ");
                    System.out.println(tokens[1]);
                }
            }
        }

        // TODO: value, type 저장
    }

    private void getResponseDetail(String response) {
        if (response.equals("")) return;
        System.out.println("getResponseDetail ==> " + response);
        // TODO: response 탐색
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
                            if(stack.isEmpty()){
                                responseFlag = false;
                                getResponseDetail(response);
                            }
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

        String uri = getValue(str);
        if (uri != null) getMethod.add(uri);
        return getMethod;
    }

    private String getValue(String str) {
        int targetIdx1 = KMP(str, "\"");
        if (targetIdx1 == -1) return null;
        String subString = str.substring(targetIdx1 + 1, str.length());
        int targetIdx2 = KMP(subString, "\"");
        System.out.println(subString.substring(0, targetIdx2));
        return subString.substring(0, targetIdx2);
    }

    private String getType(String str) {
        for (String type : type) {
            if (KMP(str, type) != -1) {
                System.out.println("type ==> " + type);
                return type;
            }
        }
        return null;
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
package com.web.apicloud.model;

import com.web.apicloud.domain.entity.Api;
import com.web.apicloud.domain.vo.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.*;

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
//        List<String> lines = Files.readAllLines(Paths.get("C:/S07P22B309/backend/billow/src/main/java/com/billow/controller/program/ProgramController.java"));
        List<String> lines = Files.readAllLines(Paths.get("/Users/bbb381/S07P22B309/backend/billow/src/main/java/com/billow/controller/user/UserController.java"));
        String value = null;
        int i = 0;
        while (i < lines.size()) {
            if (KMP(lines.get(i), REQUEST_MAPPING) != -1) {
                int target = KMP(lines.get(i), VALUE);
                if (target != -1) {
                    value = getValue(lines.get(i).substring(target + 1, lines.get(i).length()));
                } else {
                    value = getValue(lines.get(i));
                }
                i++;
                break;
            }
            i++;
        }

        List<ApiVO> apis = new ArrayList<>();
        List<String> api = new ArrayList<>();
        while (i < lines.size()) {
            if (KMP(lines.get(i), METHOD) != -1) {
                ApiVO apiVO = apiParsing(api);
                if (apiVO != null) {
                    apis.add(apiVO);
                }
                api = new ArrayList<>();
            }
            api.add(lines.get(i++));
        }
        ApiVO apiVO = apiParsing(api);
        if (apiVO != null) {
            apis.add(apiVO);
        }

        ControllerVO controllerVO = ControllerVO.builder()
                .commonUri(value)
                .apis(apis)
                .build();
        System.out.println(controllerVO);
        return null;
    }

    private ApiVO apiParsing(List<String> api) {
        if (api.size() == 0) return null;
        System.out.println("api ==> " + api);
        List<String> getMethod = getMethod(api.get(0));
        if (getMethod == null) return null;
        String method = null, uri = null;
        if (getMethod.size() > 0) {
            method = getMethod.get(0);
        }
        if (getMethod.size() > 1) {
            uri = getMethod.get(1);
        }
        ApiDetailVO apiDetail = null;
        for (int i = 1; i < api.size(); i++) {
            if (KMP(api.get(i), RESPONSE_ENTITY) != -1) {
                apiDetail = getApi(i, api);
                break;
            }
        }

        if (apiDetail == null) {
            ApiVO apiVO = ApiVO.builder()
                    .uri(uri)
                    .method(method)
                    .build();
            return apiVO;
        }
        ApiVO apiVO = ApiVO.builder()
                .uri(uri)
                .method(method)
                .parameters(apiDetail.getParameters())
                .query(apiDetail.getQuery())
                .requestBody(apiDetail.getRequestBody())
                .responses(apiDetail.getResponses())
                .headers(apiDetail.getHeaders())
                .build();
        return apiVO;
    }

    private void getRequestDetail(ApiDetailVO apiDetail, String request) {
        if (request.equals("")) return;
        System.out.println("getRequestDetail ==> " + request);
        String type = getType(request);

        int pathVariable = KMP(request, PATH_VARIABLE);
        if (pathVariable != -1) {
            String str = request.substring(pathVariable + 1, request.length());
            String value = getValue(str);
            PropertyVO parameter = PropertyVO.builder().name(value).type(type).build();
            apiDetail.getParameters().add(parameter);
        } else {
            int requestParam = KMP(request, REQUEST_PARAM);
            if (requestParam != -1) {
                int target = KMP(request, VALUE);
                if (target != -1) {
                    String str = request.substring(target + 1, request.length());
                    String value = getValue(str);
                    PropertyVO query = PropertyVO.builder().name(value).type(type).build();
                    apiDetail.getQuery().getProperties().add(query);
                }
            } else {
                int requestBody = KMP(request, REQUEST_BODY);
                if (requestBody != -1) {
                    String[] tokens = request.split(" ");
                    System.out.println(tokens[1]);
                }
            }
        }
    }

    private void getResponseDetail(ApiDetailVO apiDetail, String response) {
        if (response.equals("")) return;
        System.out.println("getResponseDetail ==> " + response);
        // TODO: response 탐색
    }

    private ApiDetailVO getApi(int i, List<String> api) {
        Stack<Character> stack = new Stack<>();
        boolean responseFlag = false;
        boolean requestFlag = false;
        String response = "";
        String request = "";

        ApiDetailVO apiDetail = new ApiDetailVO();

        while (i < api.size()) {
            for (int j = 0; j < api.get(i).length(); j++) {
                if (requestFlag) request += api.get(i).charAt(j);
                switch (api.get(i).charAt(j)) {
                    case '<':
                        stack.push('<');
                        if (!requestFlag) responseFlag = true;
                        break;
                    case '(':
                        stack.push('(');
                        break;
                    case '{':
                        stack.push('{');
                        break;
                    case '[':
                        stack.push('[');
                        break;
                    case '>':
                        if (stack.peek() == '<') stack.pop();
                        if (!requestFlag) {
                            if (stack.isEmpty()) {
                                responseFlag = false;
                                // TODO : response
                                getResponseDetail(apiDetail, response);
                            }
                        }
                        break;
                    case ')':
                        if (stack.peek() == '(') stack.pop();
                        if (stack.isEmpty()) {
                            // TODO : requestBody, parameters, query
                            getRequestDetail(apiDetail, request);
                            return apiDetail;
                        }
                        break;
                    case '}':
                        if (stack.peek() == '}') stack.pop();
                        break;
                    case ']':
                        if (stack.peek() == ']') stack.pop();
                        break;
                    case '@':
                        // TODO : requestBody, parameters, query
                        getRequestDetail(apiDetail, request);
                        request = "";
                        requestFlag = true;
                        request += api.get(i).charAt(j);
                        break;
                    default:
                        if (responseFlag) response += api.get(i).charAt(j);
                }
            }
            i++;
        }
        return apiDetail;
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
//        System.out.println(subString.substring(0, targetIdx2));
        return subString.substring(0, targetIdx2);
    }

    private String getType(String str) {
        for (String type : type) {
            if (KMP(str, type) != -1) {
//                System.out.println("type ==> " + type);
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
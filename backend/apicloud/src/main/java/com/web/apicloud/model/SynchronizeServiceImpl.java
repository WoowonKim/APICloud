package com.web.apicloud.model;

import com.web.apicloud.domain.vo.*;
import com.web.apicloud.model.parsing.ClassParsingService;
import com.web.apicloud.model.parsing.FileSearchService;
import com.web.apicloud.model.parsing.ParsingService;
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
    private static String rootPath = "";

    private final ParsingService parsingService;
    private final ClassParsingService classParsingService;
    private final FileSearchService fileSearchService;

    @Override
    public ControllerVO getFile(String root, String name) throws IOException {
        rootPath = root;
        String path = fileSearchService.getControllerPath(rootPath, name);
        if (path == null) return null;
        List<String> lines = Files.readAllLines(Paths.get(path));
//        List<String> lines = Files.readAllLines(Paths.get("C:/S07P22B309/backend/billow/src/main/java/com/billow/controller/program/ProgramController.java"));
//        List<String> lines = Files.readAllLines(Paths.get("/Users/bbb381/S07P22B309/backend/billow/src/main/java/com/billow/controller/user/UserController.java"));
        String value = null;
        int i = 0;
        while (i < lines.size()) {
            if (parsingService.KMP(lines.get(i), REQUEST_MAPPING) != -1) {
                int target = parsingService.KMP(lines.get(i), VALUE);
                if (target != -1) {
                    value = parsingService.getValue(lines.get(i).substring(target + 1, lines.get(i).length()));
                } else {
                    value = parsingService.getValue(lines.get(i));
                }
                i++;
                break;
            }
            i++;
        }

        List<ApiVO> apis = new ArrayList<>();
        List<String> api = new ArrayList<>();
        while (i < lines.size()) {
            if (parsingService.KMP(lines.get(i), METHOD) != -1) {
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
        return controllerVO;
    }

    private ApiVO apiParsing(List<String> api) throws IOException {
        if (api.size() == 0) return null;
//        System.out.println("api ==> " + api);
        List<String> getMethod = parsingService.getMethod(api.get(0));
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
            if (parsingService.KMP(api.get(i), RESPONSE_ENTITY) != -1) {
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

    private void getRequestDetail(ApiDetailVO apiDetail, String request) throws IOException {
        if (request.equals("")) return;
//        System.out.println("getRequestDetail ==> " + request);
        String type = parsingService.getType(request);

        int pathVariable = parsingService.KMP(request, PATH_VARIABLE);
        if (pathVariable != -1) {
            String str = request.substring(pathVariable + 1, request.length());
            String value = parsingService.getValue(str);
            PropertyVO parameter = PropertyVO.builder().name(value).type(type).build();
            apiDetail.getParameters().add(parameter);
        } else {
            int requestParam = parsingService.KMP(request, REQUEST_PARAM);
            if (requestParam != -1) {
                int target = parsingService.KMP(request, VALUE);
                if (target != -1) {
                    String str = request.substring(target + 1, request.length());
                    String value = parsingService.getValue(str);
                    PropertyVO query = PropertyVO.builder().name(value).type(type).build();
                    apiDetail.getQuery().getProperties().add(query);
                }
            } else {
                int requestBody = parsingService.KMP(request, REQUEST_BODY);
                if (requestBody != -1) {
                    String[] tokens = request.split(" ");
                    apiDetail.setRequestBody(classParsingService.getBody(rootPath, tokens[1]));
                }
            }
        }
    }

    private void getResponseDetail(ApiDetailVO apiDetail, String response) {
        if (response.equals("")) return;
//        System.out.println("getResponseDetail ==> " + response);
        // TODO: response 탐색
    }

    private ApiDetailVO getApi(int i, List<String> api) throws IOException {
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
}

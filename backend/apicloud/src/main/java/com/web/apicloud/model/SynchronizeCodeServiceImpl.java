package com.web.apicloud.model;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.web.apicloud.domain.dto.CodeResponse;
import com.web.apicloud.domain.dto.DetailRequest;
import com.web.apicloud.domain.entity.Docs;
import com.web.apicloud.domain.entity.Group;
import com.web.apicloud.domain.vo.ApiVO;
import com.web.apicloud.domain.vo.ControllerVO;
import com.web.apicloud.domain.vo.PropertyVO;
import com.web.apicloud.domain.vo.ResponseVO;
import com.web.apicloud.exception.NotFoundException;
import com.web.apicloud.model.parsing.ClassUpdateService;
import com.web.apicloud.model.parsing.ParsingService;
import com.web.apicloud.model.parsing.S3Service;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.*;

@Slf4j
@RequiredArgsConstructor
@Service
public class SynchronizeCodeServiceImpl implements SynchronizeCodeService {

    private static final String IMPORT = "import";
    private static final String REQUEST_MAPPING = "@RequestMapping";
    private static final String VALUE = "value";
    private static final String METHOD = "Mapping";
    private static final String RESPONSE_ENTITY = "ResponseEntity";
    private static final String REQUEST_PARAM = "RequestParam";
    private static final String PATH_VARIABLE = "PathVariable";
    private static final String REQUEST_BODY = "RequestBody";

    private static final String IMPORT_PATH_VARIABLE = "org.springframework.web.bind.annotation.PathVariable";
    private static final String IMPORT_REQUEST_PARAM = "org.springframework.web.bind.annotation.RequestParam";
    private static final String IMPORT_REQUEST_BODY = "org.springframework.web.bind.annotation.RequestBody";
    private static final String IMPORT_ANNOTATION = "org.springframework.web.bind.annotation.*";
    private static final String IMPORT_LIST = "java.util.List";
    private static final String IMPORT_UTIL = "java.util.*";

    private static final String NOT_FOUND_FILE = "해당 파일을 찾을 수 없습니다.";

    private final DocsService docsService;
    private final GroupService groupService;
    private final S3Service s3Service;
    private final ParsingService parsingService;
    private final ClassUpdateService classUpdateService;

    private static final ObjectMapper objectMapper = new ObjectMapper();
    public static List<CodeResponse> codeList = new ArrayList<>();
    public static List<Map<String, String>> importList = new ArrayList<>();

    private StringBuffer sb = new StringBuffer();

    private int count = 0;
    private boolean etcFlag = false;
    private static String groupSecretKey = "";


    @Override
    public List<CodeResponse> updateCode(Long docId, DetailRequest detailRequest) throws IOException {
        codeList = new ArrayList<>();
        count = 0;
        etcFlag = false;
        importList = new ArrayList<>();

        ControllerVO detailVO = objectMapper.readValue(detailRequest.getDetail(), ControllerVO.class);
        Docs doc = docsService.findByDocsId(docId);
        Group group = groupService.findById(doc.getGroup().getId());
        groupSecretKey = group.getGroupSecretKey();

        Map<String, List<String>> getFileCode = s3Service.getFile(detailVO.getName(), null, groupSecretKey);
        if (getFileCode == null) throw new NotFoundException(NOT_FOUND_FILE);
        List<String> lines = getFileCode.get("code");
        String key = StringUtils.removeStart(StringUtils.removeEnd(String.valueOf(getFileCode.get(IMPORT)), "]"), "[");
        System.out.println(lines);
        if (lines == null) throw new NotFoundException(NOT_FOUND_FILE);

        codeList.add(CodeResponse.builder().name(detailVO.getName()).importPackage(key).code(lines).build());
        importList.add(new HashMap<>());
        getUpdateCode(detailVO);
        getUpdateImport();
        return codeList;
    }

    private void getUpdateImport() {
        for (int i = 0; i < codeList.size(); i++) {
            if (codeList.get(i).getUpdateImport().size() == 0) continue;
            int j = 0;
            while (j < codeList.get(i).getCode().size()) {
                if (parsingService.KMP(codeList.get(i).getCode().get(j++), "package") != -1) break;
            }
            if (!codeList.get(i).getCode().get(j).equals("")) codeList.get(i).getCode().add(j, "");
            j++;
            codeList.get(i).getUpdateImport().add(0, "//[ApiCloud]를 통해 추가된 import 항목입니다.");
            codeList.get(i).getUpdateImport().add("");

            System.out.println(codeList.get(i).getUpdateImport());
            codeList.get(i).getCode().addAll(j, codeList.get(i).getUpdateImport());
        }
    }

    private void getUpdateCode(ControllerVO detailVO) throws IOException {
        int i = 0;
        while (i < codeList.get(0).getCode().size()) {
            if (parsingService.KMP(codeList.get(0).getCode().get(i), IMPORT) != -1) {
                String importStr = codeList.get(0).getCode().get(i).replace(IMPORT, "");
                importStr = importStr.replaceFirst(" ", "");
                importList.get(0).put(StringUtils.removeEnd(importStr, ";"), IMPORT);
            }
            if (parsingService.KMP(codeList.get(0).getCode().get(i), REQUEST_MAPPING) != -1) {
                int target = parsingService.KMP(codeList.get(0).getCode().get(i), VALUE);
                String value = null;
                if (target != -1) {
                    value = parsingService.getValue(codeList.get(0).getCode().get(i).substring(target + 1, codeList.get(0).getCode().get(i).length()));
                } else {
                    value = parsingService.getValue(codeList.get(0).getCode().get(i));
                }
                String commonUri = "";
                if (detailVO.getCommonUri() != null) commonUri = detailVO.getCommonUri();
                if (value == null) {
                    codeList.get(0).getCode().set(i, codeList.get(0).getCode().get(i) + "(value = \"" + commonUri + "\")");
                } else codeList.get(0).getCode().set(i, codeList.get(0).getCode().get(i).replace(value, commonUri));
                i++;
                break;
            }
            i++;
        }
        System.out.println(importList);

        int start = i;
        while (i < codeList.get(0).getCode().size()) {
            if (parsingService.KMP(codeList.get(0).getCode().get(i), METHOD) != -1) {
                apiParsing(detailVO, start, i - 1);
                start = i;
            }
            i++;
        }
    }

    private void apiParsing(ControllerVO detailVO, int start, int end) throws IOException {
        if (detailVO.getApis().size() <= count) return;
        if (!updateMethodAndUri(detailVO, start)) return;

        while (++start <= end) {
            if (parsingService.KMP(codeList.get(0).getCode().get(start), RESPONSE_ENTITY) != -1) {
                updateApi(detailVO, start, end);
                break;
            }
        }
        count++;
    }

    private void updateApi(ControllerVO detailVO, int start, int end) throws IOException {
        Stack<Character> stack = new Stack<>();
        boolean responseFlag = false;
        boolean requestFlag = false;
        boolean methodNameFlag = false;
        String response = "";
        String requestStr = "";
        Map<Integer, String> request = new HashMap<>();
        String methodName = "";
        int[] insertIndex = new int[2];
        ApiVO detailApiVO = detailVO.getApis().get(count);

        while (start <= end) {
            String line = codeList.get(0).getCode().get(start);
            for (int j = 0; j < line.length(); j++) {
                if (requestFlag) {
                    requestStr += line.charAt(j);
                    request.put(start, requestStr);
                }
                if (methodNameFlag) methodName += line.charAt(j);

                switch (line.charAt(j)) {
                    case '<':
                        stack.push('<');
                        if (!requestFlag) responseFlag = true;
                        break;
                    case '(':
                        stack.push('(');
                        if (methodNameFlag) {
                            methodNameFlag = false;
                            insertIndex = new int[]{start, j + 1};
                            methodName = methodName.replaceAll(" ", "");
                            codeList.get(0).getCode().set(start, codeList.get(0).getCode().get(start).replace(StringUtils.removeEnd(methodName, "("), detailApiVO.getName()));
                        }
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
                                ResponseVO responseBody = detailApiVO.getResponses().get("success");
                                if (responseBody == null || responseBody.getResponseBody() == null) {
                                    codeList.get(0).getCode().set(start, codeList.get(0).getCode().get(start).replace(response, ""));
                                } else {
                                    codeList.get(0).getCode().set(start, codeList.get(0).getCode().get(start).replace(response, responseBody.getResponseBody().getDtoName()));
                                }
                                // TODO : response CLass 바꾸러 가기,  import 추가
                                classUpdateService.updateObject(groupSecretKey, responseBody.getResponseBody(), 0);
                                methodNameFlag = true;
                            }
                        }
                        break;
                    case ')':
                        if (stack.peek() == '(') stack.pop();
                        if (stack.isEmpty()) {
                            System.out.println("request ==> ");
                            if (requestStr.equals("")) return;
                            requestStr = requestStr.substring(0, requestStr.length() - 1);
                            request.put(start, requestStr);
                            checkRequestDetail(request);

                            String api = makeApi(detailApiVO);
                            if (insertIndex[0] != start) {
                                codeList.get(0).getCode().set(insertIndex[0], codeList.get(0).getCode().get(insertIndex[0]) + api);
                                if (!etcFlag)
                                    codeList.get(0).getCode().set(insertIndex[0], StringUtils.removeEnd(codeList.get(0).getCode().get(insertIndex[0]), ", "));
                            } else {
                                for (int k = 0; k < codeList.get(0).getCode().get(start).length(); k++) {
                                    if (codeList.get(0).getCode().get(start).charAt(k) == '(') {
                                        sb.append(codeList.get(0).getCode().get(start));
                                        sb.insert(k + 1, api);
                                        codeList.get(0).getCode().set(start, String.valueOf(sb));
                                        sb.delete(0, sb.length());
                                        break;
                                    }
                                }
                            }
                            codeList.get(0).getCode().set(start, codeList.get(0).getCode().get(start).replace(", )", ")"));
                            codeList.get(0).getCode().set(start, codeList.get(0).getCode().get(start).replace(",)", ")"));
                            System.out.println(codeList.get(0).getCode().get(start));
                            return;
                        }
                        break;
                    case '}':
                        if (stack.peek() == '}') stack.pop();
                        break;
                    case ']':
                        if (stack.peek() == ']') stack.pop();
                        break;
                    case '@':
                        requestFlag = true;
                        requestStr += line.charAt(j);
                        request.put(start, requestStr);
                        break;
                    case ',':
                        if (stack.size() != 1) break;
                        checkRequestDetail(request);
                        requestStr = "";
                        request = new HashMap<>();
                        requestFlag = false;
                        break;
                    default:
                        if (responseFlag) response += line.charAt(j);
                }
            }
            start++;
        }
    }

    private void checkRequestDetail(Map<Integer, String> request) {
        Iterator<Map.Entry<Integer, String>> itr = request.entrySet().iterator();
        boolean flag = false;
        while (itr.hasNext()) {
            Map.Entry<Integer, String> entry = itr.next();
            if (parsingService.KMP(entry.getValue(), PATH_VARIABLE) != -1) {
                flag = true;
                break;
            }
            if (parsingService.KMP(entry.getValue(), REQUEST_PARAM) != -1) {
                flag = true;
                break;
            }
            if (parsingService.KMP(entry.getValue(), REQUEST_BODY) != -1) {
                flag = true;
                break;
            }
        }
        if (flag) {
            itr = request.entrySet().iterator();
            while (itr.hasNext()) {
                Map.Entry<Integer, String> entry = itr.next();
                codeList.get(0).getCode().set(entry.getKey(), codeList.get(0).getCode().get(entry.getKey()).replace(entry.getValue(), ""));
            }
        } else etcFlag = true;
    }

    private String makeApi(ApiVO detailApiVO) throws IOException {
        String api = "";

        if (detailApiVO.getParameters() != null) {
            if (detailApiVO.getParameters().size() != 0) {
                if (importList.get(0).get(IMPORT_ANNOTATION) == null && importList.get(0).get(IMPORT_PATH_VARIABLE) == null) {
                    importList.get(0).put(IMPORT_PATH_VARIABLE, IMPORT);
                    codeList.get(0).getUpdateImport().add(IMPORT + " " + IMPORT_PATH_VARIABLE + ";");
                }
            }
            for (int p = 0; p < detailApiVO.getParameters().size(); p++) {
                PropertyVO path = detailApiVO.getParameters().get(p);
                String pathStr = "";
                if (path.getType() != null && path.getName() != null) {
                    pathStr += "@" + PATH_VARIABLE + "(" + VALUE + " = \"" + path.getName() + "\", required = " + path.isRequired() + ") " + path.getType() + " " + path.getName() + ", ";
                }
                api += pathStr;
            }
        }
        if (detailApiVO.getQueries() != null) {
            if (detailApiVO.getQueries().size() != 0) {
                if (importList.get(0).get(IMPORT_ANNOTATION) == null && importList.get(0).get(IMPORT_REQUEST_PARAM) == null) {
                    importList.get(0).put(IMPORT_REQUEST_PARAM, IMPORT);
                    codeList.get(0).getUpdateImport().add(IMPORT + " " + IMPORT_REQUEST_PARAM + ";");
                }
            }
            for (int p = 0; p < detailApiVO.getQueries().size(); p++) {
                PropertyVO query = detailApiVO.getQueries().get(p);
                String queryStr = "";
                if (query.getName() == null) continue;
                queryStr += "@" + REQUEST_PARAM + "(" + VALUE + " = " + query.getName() + ", required = " + query.isRequired() + ") ";

                String type;
                if (query.getType().equals("Object")) {
                    // TODO: property 업데이트 하러 가기, import 추가
                    classUpdateService.updateObject(groupSecretKey, query, 0);
                    type = query.getDtoName();
                } else type = query.getType();
                if (query.getCollectionType() != null) {
                    if (importList.get(0).get(IMPORT_UTIL) == null && importList.get(0).get(IMPORT_LIST) == null) {
                        importList.get(0).put(IMPORT_LIST, IMPORT);
                        codeList.get(0).getUpdateImport().add(IMPORT + " " + IMPORT_LIST + ";");
                    }
                    queryStr += query.getCollectionType() + "<" + type + ">";
                } else queryStr += type;
                queryStr += " " + query.getName() + ", ";
                api += queryStr;
            }
        }
        if (detailApiVO.getRequestBody() != null && detailApiVO.getRequestBody().getName() != null) {
            if (importList.get(0).get(IMPORT_ANNOTATION) == null && importList.get(0).get(IMPORT_REQUEST_BODY) == null) {
                importList.get(0).put(IMPORT_REQUEST_BODY, IMPORT);
                codeList.get(0).getUpdateImport().add(IMPORT + " " + IMPORT_REQUEST_BODY + ";");
            }
            String requestStr = "";
            requestStr += "@" + REQUEST_BODY + "(required = " + detailApiVO.getRequestBody().isRequired() + ") ";
            if (detailApiVO.getRequestBody().getCollectionType() != null) {
                if (importList.get(0).get(IMPORT_UTIL) == null && importList.get(0).get(IMPORT_LIST) == null) {
                    importList.get(0).put(IMPORT_LIST, IMPORT);
                    codeList.get(0).getUpdateImport().add(IMPORT + " " + IMPORT_LIST + ";");
                }
                requestStr += detailApiVO.getRequestBody().getCollectionType() + "<" + detailApiVO.getRequestBody().getDtoName() + ">";
            } else requestStr += detailApiVO.getRequestBody().getDtoName();
            requestStr += " " + detailApiVO.getRequestBody().getName() + ", ";
            // TODO : 리퀘스트 바디 업데이트 하러가기
            classUpdateService.updateObject(groupSecretKey, detailApiVO.getRequestBody(), 0);
            api += requestStr;
        }
        return api;
    }

    private boolean updateMethodAndUri(ControllerVO detailVO, int start) {
        List<String> getMethod = parsingService.getMethod(codeList.get(0).getCode().get(start));
        if (getMethod == null) return false;
        if (getMethod.size() > 0) {
            codeList.get(0).getCode().set(start, codeList.get(0).getCode().get(start).replace(getMethod.get(0), detailVO.getApis().get(count).getMethod()));
        }
        if (getMethod.size() > 1) {
            if (detailVO.getApis().get(count).getUri() == null) {
                codeList.get(0).getCode().set(start, codeList.get(0).getCode().get(start).replace(getMethod.get(1), ""));
            } else {
                codeList.get(0).getCode().set(start, codeList.get(0).getCode().get(start).replace(getMethod.get(1), detailVO.getApis().get(count).getUri()));
            }
        } else {
            if (detailVO.getApis().get(count).getUri() != null) {
                String uri = "(\"" + detailVO.getApis().get(count).getUri() + "\")";
                codeList.get(0).getCode().set(start, codeList.get(0).getCode().get(start) + uri);
            }
        }
        return true;
    }
}

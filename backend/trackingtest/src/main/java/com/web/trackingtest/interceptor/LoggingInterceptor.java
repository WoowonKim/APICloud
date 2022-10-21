package com.web.trackingtest.interceptor;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.web.trackingtest.Message;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.apache.tomcat.util.json.JSONParser;
import org.json.simple.JSONObject;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;
import org.springframework.web.util.ContentCachingRequestWrapper;
import org.springframework.web.util.ContentCachingResponseWrapper;

import javax.servlet.ServletInputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Iterator;

@Log4j2
@RequiredArgsConstructor
@Component
public class LoggingInterceptor extends HandlerInterceptorAdapter {
    private static final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        if (request.getClass().getName().contains("SecurityContextHolderAwareRequestWrapper")) return;
        final ContentCachingRequestWrapper cachingRequest = (ContentCachingRequestWrapper) request;
        final ContentCachingResponseWrapper cachingResponse = (ContentCachingResponseWrapper) response;
        if (cachingRequest != null //&& cachingRequest.getContentType().contains("application/json")
        ) {

            StringBuffer json = new StringBuffer();
            String line = null;
//            StringBuilder json = new StringBuilder();
            InputStream reader = request.getInputStream();

//            try {
//                System.out.println(reader);
////                while ((line = reader.readLine()) != null) {
////                    json.append(line);
////                    System.out.println("여기");
////                }
//
//            } catch (Exception e) {
//                log.info("Error reading JSON string: " + e.toString());
//            }
//
//            JSONParser jsonParser = new JSONParser("");
//            JSONObject jsonObject = (JSONObject) jsonParser.parse(
//                    new InputStreamReader(reader, "UTF-8"));
//            System.out.println("==>" + json);
//            JSONObject jObj = new JSONObject();
//            ObjectMapper objectMapper = new ObjectMapper();
//            jObj.toString();
//            try {
//                CustomizeHeaderVO requestCustomHeader = objectMapper.readValue(jObj.get("header").toString(), CustomizeHeaderVO.class);   // JSONObject에 포함된 CustomerHeader를 추출
//            } catch (IOException e1) {
//                e1.printStackTrace();
//            }

            /* TEST 용 */
//            log.info("json header-------------" + requestCustomHeader);

            if (cachingRequest.getContentAsByteArray() != null && cachingRequest.getContentAsByteArray().length != 0) {
                log.info("Request Body : {}", objectMapper.readTree(cachingRequest.getContentAsByteArray()));
                String jsonStr = String.valueOf(objectMapper.readTree(cachingRequest.getContentAsByteArray()));         // jackson objectmapper 객체 생성
                ObjectMapper objectMapper = new ObjectMapper();         // JsonNode 생성 (readValue)
                JsonNode jsonNode = objectMapper.readTree(jsonStr);         // JsonNode -> Java Object
                Object obj = objectMapper.treeToValue(jsonNode, Object.class);   // JSONObject에 포함된 CustomerHeader를 추가
                Iterator<JsonNode> itr = jsonNode.iterator();
                while (itr.hasNext()) {
                    JsonNode temp = itr.next();
                    System.out.println(temp.asText());
                    System.out.println(temp.asText().getClass());
                }





                Message student = objectMapper.treeToValue(jsonNode, Message.class);         // Student 객체 출력
                System.out.println("Obj==>"+student);
//                Map<String, Object> companyMap = objectMapper.readValue(cachingRequest, new TypeReference<Map<String, Object>>() {});

                System.out.println(cachingRequest.getReader());
            }
        }
        if (cachingResponse != null //&& cachingResponse.getContentType().contains("application/json")
        ) {
            if (cachingResponse.getContentAsByteArray() != null && cachingResponse.getContentAsByteArray().length != 0) {
                log.info("Response Body : {}", objectMapper.readTree(cachingResponse.getContentAsByteArray()));
//                System.out.println(cachingResponse);
            }
        }
    }
}
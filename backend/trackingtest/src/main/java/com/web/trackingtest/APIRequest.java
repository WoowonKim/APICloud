package com.web.trackingtest;

import com.fasterxml.jackson.databind.JsonNode;

import java.util.Map;

public class APIRequest {

    private String docSecretKey;

    private String serverUrl;

    private String contextPath;

    private String httpMethod;

    private Map<String, String> httpHeader;

    private JsonNode requestBody;

    private JsonNode responseBody;
}

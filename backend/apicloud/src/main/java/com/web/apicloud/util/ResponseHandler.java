package com.web.apicloud.util;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.Map;

public class ResponseHandler {
    public static ResponseEntity<Object> generateResponse(String message, HttpStatus status) {
        Map<String, Object> map = new HashMap<>();
        map.put("msg", message);
        map.put("status", status.value());
        return new ResponseEntity<Object>(map, status);
    }

    public static ResponseEntity<Object> generateResponse(String message, HttpStatus status, String dataName, Object responseObj) {
        Map<String, Object> map = new HashMap<>();
        map.put("msg", message);
        map.put("status", status.value());
        map.put(dataName, responseObj);
        return new ResponseEntity<Object>(map, status);
    }

    public static ResponseEntity<Object> generateResponse(String message, HttpStatus status, String dataName, Object responseObj, String dataName2, Object responseObj2) {
        Map<String, Object> map = new HashMap<>();
        map.put("msg", message);
        map.put("status", status.value());
        map.put(dataName, responseObj);
        map.put(dataName2, responseObj2);
        return new ResponseEntity<Object>(map, status);
    }

    public static ResponseEntity<Object> generateResponse(String message, HttpStatus status, Map<String, Object> args) {
        Map<String, Object> map = new HashMap<>();
        map.put("msg", message);
        map.put("status", status.value());
        for (String key : args.keySet()) {
            map.put(key, args.get(key));
        }
        return new ResponseEntity<Object>(map, status);
    }
}

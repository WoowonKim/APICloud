package com.web.apicloud.model;

public interface FileSearchService {

    String getControllerPath(String root, String name);

    String getClassPath(String root, String name);
}
package com.web.apicloud.domain;

import lombok.Data;

import java.util.List;

@Data
public class SpringExportRequest {
    List<String> dependencies;
}

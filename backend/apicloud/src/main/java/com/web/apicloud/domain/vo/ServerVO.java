package com.web.apicloud.domain.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ServerVO {

    private String bootVersion;

    private String type;

    private String language;

    private String baseDir;

    private String groupId;

    private String artifactId;

    private String name;

    private String description;

    private String packageName;

    private String packaging;

    private String javaVersion;

    private List<String> dependencies;
}

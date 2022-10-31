package com.web.apicloud.util.code;

import io.spring.initializr.generator.project.ProjectDescription;

import java.nio.file.Path;

public class ProjectWithControllerGenerationResult {

    private final ProjectDescription description;

    private final Path rootDirectory;

    ProjectWithControllerGenerationResult(ProjectDescription description, Path rootDirectory) {
        this.description = description;
        this.rootDirectory = rootDirectory;
    }

    public ProjectDescription getProjectDescription() {
        return this.description;
    }

    public Path getRootDirectory() {
        return this.rootDirectory;
    }

}

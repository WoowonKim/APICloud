package com.example.test;

import io.spring.initializr.metadata.InitializrMetadataProvider;
import io.spring.initializr.web.controller.DefaultProjectGenerationController;
import io.spring.initializr.web.controller.ProjectGenerationController;
import io.spring.initializr.web.project.*;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class TestApplication {

    public static void main(String[] args) {
        SpringApplication.run(TestApplication.class, args);
    }

//    @Bean
//    ProjectGenerationController<ProjectRequest> projectGenerationController(
//            InitializrMetadataProvider metadataProvider,
//            ObjectProvider<ProjectRequestPlatformVersionTransformer> platformVersionTransformer,
//            ApplicationContext applicationContext) {
//        ProjectGenerationInvoker<ProjectRequest> projectGenerationInvoker = new ProjectGenerationInvoker<>(
//                applicationContext, new DefaultProjectRequestToDescriptionConverter(platformVersionTransformer
//                .getIfAvailable(DefaultProjectRequestPlatformVersionTransformer::new)));
//        return new DefaultProjectGenerationController(metadataProvider, projectGenerationInvoker);
//    }
}

package com.example.test.autoconfig;

import com.example.test.controller.TestProjectGenerationController;
import io.spring.initializr.generator.project.ProjectGenerationContext;
import io.spring.initializr.metadata.InitializrMetadataProvider;
import io.spring.initializr.metadata.InitializrProperties;
import io.spring.initializr.web.project.*;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableConfigurationProperties(InitializrProperties.class)
public class AutoConfiguration {
//    @Bean
//    @ConditionalOnMissingBean
//    TestProjectGenerationController projectGenerationController(
//            InitializrMetadataProvider metadataProvider,
//            ObjectProvider<ProjectRequestPlatformVersionTransformer> platformVersionTransformer,
//            ApplicationContext applicationContext) {
//        ProjectGenerationInvoker<ProjectRequest> projectGenerationInvoker = new ProjectGenerationInvoker<>(
//                applicationContext, new DefaultProjectRequestToDescriptionConverter(platformVersionTransformer
//                        .getIfAvailable(DefaultProjectRequestPlatformVersionTransformer::new)));
//        return new TestProjectGenerationController(metadataProvider, projectGenerationInvoker);
//    }

    @Bean
    @ConditionalOnMissingBean
    ProjectGenerationInvoker<ProjectRequest> projectGenerationInvoker(
            ObjectProvider<ProjectRequestPlatformVersionTransformer> platformVersionTransformer,
            ApplicationContext applicationContext) {
        ProjectGenerationContext pgc = new ProjectGenerationContext();
        return new ProjectGenerationInvoker<>(
                applicationContext, new DefaultProjectRequestToDescriptionConverter(platformVersionTransformer
                .getIfAvailable(DefaultProjectRequestPlatformVersionTransformer::new)));
    }
}

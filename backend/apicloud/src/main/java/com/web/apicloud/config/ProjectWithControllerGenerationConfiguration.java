package com.web.apicloud.config;

import com.web.apicloud.controller.ProjectWithControllerGenerationController;
import com.web.apicloud.domain.vo.DocVO;
import com.web.apicloud.util.code.ControllerContributor;
import com.web.apicloud.util.code.java.CustomJavaSourceCode;
import com.web.apicloud.util.code.java.CustomJavaSourceCodeWriter;
import com.web.apicloud.util.code.ProjectWithControllerGenerationInvoker;
import io.spring.initializr.generator.io.IndentingWriterFactory;
import io.spring.initializr.generator.project.ProjectGenerationConfiguration;
import io.spring.initializr.metadata.InitializrMetadataProvider;
import io.spring.initializr.web.project.DefaultProjectRequestPlatformVersionTransformer;
import io.spring.initializr.web.project.DefaultProjectRequestToDescriptionConverter;
import io.spring.initializr.web.project.ProjectRequest;
import io.spring.initializr.web.project.ProjectRequestPlatformVersionTransformer;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;

@ProjectGenerationConfiguration
@RequiredArgsConstructor
public class ProjectWithControllerGenerationConfiguration {

    private final IndentingWriterFactory indentingWriterFactory;

    @Bean
    ProjectWithControllerGenerationController projectWithControllerGenerationController (
            InitializrMetadataProvider metadataProvider,
            ObjectProvider<ProjectRequestPlatformVersionTransformer> platformVersionTransformer,
            ApplicationContext applicationContext) {
        ProjectWithControllerGenerationInvoker<ProjectRequest> projectGenerationInvoker = new ProjectWithControllerGenerationInvoker<>(
                applicationContext, new DefaultProjectRequestToDescriptionConverter(platformVersionTransformer
                .getIfAvailable(DefaultProjectRequestPlatformVersionTransformer::new)), indentingWriterFactory);
        return new ProjectWithControllerGenerationController(metadataProvider, projectGenerationInvoker);
    }

    @Bean
    ControllerContributor controllerContributor() {
        return new ControllerContributor(CustomJavaSourceCode::new, new CustomJavaSourceCodeWriter(this.indentingWriterFactory), new DocVO());
    }
}

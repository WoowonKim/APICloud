/*
 * Copyright 2012-2019 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.web.apicloud.config;

import com.web.apicloud.dummy.DummyInitializrMetadataBuilder;
import io.spring.initializr.generator.project.ProjectGenerationContext;
import io.spring.initializr.metadata.InitializrMetadata;
import io.spring.initializr.metadata.InitializrMetadataProvider;
import io.spring.initializr.metadata.InitializrProperties;
import io.spring.initializr.web.autoconfigure.InitializrAutoConfiguration;
import io.spring.initializr.web.controller.DefaultProjectGenerationController;
import io.spring.initializr.web.controller.ProjectGenerationController;
import io.spring.initializr.web.project.*;
import io.spring.initializr.web.support.DefaultInitializrMetadataProvider;
import io.spring.initializr.web.support.InitializrMetadataUpdateStrategy;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

// source: io.spring.initializr.web.autoconfigure.InitializrAutoConfiguration
//@AutoConfiguration(after = { JacksonAutoConfiguration.class, RestTemplateAutoConfiguration.class })
@Configuration
@EnableConfigurationProperties(InitializrProperties.class)
public class DummyInitializrAutoConfiguration extends InitializrAutoConfiguration {
    @Bean
    public InitializrMetadataProvider initializrMetadataProvider(InitializrProperties properties,
                                                                 ObjectProvider<InitializrMetadataUpdateStrategy> initializrMetadataUpdateStrategy) {

        InitializrMetadata metadata = DummyInitializrMetadataBuilder.withDefaults().build();
//        InitializrMetadata metadata = InitializrMetadataBuilder.fromInitializrProperties(properties).build();
        return new DefaultInitializrMetadataProvider(metadata,
                initializrMetadataUpdateStrategy.getIfAvailable(() -> (current) -> current));
    }

    @Bean
    @ConditionalOnMissingBean
    ProjectGenerationController<ProjectRequest> projectGenerationController(
            InitializrMetadataProvider metadataProvider,
            ObjectProvider<ProjectRequestPlatformVersionTransformer> platformVersionTransformer,
            ApplicationContext applicationContext) {
        ProjectGenerationInvoker<ProjectRequest> projectGenerationInvoker = new ProjectGenerationInvoker<>(
                applicationContext, new DefaultProjectRequestToDescriptionConverter(platformVersionTransformer
                .getIfAvailable(DefaultProjectRequestPlatformVersionTransformer::new)));
        return new DefaultProjectGenerationController(metadataProvider, projectGenerationInvoker);
    }

    @Bean
    ProjectGenerationInvoker<ProjectRequest> projectGenerationInvoker(
            ObjectProvider<ProjectRequestPlatformVersionTransformer> platformVersionTransformer,
            ApplicationContext applicationContext) {
        ProjectGenerationContext pgc = new ProjectGenerationContext();
        return new ProjectGenerationInvoker<>(
                applicationContext, new DefaultProjectRequestToDescriptionConverter(platformVersionTransformer
                .getIfAvailable(DefaultProjectRequestPlatformVersionTransformer::new)));
    }
}

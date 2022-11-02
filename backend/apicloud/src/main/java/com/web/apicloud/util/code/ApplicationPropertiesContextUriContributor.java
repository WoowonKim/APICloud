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
 *
 * source: io.spring.initializr.generator.spring.configuration.ApplicationPropertiesContributor
 */

package com.web.apicloud.util.code;

import io.spring.initializr.generator.project.contributor.ProjectContributor;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

public class ApplicationPropertiesContextUriContributor implements ProjectContributor {

    private final PathMatchingResourcePatternResolver resolver = new PathMatchingResourcePatternResolver();

    private final String relativePath;

    private final String contextUri;

    public ApplicationPropertiesContextUriContributor(String contextUri) {
        this("src/main/resources/application.properties", contextUri);
    }

    public ApplicationPropertiesContextUriContributor(String relativePath, String contextUri) {
        this.relativePath = relativePath;
        this.contextUri = contextUri;
    }

    @Override
    public void contribute(Path projectRoot) throws IOException {
        Path output = projectRoot.resolve(this.relativePath);
        if (!Files.exists(output)) {
            Files.createDirectories(output.getParent());
            Files.createFile(output);
        }
        if(contextUri != null) {
            BufferedWriter bw = new BufferedWriter(new FileWriter(output.toFile()));
            bw.write("server.servlet.context-path=" + contextUri);
            bw.close();
        }
    }
}

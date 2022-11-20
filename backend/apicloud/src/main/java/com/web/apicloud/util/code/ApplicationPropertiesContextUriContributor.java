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

import com.web.apicloud.domain.vo.ServerVO;
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

    private final ServerVO server;

    public ApplicationPropertiesContextUriContributor(ServerVO server) {
        this("src/main/resources/application.properties", server);
    }

    public ApplicationPropertiesContextUriContributor(String relativePath, ServerVO server) {
        this.relativePath = relativePath;
        this.server = server;
    }

    @Override
    public void contribute(Path projectRoot) throws IOException {
        Path output = projectRoot.resolve(this.relativePath);
        if (!Files.exists(output)) {
            Files.createDirectories(output.getParent());
            Files.createFile(output);
        }
        BufferedWriter bw = new BufferedWriter(new FileWriter(output.toFile()));
        String contextUri = server.getContextUri();
        if (contextUri != null) {
            bw.write("server.servlet.context-path=" + contextUri + "\n");
        }
        String serverUrl = server.getServerUrl();
        if (serverUrl.contains(":")) {
            int idx = serverUrl.lastIndexOf(":") + 1;
            if(idx < serverUrl.length()) {
                bw.write("server.port=" + serverUrl.substring(idx) + "\n");
            }
        }
        bw.close();
    }
}

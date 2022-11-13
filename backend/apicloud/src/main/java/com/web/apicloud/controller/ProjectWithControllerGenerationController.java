/*
 * Copyright 2012-2022 the original author or authors.
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
 * source: io.spring.initializr.web.controller.DefaultProjectGenerationController
 */
package com.web.apicloud.controller;

import com.web.apicloud.domain.SpringExportRequest;
import com.web.apicloud.domain.vo.DocVO;
import com.web.apicloud.domain.vo.ServerVO;
import com.web.apicloud.exception.NotFoundException;
import com.web.apicloud.util.FileUtils;
import com.web.apicloud.util.code.ProjectWithControllerGenerationInvoker;
import com.web.apicloud.util.code.ProjectWithControllerGenerationResult;
import io.spring.initializr.generator.buildsystem.BuildSystem;
import io.spring.initializr.generator.buildsystem.maven.MavenBuildSystem;
import io.spring.initializr.generator.project.ProjectDescription;
import io.spring.initializr.metadata.InitializrMetadata;
import io.spring.initializr.metadata.InitializrMetadataProvider;
import io.spring.initializr.web.project.InvalidProjectRequestException;
import io.spring.initializr.web.project.ProjectRequest;
import io.spring.initializr.web.project.WebProjectRequest;
import org.apache.commons.compress.archivers.ArchiveEntry;
import org.apache.commons.compress.archivers.ArchiveOutputStream;
import org.apache.commons.compress.archivers.zip.UnixStat;
import org.apache.commons.compress.archivers.zip.ZipArchiveEntry;
import org.apache.commons.compress.archivers.zip.ZipArchiveOutputStream;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Map;
import java.util.function.BiConsumer;
import java.util.function.BiFunction;
import java.util.function.Consumer;
import java.util.function.Function;

public class ProjectWithControllerGenerationController {

    private static final Log logger = LogFactory.getLog(io.spring.initializr.web.controller.ProjectGenerationController.class);

    private final InitializrMetadataProvider metadataProvider;
    private final ProjectWithControllerGenerationInvoker<ProjectRequest> projectGenerationInvoker;

    private static final String NOT_FOUND_SERVER = "API Doc의 서버 정보가 존재하지 않습니다.";

    public ProjectWithControllerGenerationController(InitializrMetadataProvider metadataProvider,
                                                     ProjectWithControllerGenerationInvoker<ProjectRequest> projectGenerationInvoker) {
        this.metadataProvider = metadataProvider;
        this.projectGenerationInvoker = projectGenerationInvoker;
    }

    @ModelAttribute
    ProjectRequest projectRequest(@RequestHeader Map<String, String> headers,
                                  @RequestParam(name = "style", required = false) String style) {
        if (style != null) {
            throw new InvalidProjectRequestException("Dependencies must be specified using 'dependencies'");
        }
        return projectRequest(headers);
    }

    /**
     * Create an initialized {@link ProjectRequest} instance to use to bind the parameters
     * of a project generation request.
     *
     * @param headers the headers of the request
     * @return a new {@link ProjectRequest} instance
     */
    public ProjectRequest projectRequest(@RequestHeader Map<String, String> headers) {
        WebProjectRequest request = new WebProjectRequest();
        request.getParameters().putAll(headers);
        request.initialize(getMetadata());
        return request;
    }

    protected InitializrMetadata getMetadata() {
        return this.metadataProvider.get();
    }

    @ExceptionHandler
    public void invalidProjectRequest(HttpServletResponse response, InvalidProjectRequestException ex)
            throws IOException {
        response.sendError(HttpStatus.BAD_REQUEST.value(), ex.getMessage());
    }

    public ResponseEntity<byte[]> springZip(DocVO doc, Map<String, String> header, SpringExportRequest springExportRequest) throws IOException {
        ProjectRequest request = projectRequest(header);
        doc.getServer().setDependencies(springExportRequest.getDependencies());
        updateProjectRequestByServerInfo(request, doc.getServer());
        ProjectWithControllerGenerationResult result = this.projectGenerationInvoker.invokeProjectStructureGeneration(request, doc);
        Path archive = createArchive(result, "zip", ZipArchiveOutputStream::new, ZipArchiveEntry::new,
                ZipArchiveEntry::setUnixMode);
        return upload(archive, result.getRootDirectory(), generateFileName(request, "zip"), "application/zip");
    }

    private void updateProjectRequestByServerInfo(ProjectRequest request, ServerVO server) {
        if (server == null) {
            throw new NotFoundException(NOT_FOUND_SERVER);
        }
        setIfNotEmpty(request::setType, server.getType());
        setIfNotEmpty(request::setLanguage, server.getLanguage());
        setIfNotEmpty(request::setBootVersion, server.getBootVersion());
        setIfNotEmpty(request::setBaseDir, server.getBaseDir());
        setIfNotEmpty(request::setGroupId, server.getGroupId());
        setIfNotEmpty(request::setArtifactId, server.getArtifactId());
        setIfNotEmpty(request::setName, server.getName());
        setIfNotEmpty(request::setDescription, server.getDescription());
        setIfNotEmpty(request::setPackageName, server.getPackageName());
        setIfNotEmpty(request::setPackaging, server.getPackaging());
        setIfNotEmpty(request::setJavaVersion, server.getJavaVersion());
        request.setDependencies(server.getDependencies());
    }

    private void setIfNotEmpty(Consumer<String> setter, String str) {
        if (str != null && !str.isEmpty()) {
            setter.accept(str);
        }
    }

    private <T extends ArchiveEntry> Path createArchive(ProjectWithControllerGenerationResult result, String fileExtension,
                                                        Function<OutputStream, ? extends ArchiveOutputStream> archiveOutputStream,
                                                        BiFunction<File, String, T> archiveEntry, BiConsumer<T, Integer> setMode) throws IOException {
        Path archive = this.projectGenerationInvoker.createDistributionFile(result.getRootDirectory(),
                "." + fileExtension);
        String wrapperScript = getWrapperScript(result.getProjectDescription());
        try (ArchiveOutputStream output = archiveOutputStream.apply(Files.newOutputStream(archive))) {
            Files.walk(result.getRootDirectory()).filter((path) -> !result.getRootDirectory().equals(path))
                    .forEach((path) -> {
                        try {
                            String entryName = getEntryName(result.getRootDirectory(), path);
                            T entry = archiveEntry.apply(path.toFile(), entryName);
                            setMode.accept(entry, getUnixMode(wrapperScript, entryName, path));
                            output.putArchiveEntry(entry);
                            if (!Files.isDirectory(path)) {
                                Files.copy(path, output);
                            }
                            output.closeArchiveEntry();
                        } catch (IOException ex) {
                            throw new IllegalStateException(ex);
                        }
                    });
        }
        return archive;
    }

    private String getEntryName(Path root, Path path) {
        String entryName = root.relativize(path).toString().replace('\\', '/');
        if (Files.isDirectory(path)) {
            entryName += "/";
        }
        return entryName;
    }

    private int getUnixMode(String wrapperScript, String entryName, Path path) {
        if (Files.isDirectory(path)) {
            return UnixStat.DIR_FLAG | UnixStat.DEFAULT_DIR_PERM;
        }
        return UnixStat.FILE_FLAG | (entryName.equals(wrapperScript) ? 0755 : UnixStat.DEFAULT_FILE_PERM);
    }

    private String generateFileName(ProjectRequest request, String extension) {
        String candidate = (StringUtils.hasText(request.getArtifactId()) ? request.getArtifactId()
                : this.metadataProvider.get().getArtifactId().getContent());
        String tmp = candidate.replaceAll(" ", "_");
        try {
            return URLEncoder.encode(tmp, "UTF-8") + "." + extension;
        } catch (UnsupportedEncodingException ex) {
            throw new IllegalStateException("Cannot encode URL", ex);
        }
    }

    private static String getWrapperScript(ProjectDescription description) {
        BuildSystem buildSystem = description.getBuildSystem();
        String script = buildSystem.id().equals(MavenBuildSystem.ID) ? "mvnw" : "gradlew";
        return (description.getBaseDirectory() != null) ? description.getBaseDirectory() + "/" + script : script;
    }

    private ResponseEntity<byte[]> upload(Path archive, Path dir, String fileName, String contentType)
            throws IOException {
        byte[] bytes = Files.readAllBytes(archive);
        logger.info(String.format("Uploading: %s (%s bytes)", archive, bytes.length));
        ResponseEntity<byte[]> result = FileUtils.createResponseEntity(bytes, contentType, fileName);
        this.projectGenerationInvoker.cleanTempFiles(dir);
        return result;
    }
}

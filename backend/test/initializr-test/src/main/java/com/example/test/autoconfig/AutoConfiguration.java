package com.example.test.autoconfig;

import com.example.test.controller.TestProjectGenerationController;
import io.spring.initializr.generator.buildsystem.gradle.GradleBuild;
import io.spring.initializr.generator.project.ProjectGenerationContext;
import io.spring.initializr.metadata.*;
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
import org.springframework.util.StringUtils;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.Arrays;

@Configuration
@EnableConfigurationProperties(InitializrProperties.class)
public class AutoConfiguration {
	@Bean
	public InitializrMetadataProvider initializrMetadataProvider(InitializrProperties properties,
																 ObjectProvider<InitializrMetadataUpdateStrategy> initializrMetadataUpdateStrategy) {

		InitializrMetadata metadata = InitializrMetadataTestBuilder.withDefaults().build();
//        InitializrMetadata metadata = InitializrMetadataBuilder.fromInitializrProperties(properties).build();
		return new DefaultInitializrMetadataProvider(metadata,
				initializrMetadataUpdateStrategy.getIfAvailable(() -> (current) -> current));
	}

	@Bean
	@ConditionalOnMissingBean(ProjectGenerationController.class)
	TestProjectGenerationController projectGenerationController(
			InitializrMetadataProvider metadataProvider,
			ObjectProvider<ProjectRequestPlatformVersionTransformer> platformVersionTransformer,
			ApplicationContext applicationContext) {
		ProjectGenerationInvoker<ProjectRequest> projectGenerationInvoker = new ProjectGenerationInvoker<>(
				applicationContext, new DefaultProjectRequestToDescriptionConverter(platformVersionTransformer
				.getIfAvailable(DefaultProjectRequestPlatformVersionTransformer::new)));
		return new TestProjectGenerationController(metadataProvider, projectGenerationInvoker);
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
class InitializrMetadataTestBuilder {

	private final InitializrMetadataBuilder builder = InitializrMetadataBuilder.create();

	public static InitializrMetadataTestBuilder withDefaults() {
		return new InitializrMetadataTestBuilder().addAllDefaults();
	}

	public static InitializrMetadataTestBuilder withBasicDefaults() {
		return new InitializrMetadataTestBuilder().addBasicDefaults();
	}

	public InitializrMetadata build() {
		return this.builder.build();
	}

	public InitializrMetadataTestBuilder addDependencyGroup(String name, String... ids) {
		this.builder.withCustomizer((it) -> {
			DependencyGroup group = new DependencyGroup();
			group.setName(name);
			for (String id : ids) {
				Dependency dependency = new Dependency();
				dependency.setId(id);
				group.getContent().add(dependency);
			}
			it.getDependencies().getContent().add(group);
		});
		return this;
	}

	public InitializrMetadataTestBuilder addDependencyGroup(String name, Dependency... dependencies) {
		this.builder.withCustomizer((it) -> {
			DependencyGroup group = new DependencyGroup();
			group.setName(name);
			group.getContent().addAll(Arrays.asList(dependencies));
			it.getDependencies().getContent().add(group);
		});
		return this;
	}

	public InitializrMetadataTestBuilder addAllDefaults() {
		return addBasicDefaults().setGradleEnv("1.0.6.RELEASE").setKotlinEnv("1.1.1");
	}

	public InitializrMetadataTestBuilder addBasicDefaults() {
		return addDefaultTypes().addDefaultPackagings().addDefaultJavaVersions().addDefaultLanguages()
				.addDefaultBootVersions();
	}

	public InitializrMetadataTestBuilder addDefaultTypes() {
		return addType("maven-build", false, "/pom.xml", "maven", "build")
				.addType("maven-project", true, "/starter.zip", "maven", "project")
				.addType("gradle-build", false, "/build.gradle", "gradle", "build")
				.addType("gradle-project", false, "/starter.zip", "gradle", "project");
	}

	public InitializrMetadataTestBuilder addType(String id, boolean defaultValue, String action, String build,
												 String format) {
		Type type = new Type();
		type.setId(id);
		type.setName(id);
		type.setDefault(defaultValue);
		type.setAction(action);
		if (StringUtils.hasText(build)) {
			type.getTags().put("build", build);
		}
		if (StringUtils.hasText(format)) {
			type.getTags().put("format", format);
		}
		return addType(type);
	}

	public InitializrMetadataTestBuilder addType(Type type) {
		this.builder.withCustomizer((it) -> it.getTypes().getContent().add(type));
		return this;
	}

	public InitializrMetadataTestBuilder addDefaultPackagings() {
		return addPackaging("jar", true).addPackaging("war", false);
	}

	public InitializrMetadataTestBuilder addPackaging(String id, boolean defaultValue) {
		this.builder.withCustomizer((it) -> {
			DefaultMetadataElement packaging = new DefaultMetadataElement();
			packaging.setId(id);
			packaging.setName(id);
			packaging.setDefault(defaultValue);
			it.getPackagings().addContent(packaging);
		});
		return this;
	}

	public InitializrMetadataTestBuilder addDefaultJavaVersions() {
		return addJavaVersion("1.6", false).addJavaVersion("1.7", false).addJavaVersion("1.8", true);
	}

	public InitializrMetadataTestBuilder addJavaVersion(String version, boolean defaultValue) {
		this.builder.withCustomizer((it) -> {
			DefaultMetadataElement element = new DefaultMetadataElement();
			element.setId(version);
			element.setName(version);
			element.setDefault(defaultValue);
			it.getJavaVersions().addContent(element);
		});
		return this;
	}

	public InitializrMetadataTestBuilder addDefaultLanguages() {
		return addLanguage("java", true).addLanguage("groovy", false).addLanguage("kotlin", false);
	}

	public InitializrMetadataTestBuilder addLanguage(String id, boolean defaultValue) {
		this.builder.withCustomizer((it) -> {
			DefaultMetadataElement element = new DefaultMetadataElement();
			element.setId(id);
			element.setName(id);
			element.setDefault(defaultValue);
			it.getLanguages().addContent(element);
		});
		return this;
	}

	public InitializrMetadataTestBuilder addDefaultBootVersions() {
		return addBootVersion("2.2.17.RELEASE", false).addBootVersion("2.3.3.RELEASE", false)
				.addBootVersion("2.4.1", true).addBootVersion("2.5.0-SNAPSHOT", false);
	}

	public InitializrMetadataTestBuilder addBootVersion(String id, boolean defaultValue) {
		this.builder.withCustomizer((it) -> {
			DefaultMetadataElement element = new DefaultMetadataElement();
			element.setId(id);
			element.setName(id);
			element.setDefault(defaultValue);
			it.getBootVersions().addContent(element);
		});
		return this;
	}

	public InitializrMetadataTestBuilder addBom(String id, String groupId, String artifactId, String version) {
		BillOfMaterials bom = BillOfMaterials.create(groupId, artifactId, version);
		return addBom(id, bom);
	}

	public InitializrMetadataTestBuilder addBom(String id, BillOfMaterials bom) {
		this.builder.withCustomizer((it) -> it.getConfiguration().getEnv().getBoms().put(id, bom));
		return this;
	}

	public InitializrMetadataTestBuilder setPlatformCompatibilityRange(String platformCompatibilityRange) {
		this.builder.withCustomizer(
				(it) -> it.getConfiguration().getEnv().getPlatform().setCompatibilityRange(platformCompatibilityRange));
		return this;
	}

	public InitializrMetadataTestBuilder setPlatformVersionFormatCompatibilityRange(String v1Range, String v2Range) {
		this.builder.withCustomizer((it) -> {
			InitializrConfiguration.Platform platform = it.getConfiguration().getEnv().getPlatform();
			platform.setV1FormatCompatibilityRange(v1Range);
			platform.setV2FormatCompatibilityRange(v2Range);
		});
		return this;
	}

	public InitializrMetadataTestBuilder setGradleEnv(String dependencyManagementPluginVersion) {
		this.builder.withCustomizer((it) -> it.getConfiguration().getEnv().getGradle()
				.setDependencyManagementPluginVersion(dependencyManagementPluginVersion));
		return this;
	}

	public InitializrMetadataTestBuilder setKotlinEnv(String defaultKotlinVersion, InitializrConfiguration.Env.Kotlin.Mapping... mappings) {
		this.builder.withCustomizer((it) -> {
			it.getConfiguration().getEnv().getKotlin().setDefaultVersion(defaultKotlinVersion);
			for (InitializrConfiguration.Env.Kotlin.Mapping mapping : mappings) {
				it.getConfiguration().getEnv().getKotlin().getMappings().add(mapping);
			}
		});
		return this;
	}

	public InitializrMetadataTestBuilder setMavenParent(String groupId, String artifactId, String version,
														String relativePath, boolean includeSpringBootBom) {
		this.builder.withCustomizer((it) -> {
			InitializrConfiguration.Env.Maven.ParentPom parent = it.getConfiguration().getEnv().getMaven().getParent();
			parent.setGroupId(groupId);
			parent.setArtifactId(artifactId);
			parent.setVersion(version);
			parent.setRelativePath(relativePath);
			parent.setIncludeSpringBootBom(includeSpringBootBom);
		});
		return this;
	}

	public InitializrMetadataTestBuilder addReleasesRepository(String id, String name, String url) {
		return addRepository(id, name, url, true, false);
	}

	public InitializrMetadataTestBuilder addSnapshotsRepository(String id, String name, String url) {
		return addRepository(id, name, url, false, true);
	}

	public InitializrMetadataTestBuilder addRepository(String id, String name, String url, boolean releasesEnabled,
													   boolean snapshotsEnabled) {
		this.builder.withCustomizer((it) -> {
			Repository repo = new Repository();
			repo.setName(name);
			try {
				repo.setUrl(new URL(url));
			}
			catch (MalformedURLException ex) {
				throw new IllegalArgumentException("Cannot create URL", ex);
			}
			repo.setReleasesEnabled(releasesEnabled);
			repo.setSnapshotsEnabled(snapshotsEnabled);
			it.getConfiguration().getEnv().getRepositories().put(id, repo);
		});
		return this;
	}

}

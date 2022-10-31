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
package com.example.test.autoconfig;

import com.example.test.customizer.ControllerTypeCustomizer;
import com.example.test.vo.ApiVO;
import io.spring.initializr.generator.language.Annotatable;
import io.spring.initializr.generator.language.Annotation;
import io.spring.initializr.generator.language.TypeDeclaration;
import io.spring.initializr.generator.language.java.JavaFieldDeclaration;
import io.spring.initializr.generator.language.java.JavaStatement;
import io.swagger.v3.oas.models.OpenAPI;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.lang.reflect.Modifier;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Configuration
public class JavaControllerGenerationContributorsConfiguration {
	private List<ApiVO> apis;
//    @Bean
//	MainApplicationTypeCustomizer<JavaTypeDeclaration> mainMethodContributor() {
//		return (typeDeclaration) -> {
//			typeDeclaration.modifiers(Modifier.PUBLIC);
//			typeDeclaration.addMethodDeclaration(
//					JavaMethodDeclaration.method("main").modifiers(Modifier.PUBLIC | Modifier.STATIC).returning("void")
//							.parameters(new Parameter("java.lang.String[]", "args"))
//							.body(new JavaExpressionStatement(
//									new JavaMethodInvocation("org.springframework.boot.SpringApplication", "run",
//											typeDeclaration.getName() + ".class", "args"))));
//		};
//	}

    @Bean
	ControllerTypeCustomizer<JavaTypeDeclaration> controllerMethodCustomizer() {
		return (typeDeclaration) -> {
			typeDeclaration.modifiers(Modifier.PUBLIC);
			apis.forEach(api -> {
				OpenAPI openAPI;
				// param
				AnnotatableParameter pathVariable = new AnnotatableParameter("PathVariable", "org.springframework.web.bind.annotation.PathVariable");

				pathVariable.annotate(Annotation.name("org.springframework.web.bind.annotation.PathVariable"));
				// query
				JavaMethodDeclaration jmd = JavaMethodDeclaration.method(api.getName())
						.modifiers(Modifier.PUBLIC)
						.parameters()
						.returning("void")
						.body();
				typeDeclaration.addMethodDeclaration(jmd);
			});
		};
	}

	public void setApis(List<ApiVO> apis) {
		this.apis = apis;
	}
}

class DummyMethodDescription {
	List<String> annotations;
	int modifier;
	String returnType;
	String methodName;
	List<Param> parameters;

	class Param {
		String type;
		String name;
		List<String> annotations;
	}
}

class JavaTypeDeclaration extends TypeDeclaration {

	private int modifiers;

	private final List<JavaFieldDeclaration> fieldDeclarations = new ArrayList<>();

	private final List<JavaMethodDeclaration> methodDeclarations = new ArrayList<>();

	JavaTypeDeclaration(String name) {
		super(name);
	}

	public void modifiers(int modifiers) {
		this.modifiers = modifiers;
	}

	public int getModifiers() {
		return this.modifiers;
	}

	public void addFieldDeclaration(JavaFieldDeclaration fieldDeclaration) {
		this.fieldDeclarations.add(fieldDeclaration);
	}

	public List<JavaFieldDeclaration> getFieldDeclarations() {
		return this.fieldDeclarations;
	}

	public void addMethodDeclaration(JavaMethodDeclaration methodDeclaration) {
		this.methodDeclarations.add(methodDeclaration);
	}

	public List<JavaMethodDeclaration> getMethodDeclarations() {
		return this.methodDeclarations;
	}

}

/**
 * Declaration of a method written in Java.
 *
 * @author Andy Wilkinson
 */
final class JavaMethodDeclaration implements Annotatable {

	private final List<Annotation> annotations = new ArrayList<>();

	private final String name;

	private final String returnType;

	private final int modifiers;

	private final List<AnnotatableParameter> annotatableParameters;

	private final List<JavaStatement> statements;

	private JavaMethodDeclaration(String name, String returnType, int modifiers, List<AnnotatableParameter> annotatableParameters,
								  List<JavaStatement> statements) {
		this.name = name;
		this.returnType = returnType;
		this.modifiers = modifiers;
		this.annotatableParameters = annotatableParameters;
		this.statements = statements;
	}

	public static Builder method(String name) {
		return new Builder(name);
	}

	String getName() {
		return this.name;
	}

	String getReturnType() {
		return this.returnType;
	}

	List<AnnotatableParameter> getParameters() {
		return this.annotatableParameters;
	}

	int getModifiers() {
		return this.modifiers;
	}

	public List<JavaStatement> getStatements() {
		return this.statements;
	}

	@Override
	public void annotate(Annotation annotation) {
		this.annotations.add(annotation);
	}

	@Override
	public List<Annotation> getAnnotations() {
		return Collections.unmodifiableList(this.annotations);
	}

	/**
	 * Builder for creating a {@link io.spring.initializr.generator.language.java.JavaMethodDeclaration}.
	 */
	public static final class Builder {

		private final String name;

		private List<AnnotatableParameter> parameters = new ArrayList<>();

		private String returnType = "void";

		private int modifiers;

		private Builder(String name) {
			this.name = name;
		}

		public Builder modifiers(int modifiers) {
			this.modifiers = modifiers;
			return this;
		}

		public Builder returning(String returnType) {
			this.returnType = returnType;
			return this;
		}

		public Builder parameters(AnnotatableParameter... parameters) {
			this.parameters = Arrays.asList(parameters);
			return this;
		}

		public JavaMethodDeclaration body(JavaStatement... statements) {
			return new JavaMethodDeclaration(this.name, this.returnType, this.modifiers, this.parameters,
					Arrays.asList(statements));
		}

	}

}

class AnnotatableParameter implements Annotatable {

	private final String type;

	private final String name;

	private final List<Annotation> annotations = new ArrayList<>();

	public AnnotatableParameter(String type, String name) {
		this.type = type;
		this.name = name;
	}

	public String getType() {
		return this.type;
	}

	public String getName() {
		return this.name;
	}

	@Override
	public void annotate(Annotation annotation) {
		this.annotations.add(annotation);
	}

	@Override
	public List<Annotation> getAnnotations() {
		return Collections.unmodifiableList(this.annotations);
	}
}

package com.example.test.autoconfig;

import com.example.test.ControllerDescription;
import com.example.test.ControllerSourceCodeContributor;
import io.spring.initializr.generator.io.IndentingWriterFactory;
import io.spring.initializr.generator.language.java.JavaCompilationUnit;
import io.spring.initializr.generator.language.java.JavaSourceCode;
import io.spring.initializr.generator.language.java.JavaSourceCodeWriter;
import io.spring.initializr.generator.language.java.JavaTypeDeclaration;
import io.spring.initializr.generator.project.ProjectGenerationConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;

@ProjectGenerationConfiguration
@Import(JavaControllerGenerationDefaultContributorConfiguration.class)
public class DummyJavaControllerConfiguration {
    private final ControllerDescription description;
    private final IndentingWriterFactory indentingWriterFactory;

    public DummyJavaControllerConfiguration(ControllerDescription description,
			IndentingWriterFactory indentingWriterFactory) {
		this.description = description;
		this.indentingWriterFactory = indentingWriterFactory;
	}

    @Bean
    public ControllerSourceCodeContributor<JavaTypeDeclaration, JavaCompilationUnit, JavaSourceCode> controllerSourceCodeContributor() {
        return new ControllerSourceCodeContributor<>(this.description, JavaSourceCode::new, new JavaSourceCodeWriter(this.indentingWriterFactory));
    }


}

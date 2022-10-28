package com.example.test;

import io.spring.initializr.generator.language.*;
import io.spring.initializr.generator.language.java.JavaLanguage;
import io.spring.initializr.generator.project.contributor.ProjectContributor;

import java.io.IOException;
import java.nio.file.Path;
import java.util.function.Supplier;

public class ControllerSourceCodeContributor<T extends TypeDeclaration, C extends CompilationUnit<T>, S extends SourceCode<T, C>> implements ProjectContributor {

    private final ControllerDescription description;

	private final Supplier<S> sourceFactory;

	private final SourceCodeWriter<S> sourceWriter;
    public ControllerSourceCodeContributor(ControllerDescription description, Supplier<S> sourceFactory, SourceCodeWriter<S> sourceWriter) {
        this.description = description;
        this.sourceFactory = sourceFactory;
        this.sourceWriter = sourceWriter;
    }

    @Override
    public void contribute(Path projectRoot) throws IOException {
        System.out.println("contributing!!!!!!!");
        S sourceCode = this.sourceFactory.get();
        for(String n : this.description.getNames()) {
            C compilationUnit = sourceCode.createCompilationUnit("package", n);
            T controllerType = compilationUnit.createTypeDeclaration(n);
        }
        this.sourceWriter.writeTo(new SourceStructure(projectRoot.resolve("src/main/"), new JavaLanguage()), sourceCode);
    }
}

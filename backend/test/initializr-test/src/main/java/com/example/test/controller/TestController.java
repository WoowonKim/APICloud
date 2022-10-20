package com.example.test.controller;

import io.spring.initializr.generator.io.IndentingWriterFactory;
import io.spring.initializr.generator.io.SimpleIndentStrategy;
import io.spring.initializr.generator.language.SourceStructure;
import io.spring.initializr.generator.language.java.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.nio.file.Paths;

@RestController
public class TestController {
    @GetMapping("/")
    public void codeCreationTest() throws IOException {
        JavaSourceCode sc = new JavaSourceCode();
        String applicationName = "App"; // 파일이름 및 클래스 이름
        JavaCompilationUnit cu = sc.createCompilationUnit("com.ssafy", applicationName);
        JavaTypeDeclaration mainApplicationType = cu.createTypeDeclaration(applicationName);
        mainApplicationType.modifiers(1); // 0: default, 1: public

        SourceStructure ss = new SourceStructure(Paths.get("sourceCreationTest"), new JavaLanguage());
        JavaSourceCodeWriter scw = new JavaSourceCodeWriter(IndentingWriterFactory.create(new SimpleIndentStrategy("\t")));
        scw.writeTo(ss, sc);
    }
}

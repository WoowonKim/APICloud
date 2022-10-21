package com.example.test.controller;

import com.example.test.dto.API;
import com.example.test.dto.ControllerCreationRequest;
import com.example.test.dto.ControllerDto;
import io.spring.initializr.generator.io.IndentingWriterFactory;
import io.spring.initializr.generator.io.SimpleIndentStrategy;
import io.spring.initializr.generator.language.Annotation;
import io.spring.initializr.generator.language.SourceStructure;
import io.spring.initializr.generator.language.java.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.file.Paths;
import java.util.List;

@CrossOrigin()
@RequiredArgsConstructor
@RestController
public class TestController {
    @GetMapping("/")
    public void codeCreationTest() throws IOException {
        JavaSourceCode sc = new JavaSourceCode();
        String applicationName = "App"; // 파일이름 및 클래스 이름
        JavaCompilationUnit cu = sc.createCompilationUnit("com.ssafy", applicationName);
        JavaTypeDeclaration mainApplicationType = cu.createTypeDeclaration(applicationName);
        mainApplicationType.modifiers(1); // 0: default, 1: public

        sc.createCompilationUnit("com.ssafy", "App2"); // 새로운 파일
        cu.createTypeDeclaration("test"); // 같은 파일 내에 다른 class

        SourceStructure ss = new SourceStructure(Paths.get("sourceCreationTest"), new JavaLanguage());
        JavaSourceCodeWriter scw = new JavaSourceCodeWriter(IndentingWriterFactory.create(new SimpleIndentStrategy("\t")));
        scw.writeTo(ss, sc);
    }

    @PostMapping("/controller")
    public void createController(@RequestBody ControllerCreationRequest creationRequest) throws IOException {
        String basePackage = "com.ssafy";
        JavaSourceCode sc = new JavaSourceCode();
        // 컨트롤러 각각에 대해서 CompliationUnit 생성
        creationRequest.getControllerDtoList().forEach(controllerDto -> {
            String applicationName = Character.toUpperCase(controllerDto.getRequestMapping().charAt(1))
                    + controllerDto.getRequestMapping().substring(2) + "Controller";
            JavaCompilationUnit cu = sc.createCompilationUnit(basePackage + ".controller", applicationName);
            JavaTypeDeclaration controllerClass = cu.createTypeDeclaration(applicationName);
            controllerClass.modifiers(1); // 0: default, 1: public
            controllerClass.annotate(Annotation.name("org.springframework.web.bind.annotation.RestController"));
            if(controllerDto.isRequiredArgsFlag()) {
                controllerClass.annotate(Annotation.name("lombok.RequiredArgsConstructor"));
            }
            if(controllerDto.getRequestMapping() != null) {
                controllerClass.annotate(Annotation.name("org.springframework.web.bind.annotation.RequestMapping",
                        builder -> {
                            builder.attribute("value", String.class, controllerDto.getRequestMapping());
                        }));
            }
            if(controllerDto.getCrossOrigin() != null) {
                controllerClass.annotate(Annotation.name("org.springframework.web.bind.annotation.CrossOrigin",
                        builder -> {
                            builder.attribute("value", String.class, controllerDto.getCrossOrigin());
                        }));
            }
            controllerDto.getApiList().forEach(api -> {
                JavaMethodDeclaration jmd = JavaMethodDeclaration.method(api.getMethod().toLowerCase() + api.getUri().substring(1, getLastSlash(api.getUri())))
                        .modifiers(1)
                        .body(new JavaReturnStatement(new JavaMethodInvocation("org.springframework.http.ResponseEntity", "ok", "")));
                jmd.annotate(Annotation.name("org.springframework.web.bind.annotation." + Character.toUpperCase(api.getMethod().charAt(0))
                        + api.getMethod().substring(1).toLowerCase() + "Mapping", builder -> {
                    builder.attribute("value", String.class, api.getUri());
                }));
                controllerClass.addMethodDeclaration(jmd);
            });
        });
        SourceStructure ss = new SourceStructure(Paths.get("sourceCreationTest/src/main"), new JavaLanguage());
        JavaSourceCodeWriter scw = new JavaSourceCodeWriter(IndentingWriterFactory.create(new SimpleIndentStrategy("\t")));
        try {
            scw.writeTo(ss, sc);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private int getLastSlash(String uri) {
        int idx = uri.indexOf('/', 1);
        return idx == -1 ? uri.length() : idx;
    }
}

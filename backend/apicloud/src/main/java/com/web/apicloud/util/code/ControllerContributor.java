package com.web.apicloud.util.code;

import com.web.apicloud.domain.vo.ApiVO;
import com.web.apicloud.domain.vo.ControllerVO;
import com.web.apicloud.domain.vo.DocVO;
import com.web.apicloud.domain.vo.PropertyVO;
import com.web.apicloud.util.code.java.*;
import io.spring.initializr.generator.language.Annotation;
import io.spring.initializr.generator.language.SourceCodeWriter;
import io.spring.initializr.generator.language.SourceStructure;
import io.spring.initializr.generator.language.java.JavaLanguage;
import io.spring.initializr.generator.language.java.JavaMethodInvocation;
import io.spring.initializr.generator.language.java.JavaReturnStatement;
import io.spring.initializr.generator.project.contributor.ProjectContributor;
import lombok.RequiredArgsConstructor;

import java.io.IOException;
import java.lang.reflect.Modifier;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.function.Consumer;
import java.util.function.Supplier;
import java.util.stream.Collectors;

@RequiredArgsConstructor
public class ControllerContributor implements ProjectContributor {
    private final Supplier<CustomJavaSourceCode> sourceFactory;

    private final SourceCodeWriter<CustomJavaSourceCode> sourceWriter;

    private final DocVO doc;

    @Override
    public void contribute(Path projectRoot) throws IOException {
        CustomJavaSourceCode sourceCode = this.sourceFactory.get();
        List<ControllerVO> controllers = doc.getControllers();
        if (controllers != null) {
            controllers.forEach(controllerConsumer(sourceCode));
        }

        this.sourceWriter.writeTo(new SourceStructure(projectRoot.resolve("src/main/"), new JavaLanguage()), sourceCode);
    }

    private Consumer<ControllerVO> controllerConsumer(CustomJavaSourceCode sourceCode) {
        return (controller) -> {
            CustomJavaCompilationUnit compilationUnit = sourceCode.createCompilationUnit(doc.getServer().getPackageName() + ".controller", controller.getName());
            CustomJavaTypeDeclaration controllerType = compilationUnit.createTypeDeclaration(controller.getName());
            controllerType.modifiers(Modifier.PUBLIC);
            controllerType.annotate(Annotation.name("org.springframework.web.bind.annotation.RestController"));
            controllerType.annotate(Annotation.name("org.springframework.web.bind.annotation.RequestMapping", builder -> builder.attribute("value", String.class, controller.getCommonUri())));
            List<ApiVO> apis = controller.getApis();
            if (apis != null) {
                apis.forEach(apiConsumer(sourceCode, controllerType));
            }
        };
    }

    private Consumer<ApiVO> apiConsumer(CustomJavaSourceCode sourceCode, CustomJavaTypeDeclaration controllerType) {
        return api -> {
//            addDto(sourceCode, api.getAvailableDTO(), controllerType.getName());
            CustomJavaMethodDeclaration.Builder builder = CustomJavaMethodDeclaration
                    .method(api.getName())
                    .modifiers(Modifier.PUBLIC)
                    .returning("ResponseEntity<" + api.getReturning() + ">");
            addApiParameters(builder, api);
            CustomJavaMethodDeclaration jmd = builder.body(new JavaReturnStatement(
                    new JavaClassCreation("org.framework.http.RequestEntity", api.getReturning(),
                            List.of(new JavaClassCreation(api.getReturning(), null, List.of()),
                                    new JavaEnum("org.framework.http.HttpStatus", "OK")))
            ));

            String methodMappingName = "org.springframework.web.bind.annotation."
                    + Character.toUpperCase(api.getMethod().charAt(0)) + api.getMethod().substring(1) + "Mapping";
            jmd.annotate(Annotation.name(methodMappingName, b ->
                    b.attribute("value", String.class, api.getUri())));
            controllerType.addMethodDeclaration(jmd);
        };
    }

    private void addApiParameters(CustomJavaMethodDeclaration.Builder builder, ApiVO api) {
        List<AnnotatableParameter> parameters = new ArrayList<>();
        // path에서 파라미터 추가
        makeParameters(api.getParameters()).ifPresent(parameters::addAll);

        // query에서 파라미터 추가
//        makeParameter(api.getQuery(), null).ifPresent(parameters::add);

        // requestBody에서 파라미터 추가
        makeParameter(api.getRequestBody(), "org.springframework.web.bind.annotation.RequestBody").ifPresent(parameters::add);
        builder.parameters(parameters.toArray(AnnotatableParameter[]::new));
    }

    private Optional<List<AnnotatableParameter>> makeParameters(List<PropertyVO> properties) {
        if (properties == null) {
            return Optional.empty();
        }
        return Optional.of(properties.stream()
                .map(p -> makeParameter(p, "org.springframework.web.bind.annotation.PathVariable").orElse(null))
                .filter(Objects::nonNull)
                .collect(Collectors.toList())
        );
    }

    private Optional<AnnotatableParameter> makeParameter(PropertyVO property, String annotationName) {
        if (property == null) {
            return Optional.empty();
        }
        AnnotatableParameter parameter = new AnnotatableParameter(property.getTypeForCode(), property.getName());
        if (annotationName != null) {
            parameter.annotate(Annotation.name(annotationName, builder -> {
                builder.attribute("value", String.class, property.getName());
                if (!property.isRequired()) {
                    builder.attribute("required", Boolean.class, "false");
                }
            }));
        }
        return Optional.of(parameter);
    }

    private void addDto(CustomJavaSourceCode sourceCode, List<PropertyVO> dtos, String controllerName) {
        for (PropertyVO dto : dtos) {
            CustomJavaTypeDeclaration dtoType = sourceCode.createCompilationUnit(doc.getServer().getPackageName() + ".dto." + controllerName.toLowerCase(), dto.getDtoName()).createTypeDeclaration(dto.getDtoName());
            dtoType.modifiers(Modifier.PUBLIC);
            if (dto.getProperties() != null) {
                for (PropertyVO property : dto.getProperties()) {
                    dtoType.addFieldDeclaration(CustomJavaFieldDeclaration.field(property.getName()).modifiers(Modifier.PRIVATE)
                            .returning(property.getTypeForCode()));
                }
            }
        }
    }
}

package com.web.apicloud.util.code;

import com.web.apicloud.domain.vo.ApiVO;
import com.web.apicloud.domain.vo.ControllerVO;
import com.web.apicloud.domain.vo.DocVO;
import com.web.apicloud.domain.vo.PropertyVO;
import com.web.apicloud.util.TextUtils;
import com.web.apicloud.util.code.java.*;
import io.spring.initializr.generator.language.Annotation;
import io.spring.initializr.generator.language.SourceCodeWriter;
import io.spring.initializr.generator.language.SourceStructure;
import io.spring.initializr.generator.language.java.JavaExpressionStatement;
import io.spring.initializr.generator.language.java.JavaLanguage;
import io.spring.initializr.generator.language.java.JavaMethodInvocation;
import io.spring.initializr.generator.language.java.JavaReturnStatement;
import io.spring.initializr.generator.project.contributor.ProjectContributor;
import lombok.RequiredArgsConstructor;
import org.springframework.util.StringUtils;

import java.io.IOException;
import java.lang.reflect.Modifier;
import java.nio.file.Path;
import java.util.*;
import java.util.function.Consumer;
import java.util.function.Supplier;
import java.util.stream.Collectors;

@RequiredArgsConstructor
public class ControllerContributor implements ProjectContributor {
    private static final String PATH_VARIABLE = "org.springframework.web.bind.annotation.PathVariable";
    private static final String REQUEST_BODY = "org.springframework.web.bind.annotation.RequestBody";

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
        addWebMvcConfig(sourceCode);
        this.sourceWriter.writeTo(new SourceStructure(projectRoot.resolve("src/main/"), new JavaLanguage()), sourceCode);
    }

    private void addWebMvcConfig(CustomJavaSourceCode sourceCode) {
        CustomJavaCompilationUnit compilationUnit = sourceCode.createCompilationUnit(doc.getServer().getPackageName() + ".config", "ApiCloudWebMvcConfig");
        CustomJavaTypeDeclaration configType = compilationUnit.createTypeDeclaration("ApiCloudWebMvcConfig");
        configType.modifiers(Modifier.PUBLIC);
        configType.implementedType("org.springframework.web.servlet.config.annotation.WebMvcConfigurer");
        configType.annotate(Annotation.name("org.springframework.context.annotation.Configuration"));
        configType.addFieldDeclaration(CustomJavaFieldDeclaration
                .field("MAX_AGE_SECS")
                .modifiers(Modifier.PRIVATE | Modifier.FINAL)
                .value(3600)
                .returning(JavaType.builder().type("long").build()));
        configType.addMethodDeclaration(CustomJavaMethodDeclaration
                .method("addCorsMappings")
                .modifiers(Modifier.PUBLIC)
                .parameters(AnnotatableParameter.builder().type(JavaType.builder().type("org.springframework.web.servlet.config.annotation.CorsRegistry").build()).name("registry").build())
                .body(JavaChainingMethodInvocation.builder().target("registry").method(".addMapping(\"/**\")\n" +
                        "                .allowedOrigins(\"http://localhost:3000\",\"https://apiclouds.net\")\n" +
                        "                .allowCredentials(true)\n" +
                        "                .allowedHeaders(\"*\")\n" +
                        "                .allowedMethods(\"GET\", \"POST\", \"PUT\", \"PATCH\", \"DELETE\", \"OPTIONS\")\n" +
                        "                .maxAge(MAX_AGE_SECS)").build()));
    }

    private Consumer<ControllerVO> controllerConsumer(CustomJavaSourceCode sourceCode) {
        return (controller) -> {
            String controllerName = TextUtils.getValidName(controller.getName());
            CustomJavaCompilationUnit compilationUnit = sourceCode.createCompilationUnit(doc.getServer().getPackageName() + ".controller", controllerName);
            CustomJavaTypeDeclaration controllerType = compilationUnit.createTypeDeclaration(controllerName);
            controllerType.modifiers(Modifier.PUBLIC);
            controllerType.annotate(Annotation.name("org.springframework.web.bind.annotation.RestController"));
            controllerType.annotate(Annotation.name("org.springframework.web.bind.annotation.RequestMapping", builder -> builder.attribute("value", String.class, controller.getCommonUri())));
            List<ApiVO> apis = controller.getApis();
            Map<String, PropertyVO> dtos = new HashMap<>();
            if (apis != null) {
                apis.forEach(apiConsumer(controllerType, dtos));
            }
            addDto(sourceCode, dtos, controllerName);
        };
    }

    private Consumer<ApiVO> apiConsumer(CustomJavaTypeDeclaration controllerType, Map<String, PropertyVO> dtos) {
        String controllerName = TextUtils.getValidName(controllerType.getName());
        String dtoPackageName = makeDtoPackageName(controllerName);
        return api -> {
            api.getAvailableDto(dtos);
            CustomJavaMethodDeclaration.Builder builder = CustomJavaMethodDeclaration
                    .method(TextUtils.getValidName(api.getName()))
                    .modifiers(Modifier.PUBLIC)
                    .returning(JavaType.builder().type("ResponseEntity").genericType(api.getReturnJavaType(false, dtoPackageName)).build());
            addApiParameters(builder, api, controllerName);

            List<JavaArgument> arguments = new ArrayList<>();
            JavaType javaType = api.getReturnJavaType(true, dtoPackageName);
            if (!"Void".equals(javaType.getType())) {
                arguments.add(new JavaClassCreation(api.getReturnJavaType(true, dtoPackageName), List.of()));
            }
            arguments.add(new JavaEnum("org.springframework.http.HttpStatus", "OK"));
            CustomJavaMethodDeclaration jmd = builder.body(new JavaReturnStatement(
                    new JavaClassCreation(JavaType.builder()
                            .type("org.springframework.http.ResponseEntity")
                            .genericType(
                                    api.getReturnJavaType(false, dtoPackageName)
                            ).build(), arguments)
            ));

            String methodMappingName = "org.springframework.web.bind.annotation."
                    + Character.toUpperCase(api.getMethod().charAt(0)) + api.getMethod().substring(1) + "Mapping";
            jmd.annotate(Annotation.name(methodMappingName, b ->
                    b.attribute("value", String.class, api.getUri())));
            controllerType.addMethodDeclaration(jmd);
        };
    }

    private void addApiParameters(CustomJavaMethodDeclaration.Builder builder, ApiVO api, String controllerName) {
        List<AnnotatableParameter> parameters = new ArrayList<>();
        // path에서 파라미터 추가
        makePathVariableParameters(api.getParameters(), controllerName).ifPresent(parameters::addAll);

        // query에서 파라미터 추가
        makeQueryParameters(api.getQueries(), controllerName).ifPresent(parameters::addAll);

        // requestBody에서 파라미터 추가
        makeParameter(api.getRequestBody(), REQUEST_BODY, controllerName).ifPresent(parameters::add);
        builder.parameters(parameters.toArray(AnnotatableParameter[]::new));
    }

    private Optional<List<AnnotatableParameter>> makeQueryParameters(List<PropertyVO> queries, String controllerName) {
        if (queries == null) {
            return Optional.empty();
        }
        return Optional.of(queries.stream()
                .filter(q -> q.getType() != null)
                .map(q -> {
                            if ("Object".equals(q.getType())) {
                                return makeParameter(q, "org.springframework.web.bind.annotation.ModelAttribute", controllerName).orElse(null);
                            } else {
                                return makeParameter(q, "org.springframework.web.bind.annotation.RequestParam", controllerName).orElse(null);
                            }
                        }
                )
                .filter(Objects::nonNull)
                .collect(Collectors.toList())
        );
    }

    private Optional<List<AnnotatableParameter>> makePathVariableParameters(List<PropertyVO> properties, String controllerName) {
        if (properties == null) {
            return Optional.empty();
        }
        return Optional.of(properties.stream()
                .map(p -> makeParameter(p, ControllerContributor.PATH_VARIABLE, controllerName).orElse(null)
                )
                .filter(Objects::nonNull)
                .collect(Collectors.toList())
        );
    }

    private Optional<AnnotatableParameter> makeParameter(PropertyVO property, String annotationName, String controllerName) {
        if (property == null || !StringUtils.hasText(property.getName()) || !property.hasType()) {
            return Optional.empty();
        }
        String name = TextUtils.getValidName(property.getName());
        AnnotatableParameter parameter = new AnnotatableParameter(property.getJavaType(makeDtoPackageName(controllerName), false), name);
        if (annotationName != null) {
            parameter.annotate(Annotation.name(annotationName, builder -> {
                if (PATH_VARIABLE.equals(annotationName)) {
                    builder.attribute("value", String.class, name);
                }
                if (!property.isRequired()) {
                    builder.attribute("required", Boolean.class, "false");
                }
            }));
        }
        return Optional.of(parameter);
    }

    private void addDto(CustomJavaSourceCode sourceCode, Map<String, PropertyVO> dtos, String controllerName) {
        for (String dtoKey : dtos.keySet()) {
            PropertyVO dto = dtos.get(dtoKey);
            if (dto == null || !StringUtils.hasText(dto.getDtoName())) {
                continue;
            }
            String dtoName = TextUtils.getValidName(dto.getDtoName());
            CustomJavaTypeDeclaration dtoType = sourceCode.createCompilationUnit(makeDtoPackageName(controllerName), dtoName).createTypeDeclaration(dtoName);
            dtoType.modifiers(Modifier.PUBLIC);
            if (dto.getProperties() != null) {
                for (PropertyVO property : dto.getProperties()) {
                    dtoType.addFieldDeclaration(CustomJavaFieldDeclaration.field(TextUtils.getValidName(property.getName()))
                            .modifiers(Modifier.PRIVATE)
                            .returning(property.getJavaType(makeDtoPackageName(controllerName), false)));
                    dtoType.addMethodDeclaration(makeGetter(property));
                    dtoType.addMethodDeclaration(makeSetter(property));
                }
            }
        }
    }

    private String makeDtoPackageName(String controllerName) {
        if (controllerName == null) {
            return null;
        }
        return doc.getServer().getPackageName() + ".dto." + controllerName.toLowerCase();
    }

    private CustomJavaMethodDeclaration makeSetter(PropertyVO property) {
        String name = TextUtils.getValidName(property.getName());
        return CustomJavaMethodDeclaration
                .method("set" + camelToPascal(name))
                .modifiers(Modifier.PUBLIC)
                .parameters(makeParameter(property, null, null).orElse(null))
                .body(new JavaExpressionStatement(new PlainJavaCode("this." + name + " = " + name, null)));
    }

    private CustomJavaMethodDeclaration makeGetter(PropertyVO property) {
        String name = TextUtils.getValidName(property.getName());
        return CustomJavaMethodDeclaration
                .method("get" + camelToPascal(name))
                .modifiers(Modifier.PUBLIC)
                .returning(property.getJavaType(null, false))
                .body(new JavaExpressionStatement(new PlainJavaCode("return this." + name, null)));
    }

    private String camelToPascal(String name) {
        return Character.toUpperCase(name.charAt(0)) + name.substring(1);
    }
}

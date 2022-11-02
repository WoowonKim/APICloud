package com.web.apicloud.util.code;

import com.web.apicloud.domain.vo.ApiVO;
import com.web.apicloud.domain.vo.ControllerVO;
import com.web.apicloud.domain.vo.DocVO;
import com.web.apicloud.domain.vo.PropertyVO;
import io.spring.initializr.generator.language.Annotation;
import io.spring.initializr.generator.language.Parameter;
import io.spring.initializr.generator.language.SourceCodeWriter;
import io.spring.initializr.generator.language.SourceStructure;
import io.spring.initializr.generator.language.java.*;
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
    private final Supplier<JavaSourceCode> sourceFactory;

    private final SourceCodeWriter<JavaSourceCode> sourceWriter;

    private final DocVO doc;

    @Override
    public void contribute(Path projectRoot) throws IOException {
        JavaSourceCode sourceCode = this.sourceFactory.get();
        List<ControllerVO> controllers = doc.getControllers();
        System.out.println(controllers);
        if (controllers != null) {
            controllers.forEach(controllerConsumer(sourceCode));
        }

        this.sourceWriter.writeTo(new SourceStructure(projectRoot.resolve("src/main/"), new JavaLanguage()), sourceCode);
    }

    private Consumer<ControllerVO> controllerConsumer(JavaSourceCode sourceCode) {
        return (controller) -> {
            System.out.println("controllerConsumer() " + controller.getName());
            JavaCompilationUnit compilationUnit = sourceCode.createCompilationUnit(doc.getServer().getPackageName() + ".controller", controller.getName());
            JavaTypeDeclaration controllerType = compilationUnit.createTypeDeclaration(controller.getName());
            controllerType.modifiers(Modifier.PUBLIC);
            controllerType.annotate(Annotation.name("org.springframework.web.bind.annotation.RestController"));
            controllerType.annotate(Annotation.name("org.springframework.web.bind.annotation.RequestMapping", builder -> builder.attribute("value", String.class, controller.getCommonUri())));
            List<ApiVO> apis = controller.getApis();
            if (apis != null) {
                apis.forEach(apiConsumer(sourceCode, controllerType));
            }
        };
    }

    private Consumer<ApiVO> apiConsumer(JavaSourceCode sourceCode, JavaTypeDeclaration controllerType) {
        return api -> {
            System.out.println("apiConsumer(): " + api.getName());
            addDto(sourceCode, api.getAvailableDTO(), controllerType.getName());
            JavaMethodDeclaration.Builder builder = JavaMethodDeclaration
                    .method(api.getName())
                    .modifiers(Modifier.PUBLIC)
                    .returning("ResponseEntity<"+ api.getReturning() + ">");
            addApiParameters(builder, api);

            JavaMethodDeclaration jmd = builder.body(new JavaReturnStatement(new JavaMethodInvocation("new ResponseEntity<"+ api.getReturning() + ">",
                    "", "null")));

            String methodMappingName = "org.springframework.web.bind.annotation."
                    + Character.toUpperCase(api.getMethod().charAt(0)) + api.getMethod().substring(1) + "Mapping";
            jmd.annotate(Annotation.name(methodMappingName, b ->
                    b.attribute("value", String.class, api.getUri())));
            controllerType.addMethodDeclaration(jmd);
        };
    }

    private void addApiParameters(JavaMethodDeclaration.Builder builder, ApiVO api) {
        List<Parameter> parameters = new ArrayList<>();
        // path에서 파라미터 추가
        makeParameters(api.getParameters()).ifPresent(parameters::addAll);

        // query에서 파라미터 추가
        makeParameter(api.getQuery(), "").ifPresent(parameters::add);

        // requestBody에서 파라미터 추가
        makeParameter(api.getRequestBody(), "@RequestBody").ifPresent(parameters::add);

        builder.parameters(parameters.toArray(Parameter[]::new));
    }

    // TODO: Annotatable한 parameter type 생성하기
    private String makeAnnotation(String s, PropertyVO property) {
        s += "(value = \"" + property.getName() + "\"";
        if(!property.isRequired()) {
            s += ", required = false";
        }
        s += ")";
        return s;
    }

    private Optional<List<Parameter>> makeParameters(List<PropertyVO> properties) {
        if(properties == null) {
            return Optional.empty();
        }
        return Optional.of(properties.stream()
                .map(p -> makeParameter(p, makeAnnotation("@PathVariable", p)).orElse(null))
                .filter(Objects::nonNull)
                .collect(Collectors.toList())
        );
    }

    private Optional<Parameter> makeParameter(PropertyVO property, String annotation) {
        if(property == null) {
            return Optional.empty();
        }
        return Optional.of(new Parameter(("".equals(annotation) ? "" : annotation + " ")
                + property.getTypeForCode(), property.getName()));
    }

    private void addDto(JavaSourceCode sourceCode, List<PropertyVO> dtos, String controllerName) {
        for (PropertyVO dto : dtos) {
            JavaTypeDeclaration dtoType = sourceCode.createCompilationUnit(doc.getServer().getPackageName() + ".dto." + controllerName.toLowerCase(), dto.getDtoName()).createTypeDeclaration(dto.getDtoName());
            dtoType.modifiers(Modifier.PUBLIC);
            if (dto.getProperties() != null) {
                for (PropertyVO property : dto.getProperties()) {
                    dtoType.addFieldDeclaration(JavaFieldDeclaration.field(property.getName()).modifiers(Modifier.PRIVATE)
                            .returning(property.getTypeForCode()));
                }
            }
        }
    }
}

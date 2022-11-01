package com.web.apicloud.util.code;

import com.web.apicloud.domain.vo.ApiVO;
import com.web.apicloud.domain.vo.ControllerVO;
import com.web.apicloud.domain.vo.DocVO;
import com.web.apicloud.domain.vo.PropertyVO;
import io.spring.initializr.generator.language.*;
import io.spring.initializr.generator.language.java.*;
import io.spring.initializr.generator.project.contributor.ProjectContributor;
import lombok.RequiredArgsConstructor;

import java.io.IOException;
import java.lang.reflect.Modifier;
import java.nio.file.Path;
import java.util.List;
import java.util.function.Consumer;
import java.util.function.Supplier;

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
        if(controllers != null) {
            controllers.forEach(controllerConsumer(sourceCode));
        }

        this.sourceWriter.writeTo(new SourceStructure(projectRoot.resolve("src/main/"), new JavaLanguage()), sourceCode);
    }

    private Consumer<ControllerVO> controllerConsumer(JavaSourceCode sourceCode) {
        return (controller) -> {
            System.out.println("controllerConsumer() "+controller.getName());
            JavaCompilationUnit compilationUnit = sourceCode.createCompilationUnit(doc.getServer().getPackageName() + ".controller", controller.getName());
            JavaTypeDeclaration controllerType = compilationUnit.createTypeDeclaration(controller.getName());
            controllerType.modifiers(Modifier.PUBLIC);
            controllerType.annotate(Annotation.name("org.springframework.web.bind.annotation.RestController"));
            List<ApiVO> apis = controller.getApis();
            if(apis != null) {
                apis.forEach(apiConsumer(sourceCode, controllerType));
            }
        };
    }

    private Consumer<ApiVO> apiConsumer(JavaSourceCode sourceCode, JavaTypeDeclaration controllerType) {
        return api -> {
            System.out.println("apiConsumer(): "+api.getName());
            System.out.println(api.getAvailableDTO());
            addDto(sourceCode, api.getAvailableDTO(), controllerType.getName());
            JavaMethodDeclaration.Builder builder = JavaMethodDeclaration
                    .method(api.getName())
                    .modifiers(Modifier.PUBLIC)
                    .returning(api.getReturning());
            addApiParameters(builder, api);

            JavaMethodDeclaration jmd = builder.body();
            String methodMappingName = "org.springframework.web.bind.annotation."
                    + Character.toUpperCase(api.getMethod().charAt(0)) + api.getMethod().substring(1) + "Mapping";
            jmd.annotate(Annotation.name(methodMappingName, b ->
                b.attribute("value", String.class, api.getUri())));
            controllerType.addMethodDeclaration(jmd);
        };
    }

    private void addApiParameters(JavaMethodDeclaration.Builder builder, ApiVO api) {
        // path에서 파라미터 추가
        addPropertiesToParameter(builder, api.getParameters());

        // query에서 파라미터 추가
        addPropertyToParameter(builder, api.getQuery());

        // requestBody에서 파라미터 추가
        addPropertyToParameter(builder, api.getRequestBody());
    }

    private void addPropertyToParameter(JavaMethodDeclaration.Builder builder, PropertyVO property) {
        if(property != null){
            // TODO: annotation 달기
            builder.parameters(new Parameter(property.getTypeForCode(), property.getName()));
        }
    }

    private void addPropertiesToParameter(JavaMethodDeclaration.Builder builder, List<PropertyVO> properties) {
        if(properties != null) {
            for (PropertyVO property : properties) {
                addPropertyToParameter(builder, property);
            }
        }
    }

    private void addDto(JavaSourceCode sourceCode, List<PropertyVO> dtos, String controllerName) {
        for(PropertyVO dto : dtos) {
            JavaTypeDeclaration dtoType = sourceCode.createCompilationUnit(doc.getServer().getPackageName() + ".dto." + controllerName.toLowerCase(), dto.getDtoName()).createTypeDeclaration(dto.getDtoName());
            dtoType.modifiers(Modifier.PUBLIC);
            if(dto.getProperties() != null) {
                for(PropertyVO property : dto.getProperties()) {
                    dtoType.addFieldDeclaration(JavaFieldDeclaration.field(property.getName()).modifiers(Modifier.PRIVATE)
                            .returning(property.getTypeForCode()));
                }
            }
        }
    }
}

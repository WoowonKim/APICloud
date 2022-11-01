package com.web.apicloud.util.code;

import com.web.apicloud.domain.entity.Api;
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
        if(controllers != null) {
            controllers.forEach(controllerConsumer(sourceCode));
        }

        this.sourceWriter.writeTo(new SourceStructure(projectRoot.resolve("src/main/"), new JavaLanguage()), sourceCode);
    }

    private Consumer<ControllerVO> controllerConsumer(JavaSourceCode sourceCode) {
        return (controller) -> {
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
            addDto(sourceCode, api.getAvailableDTO(), controllerType.getName());
            JavaMethodDeclaration jmd = JavaMethodDeclaration
                    .method(api.getName())
                    .modifiers(Modifier.PUBLIC)
                    .parameters()
                    .returning(api.getReturning())
                    .body();
            controllerType.addMethodDeclaration(jmd);
        };
    }

    private void addDto(JavaSourceCode sourceCode, List<PropertyVO> dtos, String controllerName) {
        for(PropertyVO dto : dtos) {
            JavaTypeDeclaration dtoType = sourceCode.createCompilationUnit(doc.getServer().getPackageName() + ".dto." + controllerName.toLowerCase(), dto.getNameToType()).createTypeDeclaration(dto.getNameToType());
            dtoType.modifiers(Modifier.PUBLIC);
            if(dto.getProperties() != null) {
                for(PropertyVO property : dto.getProperties()) {
                    dtoType.addFieldDeclaration(JavaFieldDeclaration.field(property.getName()).modifiers(Modifier.PRIVATE)
                            .returning("Object".equals(property.getType()) ? property.getNameToType() : property.getType()));
                }
            }
        }
    }
}

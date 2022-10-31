package com.web.apicloud.util.code;

import com.web.apicloud.domain.vo.ApiVO;
import com.web.apicloud.domain.vo.ControllerVO;
import com.web.apicloud.domain.vo.DocVO;
import io.spring.initializr.generator.language.*;
import io.spring.initializr.generator.language.java.*;
import io.spring.initializr.generator.project.contributor.ProjectContributor;
import lombok.RequiredArgsConstructor;

import java.io.IOException;
import java.nio.file.Path;
import java.util.List;
import java.util.function.Supplier;

@RequiredArgsConstructor
public class ControllerContributor implements ProjectContributor {
    private final Supplier<JavaSourceCode> sourceFactory;

    private final SourceCodeWriter<JavaSourceCode> sourceWriter;

    private final DocVO doc;



    @Override
    public void contribute(Path projectRoot) throws IOException {
        System.out.println("ControllerContributor::contribute()");
        JavaSourceCode sourceCode = this.sourceFactory.get();
        List<ControllerVO> controllers = doc.getControllers();
        if(controllers != null) {
            controllers.forEach((c) -> {
                JavaCompilationUnit compilationUnit = sourceCode.createCompilationUnit("package", c.getName());
                JavaTypeDeclaration controllerType = compilationUnit.createTypeDeclaration(c.getName());
                List<ApiVO> apis = c.getApis();
                if(apis != null) {
                    apis.forEach(a-> {
                        JavaMethodDeclaration jmd = JavaMethodDeclaration
                                .method(a.getName())
                                .body();
                        controllerType.addMethodDeclaration(jmd);
                    });
                }
            });
        }

        this.sourceWriter.writeTo(new SourceStructure(projectRoot.resolve("src/main/"), new JavaLanguage()), sourceCode);
    }
}

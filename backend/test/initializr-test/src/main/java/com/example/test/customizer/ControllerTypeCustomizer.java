package com.example.test.customizer;

import io.spring.initializr.generator.language.TypeDeclaration;
import org.springframework.core.Ordered;

@FunctionalInterface
public interface ControllerTypeCustomizer <T extends TypeDeclaration> extends Ordered {

    void customize(T typeDeclaration);

    @Override
    default int getOrder() {
        return 0;
    }

}

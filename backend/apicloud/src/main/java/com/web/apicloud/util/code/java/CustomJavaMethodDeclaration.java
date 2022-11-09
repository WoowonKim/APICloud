/*
 * Copyright 2012-2019 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * source: io.spring.initializr.generator.language.java.JavaMethodDeclaration
 */

package com.web.apicloud.util.code.java;

import com.web.apicloud.util.code.AnnotatableParameter;
import io.spring.initializr.generator.language.Annotatable;
import io.spring.initializr.generator.language.Annotation;
import io.spring.initializr.generator.language.java.JavaStatement;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public final class CustomJavaMethodDeclaration implements Annotatable {

    private final List<Annotation> annotations = new ArrayList<>();

    private final String name;

    private final JavaType returnType;

    private final int modifiers;

    private final List<AnnotatableParameter> parameters;

    private final List<JavaStatement> statements;

    private CustomJavaMethodDeclaration(String name, JavaType returnType, int modifiers, List<AnnotatableParameter> parameters,
                                        List<JavaStatement> statements) {
        this.name = name;
        this.returnType = returnType;
        this.modifiers = modifiers;
        this.parameters = parameters;
        this.statements = statements;
    }

    public static Builder method(String name) {
        return new Builder(name);
    }

    String getName() {
        return this.name;
    }

    JavaType getReturnType() {
        return this.returnType;
    }

    List<AnnotatableParameter> getParameters() {
        return this.parameters;
    }

    int getModifiers() {
        return this.modifiers;
    }

    public List<JavaStatement> getStatements() {
        return this.statements;
    }

    @Override
    public void annotate(Annotation annotation) {
        this.annotations.add(annotation);
    }

    @Override
    public List<Annotation> getAnnotations() {
        return Collections.unmodifiableList(this.annotations);
    }

    /**
     * Builder for creating a {@link CustomJavaMethodDeclaration}.
     */
    public static final class Builder {

        private final String name;

        private List<AnnotatableParameter> parameters = new ArrayList<>();

        private JavaType returnType = JavaType.builder().type("void").build();

        private int modifiers;

        private Builder(String name) {
            this.name = name;
        }

        public Builder modifiers(int modifiers) {
            this.modifiers = modifiers;
            return this;
        }

        public Builder returning(JavaType returnType) {
            this.returnType = returnType;
            return this;
        }

        public Builder parameters(AnnotatableParameter... parameters) {
            this.parameters = Arrays.asList(parameters);
            return this;
        }

        public CustomJavaMethodDeclaration body(JavaStatement... statements) {
            return new CustomJavaMethodDeclaration(this.name, this.returnType, this.modifiers, this.parameters,
                    Arrays.asList(statements));
        }

    }

}

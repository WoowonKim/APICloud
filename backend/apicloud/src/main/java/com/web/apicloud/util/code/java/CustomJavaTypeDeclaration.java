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
 * source: io.spring.initializr.generator.language.java.CustomJavaTypeDeclaration
 */

package com.web.apicloud.util.code.java;

import io.spring.initializr.generator.language.TypeDeclaration;

import java.util.ArrayList;
import java.util.List;

public class CustomJavaTypeDeclaration extends TypeDeclaration {

    private int modifiers;

    private String implementedType;

    private final List<CustomJavaFieldDeclaration> fieldDeclarations = new ArrayList<>();

    private final List<CustomJavaMethodDeclaration> methodDeclarations = new ArrayList<>();

    CustomJavaTypeDeclaration(String name) {
        super(name);
    }

    public void implementedType(String implementedType) {
        this.implementedType = implementedType;
    }

    public String getImplementedType() {
        return this.implementedType;
    }

    public void modifiers(int modifiers) {
        this.modifiers = modifiers;
    }

    public int getModifiers() {
        return this.modifiers;
    }

    public void addFieldDeclaration(CustomJavaFieldDeclaration fieldDeclaration) {
        this.fieldDeclarations.add(fieldDeclaration);
    }

    public List<CustomJavaFieldDeclaration> getFieldDeclarations() {
        return this.fieldDeclarations;
    }

    public void addMethodDeclaration(CustomJavaMethodDeclaration methodDeclaration) {
        this.methodDeclarations.add(methodDeclaration);
    }

    public List<CustomJavaMethodDeclaration> getMethodDeclarations() {
        return this.methodDeclarations;
    }

}

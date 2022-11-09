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
 * source: io.spring.initializr.generator.language.java.CustomJavaCompilationUnit
 */

package com.web.apicloud.util.code.java;

import io.spring.initializr.generator.language.CompilationUnit;

/**
 * A Java-specific {@link CompilationUnit}.
 *
 * @author Andy Wilkinson
 */
public class CustomJavaCompilationUnit extends CompilationUnit<CustomJavaTypeDeclaration> {

    CustomJavaCompilationUnit(String packageName, String name) {
        super(packageName, name);
    }

    @Override
    protected CustomJavaTypeDeclaration doCreateTypeDeclaration(String name) {
        return new CustomJavaTypeDeclaration(name);
    }

}

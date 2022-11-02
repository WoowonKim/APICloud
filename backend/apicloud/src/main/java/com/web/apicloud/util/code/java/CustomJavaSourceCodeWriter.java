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
 * source: io.spring.initializr.generator.language.java.JavaSourceCodeWriter
 */

package com.web.apicloud.util.code.java;

import com.web.apicloud.util.code.AnnotatableParameter;
import io.spring.initializr.generator.io.IndentingWriter;
import io.spring.initializr.generator.io.IndentingWriterFactory;
import io.spring.initializr.generator.language.*;
import io.spring.initializr.generator.language.java.*;

import java.io.IOException;
import java.lang.reflect.Modifier;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.*;
import java.util.Map.Entry;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * A {@link SourceCodeWriter} that writes {@link SourceCode} in Java.
 *
 * @author Andy Wilkinson
 * @author Matt Berteaux
 */
public class CustomJavaSourceCodeWriter implements SourceCodeWriter<CustomJavaSourceCode> {

    private static final Map<Predicate<Integer>, String> TYPE_MODIFIERS;

    private static final Map<Predicate<Integer>, String> FIELD_MODIFIERS;

    private static final Map<Predicate<Integer>, String> METHOD_MODIFIERS;

    static {
        Map<Predicate<Integer>, String> typeModifiers = new LinkedHashMap<>();
        typeModifiers.put(Modifier::isPublic, "public");
        typeModifiers.put(Modifier::isProtected, "protected");
        typeModifiers.put(Modifier::isPrivate, "private");
        typeModifiers.put(Modifier::isAbstract, "abstract");
        typeModifiers.put(Modifier::isStatic, "static");
        typeModifiers.put(Modifier::isFinal, "final");
        typeModifiers.put(Modifier::isStrict, "strictfp");
        TYPE_MODIFIERS = typeModifiers;
        Map<Predicate<Integer>, String> fieldModifiers = new LinkedHashMap<>();
        fieldModifiers.put(Modifier::isPublic, "public");
        fieldModifiers.put(Modifier::isProtected, "protected");
        fieldModifiers.put(Modifier::isPrivate, "private");
        fieldModifiers.put(Modifier::isStatic, "static");
        fieldModifiers.put(Modifier::isFinal, "final");
        fieldModifiers.put(Modifier::isTransient, "transient");
        fieldModifiers.put(Modifier::isVolatile, "volatile");
        FIELD_MODIFIERS = fieldModifiers;
        Map<Predicate<Integer>, String> methodModifiers = new LinkedHashMap<>(typeModifiers);
        methodModifiers.put(Modifier::isSynchronized, "synchronized");
        methodModifiers.put(Modifier::isNative, "native");
        METHOD_MODIFIERS = methodModifiers;
    }

    private final IndentingWriterFactory indentingWriterFactory;

    public CustomJavaSourceCodeWriter(IndentingWriterFactory indentingWriterFactory) {
        this.indentingWriterFactory = indentingWriterFactory;
    }

    @Override
    public void writeTo(SourceStructure structure, CustomJavaSourceCode sourceCode) throws IOException {
        for (CustomJavaCompilationUnit compilationUnit : sourceCode.getCompilationUnits()) {
            writeTo(structure, compilationUnit);
        }
    }

    private void writeTo(SourceStructure structure, CustomJavaCompilationUnit compilationUnit) throws IOException {
        Path output = structure.createSourceFile(compilationUnit.getPackageName(), compilationUnit.getName());
        Files.createDirectories(output.getParent());
        try (IndentingWriter writer = this.indentingWriterFactory.createIndentingWriter("java",
                Files.newBufferedWriter(output))) {
            writer.println("package " + compilationUnit.getPackageName() + ";");
            writer.println();
            Set<String> imports = determineImports(compilationUnit);
            if (!imports.isEmpty()) {
                for (String importedType : imports) {
                    writer.println("import " + importedType + ";");
                }
                writer.println();
            }
            for (CustomJavaTypeDeclaration type : compilationUnit.getTypeDeclarations()) {
                writeAnnotations(writer, type);
                writeModifiers(writer, TYPE_MODIFIERS, type.getModifiers());
                writer.print("class " + type.getName());
                if (type.getExtends() != null) {
                    writer.print(" extends " + getUnqualifiedName(type.getExtends()));
                }
                writer.println(" {");
                writer.println();
                List<CustomJavaFieldDeclaration> fieldDeclarations = type.getFieldDeclarations();
                if (!fieldDeclarations.isEmpty()) {
                    writer.indented(() -> {
                        for (CustomJavaFieldDeclaration fieldDeclaration : fieldDeclarations) {
                            writeFieldDeclaration(writer, fieldDeclaration);
                        }
                    });
                }
                List<CustomJavaMethodDeclaration> methodDeclarations = type.getMethodDeclarations();
                if (!methodDeclarations.isEmpty()) {
                    writer.indented(() -> {
                        for (CustomJavaMethodDeclaration methodDeclaration : methodDeclarations) {
                            writeMethodDeclaration(writer, methodDeclaration);
                        }
                    });
                }
                writer.println("}");
            }
        }
    }

    private void writeAnnotations(IndentingWriter writer, Annotatable annotatable) {
        annotatable.getAnnotations().forEach((annotation) -> {
            writeAnnotation(writer, annotation);
        });
    }

    private void writeAnnotation(IndentingWriter writer, Annotation annotation) {
        writer.print("@" + getUnqualifiedName(annotation.getName()));
        List<Annotation.Attribute> attributes = annotation.getAttributes();
        if (!attributes.isEmpty()) {
            writer.print("(");
            if (attributes.size() == 1 && attributes.get(0).getName().equals("value")) {
                writer.print(formatAnnotationAttribute(attributes.get(0)));
            } else {
                writer.print(attributes.stream()
                        .map((attribute) -> attribute.getName() + " = " + formatAnnotationAttribute(attribute))
                        .collect(Collectors.joining(", ")));
            }
            writer.print(")");
        }
        writer.println();
    }

    private String getAnnotations(Annotatable annotatable) {
        StringBuilder code = new StringBuilder();
        for(Annotation annotation : annotatable.getAnnotations()) {
            code.append(getAnnotation(annotation)).append(" ");
        }
        return code.toString();
    }

    private String getAnnotation(Annotation annotation) {
        String code = "@" + getUnqualifiedName(annotation.getName());
        List<Annotation.Attribute> attributes = annotation.getAttributes();
        if (!attributes.isEmpty()) {
            code += "(";
            if (attributes.size() == 1 && attributes.get(0).getName().equals("value")) {
                code += formatAnnotationAttribute(attributes.get(0));
            } else {
                code += attributes.stream()
                        .map((attribute) -> attribute.getName() + " = " + formatAnnotationAttribute(attribute))
                        .collect(Collectors.joining(", "));
            }
            code += ")";
        }
        return code;
    }

    private String formatAnnotationAttribute(Annotation.Attribute attribute) {
        List<String> values = attribute.getValues();
        if (attribute.getType().equals(Class.class)) {
            return formatValues(values, (value) -> String.format("%s.class", getUnqualifiedName(value)));
        }
        if (Enum.class.isAssignableFrom(attribute.getType())) {
            return formatValues(values, (value) -> {
                String enumValue = value.substring(value.lastIndexOf(".") + 1);
                String enumClass = value.substring(0, value.lastIndexOf("."));
                return String.format("%s.%s", getUnqualifiedName(enumClass), enumValue);
            });
        }
        if (attribute.getType().equals(String.class)) {
            return formatValues(values, (value) -> String.format("\"%s\"", value));
        }
        return formatValues(values, (value) -> String.format("%s", value));
    }

    private String formatValues(List<String> values, Function<String, String> formatter) {
        String result = values.stream().map(formatter).collect(Collectors.joining(", "));
        return (values.size() > 1) ? "{ " + result + " }" : result;
    }

    private void writeFieldDeclaration(IndentingWriter writer, CustomJavaFieldDeclaration fieldDeclaration) {
        writeAnnotations(writer, fieldDeclaration);
        writeModifiers(writer, FIELD_MODIFIERS, fieldDeclaration.getModifiers());
        writer.print(getUnqualifiedName(fieldDeclaration.getReturnType()));
        writer.print(" ");
        writer.print(fieldDeclaration.getName());
        if (fieldDeclaration.isInitialized()) {
            writer.print(" = ");
            writer.print(String.valueOf(fieldDeclaration.getValue()));
        }
        writer.println(";");
        writer.println();
    }

    private void writeMethodDeclaration(IndentingWriter writer, CustomJavaMethodDeclaration methodDeclaration) {
        writeAnnotations(writer, methodDeclaration);
        writeModifiers(writer, METHOD_MODIFIERS, methodDeclaration.getModifiers());
        writer.print(getUnqualifiedName(methodDeclaration.getReturnType()) + " " + methodDeclaration.getName() + "(");
        List<AnnotatableParameter> parameters = methodDeclaration.getParameters();
        if (!parameters.isEmpty()) {
            writer.print(parameters.stream()
                    .map((parameter) -> getAnnotations(parameter) + getUnqualifiedName(parameter.getType()) + " " + parameter.getName())
                    .collect(Collectors.joining(", ")));
        }
        writer.println(") {");
        writer.indented(() -> {
            List<JavaStatement> statements = methodDeclaration.getStatements();
            for (JavaStatement statement : statements) {
                if (statement instanceof JavaExpressionStatement) {
                    writeExpression(writer, ((JavaExpressionStatement) statement).getExpression());
                } else if (statement instanceof JavaReturnStatement) {
                    writer.print("return ");
                    writeExpression(writer, ((JavaReturnStatement) statement).getExpression());
                }
                writer.println(";");
            }
        });
        writer.println("}");
        writer.println();
    }

    private void writeModifiers(IndentingWriter writer, Map<Predicate<Integer>, String> availableModifiers,
                                int declaredModifiers) {
        String modifiers = availableModifiers.entrySet().stream()
                .filter((entry) -> entry.getKey().test(declaredModifiers)).map(Entry::getValue)
                .collect(Collectors.joining(" "));
        if (!modifiers.isEmpty()) {
            writer.print(modifiers);
            writer.print(" ");
        }
    }

    private void writeExpression(IndentingWriter writer, JavaExpression expression) {
        if (expression instanceof JavaMethodInvocation) {
            writeMethodInvocation(writer, (JavaMethodInvocation) expression);
        } else if(expression instanceof JavaClassCreation) {
            writeClassCreation(writer, (JavaClassCreation) expression);
        }
    }

    private void writeClassCreation(IndentingWriter writer, JavaClassCreation classCreation) {
        writer.println(getClassCreation(classCreation));
    }

    private String getClassCreation(JavaClassCreation classCreation) {
        String code = "new " + getUnqualifiedName(classCreation.getType());
        if(classCreation.getGenericType() != null) {
            code += "<" + getUnqualifiedName(classCreation.getGenericType()) + ">";
        }
        List<JavaArgument> arguments = classCreation.getArguments();
        code += "(" + arguments.stream().map(argument -> {
            String argumentCode;
            if(argument instanceof JavaClassCreation) {
                argumentCode = getClassCreation((JavaClassCreation) argument);
            } else if(argument instanceof JavaEnum) {
                argumentCode = getEnum((JavaEnum) argument);
            } else {
                argumentCode = "";
            }
            return argumentCode;
        }).collect(Collectors.joining(", ")) + ")";
        return code;
    }

    private String getEnum(JavaEnum argument) {
        return argument.getTarget() + "." +argument.getName();
    }

    private void writeMethodInvocation(IndentingWriter writer, JavaMethodInvocation methodInvocation) {
        writer.print(getUnqualifiedName(methodInvocation.getTarget()) + "." + methodInvocation.getName() + "("
                + String.join(", ", methodInvocation.getArguments()) + ")");
    }

    private Set<String> determineImports(CustomJavaCompilationUnit compilationUnit) {
        List<String> imports = new ArrayList<>();
        for (CustomJavaTypeDeclaration typeDeclaration : compilationUnit.getTypeDeclarations()) {
            if (requiresImport(typeDeclaration.getExtends())) {
                imports.add(typeDeclaration.getExtends());
            }
            imports.addAll(getRequiredImports(typeDeclaration.getAnnotations(), this::determineImports));
            for (CustomJavaFieldDeclaration fieldDeclaration : typeDeclaration.getFieldDeclarations()) {
                if (requiresImport(fieldDeclaration.getReturnType())) {
                    imports.add(fieldDeclaration.getReturnType());
                }
                imports.addAll(getRequiredImports(fieldDeclaration.getAnnotations(), this::determineImports));
            }
            for (CustomJavaMethodDeclaration methodDeclaration : typeDeclaration.getMethodDeclarations()) {
                if (requiresImport(methodDeclaration.getReturnType())) {
                    imports.add(methodDeclaration.getReturnType());
                }
                imports.addAll(getRequiredImports(methodDeclaration.getAnnotations(), this::determineImports));
                imports.addAll(getRequiredImports(methodDeclaration.getParameters(),
                        (parameter) -> Collections.singletonList(parameter.getType())));
                methodDeclaration.getStatements().forEach(statement -> {
                    if(statement instanceof JavaExpressionStatement) {
                        JavaExpression javaExpression = ((JavaExpressionStatement) statement).getExpression();
                        if(javaExpression instanceof JavaMethodInvocation) {
                            addImport(imports, ((JavaMethodInvocation) javaExpression).getTarget());
                        } else if(javaExpression instanceof JavaClassCreation) {
                            addImportsOfClassCreation(imports, (JavaClassCreation) javaExpression);
                        }
                    }
                });
                imports.addAll(getRequiredImports(
                        methodDeclaration.getStatements().stream().filter(JavaExpressionStatement.class::isInstance)
                                .map(JavaExpressionStatement.class::cast).map(JavaExpressionStatement::getExpression)
                                .filter(JavaMethodInvocation.class::isInstance).map(JavaMethodInvocation.class::cast),
                        (methodInvocation) -> Collections.singleton(methodInvocation.getTarget())));
                imports.addAll(getRequiredImports(
                        methodDeclaration.getStatements().stream().filter(JavaExpressionStatement.class::isInstance)
                                .map(JavaExpressionStatement.class::cast).map(JavaExpressionStatement::getExpression)
                                .filter(JavaMethodInvocation.class::isInstance).map(JavaClassCreation.class::cast),
                        (methodInvocation) -> Collections.singleton(methodInvocation.getType())));
                imports.addAll(getRequiredImports(
                        methodDeclaration.getParameters().stream()
                        .map(AnnotatableParameter::getAnnotations)
                        .filter(annotations -> annotations.size() > 0).flatMap(Collection::stream)
                    , (annotation) -> Collections.singletonList(annotation.getName())
                ));
            }
        }
        Collections.sort(imports);
        return new LinkedHashSet<>(imports);
    }

    private void addImportsOfClassCreation(List<String> imports, JavaClassCreation javaClassCreation) {
        addImport(imports, javaClassCreation.getType());
        addImport(imports, javaClassCreation.getGenericType());
        javaClassCreation.getArguments().forEach(argument -> {
            if(argument instanceof JavaClassCreation) {
                addImportsOfClassCreation(imports, (JavaClassCreation) argument);
            } else if(argument instanceof JavaEnum) {
                addImport(imports, ((JavaEnum) argument).getTarget());
            }
        });
    }

    private void addImport(List<String> imports, String target) {
        if(requiresImport(target)) {
            imports.add(target);
        }
    }

    private Collection<String> determineImports(Annotation annotation) {
        List<String> imports = new ArrayList<>();
        imports.add(annotation.getName());
        annotation.getAttributes().forEach((attribute) -> {
            if (attribute.getType() == Class.class) {
                imports.addAll(attribute.getValues());
            }
            if (Enum.class.isAssignableFrom(attribute.getType())) {
                imports.addAll(attribute.getValues().stream().map((value) -> value.substring(0, value.lastIndexOf(".")))
                        .collect(Collectors.toList()));
            }
        });
        return imports;
    }

    private <T> List<String> getRequiredImports(List<T> candidates, Function<T, Collection<String>> mapping) {
        return getRequiredImports(candidates.stream(), mapping);
    }

    private <T> List<String> getRequiredImports(Stream<T> candidates, Function<T, Collection<String>> mapping) {
        return candidates.map(mapping).flatMap(Collection::stream).filter(this::requiresImport)
                .collect(Collectors.toList());
    }

    private String getUnqualifiedName(String name) {
        if (!name.contains(".")) {
            return name;
        }
        return name.substring(name.lastIndexOf(".") + 1);
    }

    private boolean requiresImport(String name) {
        if (name == null || !name.contains(".")) {
            return false;
        }
        String packageName = name.substring(0, name.lastIndexOf('.'));
        return !"java.lang".equals(packageName);
    }

}

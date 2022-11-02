package com.web.apicloud.util.code.java;

import io.spring.initializr.generator.language.java.JavaExpression;
import lombok.Data;

import java.util.List;

@Data
public class JavaClassCreation extends JavaExpression implements JavaArgument {
    private final String type;

    private final String genericType;

    private final List<JavaArgument> arguments;
}

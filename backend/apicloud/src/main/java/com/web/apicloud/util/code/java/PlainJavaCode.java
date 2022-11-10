package com.web.apicloud.util.code.java;

import io.spring.initializr.generator.language.java.JavaExpression;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Set;

@AllArgsConstructor
@Getter
public class PlainJavaCode extends JavaExpression {
    private String value;
    private Set<String> imports;
}

package com.web.apicloud.util.code.java;

import io.spring.initializr.generator.language.java.JavaStatement;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
public class JavaChainingMethodInvocation extends JavaStatement {
    private String target;
    private String method;
}

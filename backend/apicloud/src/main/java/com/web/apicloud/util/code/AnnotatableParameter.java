package com.web.apicloud.util.code;

import com.web.apicloud.util.code.java.JavaType;
import io.spring.initializr.generator.language.Annotatable;
import io.spring.initializr.generator.language.Annotation;
import lombok.Builder;
import lombok.Data;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Data
@Builder
public class AnnotatableParameter implements Annotatable {
    private JavaType type;
    private String name;
    private final List<Annotation> annotations = new ArrayList<>();

    public AnnotatableParameter(JavaType type, String name) {
        this.type = type;
        this.name = name;
    }

    @Override
    public void annotate(Annotation annotation) {
        this.annotations.add(annotation);
    }

    @Override
    public List<Annotation> getAnnotations() {
        return Collections.unmodifiableList(this.annotations);
    }
}

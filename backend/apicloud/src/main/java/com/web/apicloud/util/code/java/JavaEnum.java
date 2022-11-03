package com.web.apicloud.util.code.java;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class JavaEnum implements JavaArgument{
    private String target;
    private String name;
}

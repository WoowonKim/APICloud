package com.web.apicloud.util.code.java;

import lombok.Data;

@Data
public class JavaEnum implements JavaArgument{
    private String target;
    private String name;
}

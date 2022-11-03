package com.web.apicloud.model.parsing;

import java.util.List;

public interface ParsingService {
    int KMP(String str, String method);

    String getValue(String str);

    String getType(String request);

    List<String> getMethod(String str);

    boolean getRequired(String str);
}

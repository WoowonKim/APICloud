package com.web.apicloud.model.parsing;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class ParsingServiceImpl implements ParsingService {

    private static final String[] type = {"String", "Long", "long", "Integer", "int", "float", "Float", "Double", "double", "Boolean", "boolean", "Character", "char", "Short", "short", "Byte", "byte", "Byte[]", "byte[]"};
    private static final String METHOD = "Mapping";
    private static final String VALUE = "value";
    private static final String REQUIRED = "required";

    @Override
    public int KMP(String parent, String pattern) {
        int parentLength = parent.length();
        int patternLength = pattern.length();

        int[] table = new int[patternLength];

        int idx = 0;
        for (int i = 0; i < parentLength; i++) {
            while (idx > 0 && parent.charAt(i) != pattern.charAt(idx)) {
                idx = table[idx - 1];
            }
            if (parent.charAt(i) == pattern.charAt(idx)) {
                if (idx == patternLength - 1) {
                    idx = table[idx];
                    return i;
                } else idx += 1;
            }
        }
        return -1;
    }

    @Override
    public List<String> getMethod(String str) {
        List<String> getMethod = new ArrayList<>();

        int targetIdx1 = KMP(str, "@");
        int targetIdx2 = KMP(str, METHOD);

        if (targetIdx1 == -1 || targetIdx2 == -1) return null;
        String method = str.substring(targetIdx1 + 1, targetIdx2 - METHOD.length() + 1);
        getMethod.add(method);

        String uri = getValue(str);
        if (uri != null) getMethod.add(uri);
        return getMethod;
    }

    @Override
    public String getValue(String str) {
        int valueIdx = KMP(str, VALUE);
        if (valueIdx == -1) return getNonValue(str);
        String subString = str.substring(valueIdx + 1, str.length());
        return getNonValue(subString);
    }

    private String getNonValue(String str) {
        int targetIdx1 = KMP(str, "\"");
        if (targetIdx1 == -1) return null;
        String subString = str.substring(targetIdx1 + 1, str.length());
        int targetIdx2 = KMP(subString, "\"");
        return subString.substring(0, targetIdx2);
    }

    @Override
    public boolean getRequired(String str) {
        int requiredIdx = KMP(str, REQUIRED);
        if (requiredIdx == -1) return true;

        String subString = str.substring(requiredIdx + 1, str.length());
        int trueIdx = KMP(subString, "true");
        int falseIdx = KMP(subString, "false");
        if (trueIdx == -1) return false;
        if (falseIdx == -1) return true;
        if (trueIdx > falseIdx) return false;
        return true;
    }

    @Override
    public String getName(String str) {
        String[] tokens = str.split(" ");
        return tokens[tokens.length - 1].substring(0, tokens[tokens.length - 1].length() - 1);
    }

    @Override
    public String getType(String str) {
        for (String type : type) {
            if (KMP(str, type) != -1) return type;
        }
        return null;
    }

    @Override
    public String getParamType(String request) {
        String[] tokens = request.split(" ");
        return tokens[tokens.length - 2];
    }
}

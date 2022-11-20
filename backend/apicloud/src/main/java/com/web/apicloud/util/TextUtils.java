package com.web.apicloud.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.web.apicloud.domain.vo.PropertyVO;
import com.web.apicloud.domain.vo.ResponseVO;
import com.web.apicloud.exception.InternalServerErrorException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class TextUtils {
    private final ObjectMapper objectMapper;

    private static String[] javaKeyword = "abstract,continue,for,new,switch,assert,default,goto,package,synchronized,boolean,do,if,private,this,break,double,implements,protected,throw,byte,else,import,public,throws,case,enum,instanceof,return,transient,catch,extends,int,short,try,char,final,interface,static,void,class,finally,long,strictfp,volatile,const,float,native,super,while".split(",");

    public static boolean isJavaKeyword(String str) {
        for (String s : javaKeyword) {
            if (s.equals(str)) {
                return true;
            }
        }
        return false;
    }

    public StringBuffer makeTextFromProperties(List<PropertyVO> properties) {
        StringBuffer text = new StringBuffer();
        if (properties == null) {
            return text;
        }
        properties.forEach(property -> {
            text.append(makeTextFromProperty(property)).append("\n");
        });
        return text;
    }

    public String makeTextFromProperty(PropertyVO property) {
        String text = "";
        if (property == null) {
            return text;
        }
        try {
            text += objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(property);
        } catch (JsonProcessingException e) {
            throw new InternalServerErrorException("변환에 실패햐였습니다.");
        }
        return text.replace("\"", "");
    }

    public StringBuffer makeTextFromResponse(ResponseVO response) {
        StringBuffer text = new StringBuffer();
        if (response == null) {
            return text;
        }
        return text.append("status: ").append(response.getStatus()).append("\n")
                .append(makeTextFromProperty(response.getResponseBody()));
    }

    public static String getValidDocsName(String docsName) {
        if (!StringUtils.hasText(docsName)) {
            return "demo";
        }
        return getValidName(docsName).toLowerCase();
    }

    public static String getValidName(String name) {
        if (!StringUtils.hasText(name)) {
            return "demo";
        }
        String validName = name
                .replaceAll("[\\s-!@#$%^&*()=+~`,./<>?;:'\"\\\\]+", "_");
        if (Character.isDigit(name.charAt(0)) || isJavaKeyword(validName)) {
            validName = "_" + validName;
        }
        return validName;
    }

    public static String getValidUri(String contextUri) {
        if (contextUri.charAt(0) != '/') {
            contextUri = "/" + contextUri;
        }
        return contextUri.charAt(0) + getValidName(contextUri.substring(1));
    }

    public static String getValidGroupPackage(String groupPackage) {
        if (!StringUtils.hasText(groupPackage)) {
            return "com.example";
        }
        String validGroupPackage = getValidPackage(groupPackage);
        if (validGroupPackage.length() == 0) {
            return "com.example";
        }
        return getValidPackage(groupPackage);
    }

    public static String getValidPackageName(String docsName, String groupPackage, String packageName) {
        int idx = packageName.indexOf(groupPackage);
        if (idx != 0) {
            return groupPackage + "." + docsName;
        }
        String sub = packageName.substring(groupPackage.length());
        if(sub.length() == 0 || sub.charAt(0) != '.'){
            return groupPackage + "." + docsName;
        }
        return groupPackage + "." + getValidPackage(sub);
    }

    private static String getValidPackage(String groupPackage) {
        String[] splited = groupPackage.split("[.]");
        List<String> valid = new ArrayList<>(splited.length);
        for (int i = 0; i < splited.length; i++) {
            if (splited[i].matches("^[0-9]") || TextUtils.isJavaKeyword(splited[i])) {
                splited[i] = "_" + splited[i];
            }
            if (StringUtils.hasText(splited[i])) {
                valid.add(splited[i].replaceAll("[\\s-!@#$%^&*()=+~`,./<>?;:'\"]+", "_"));
            }
        }
        return String.join(".", valid);
    }
}

package com.web.apicloud.model.parsing;

import com.web.apicloud.domain.vo.PropertyVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class ClassParsingServiceImpl implements ClassParsingService {

    private static final String LIST = "List";
    private static final String[] accessModifier = {"public", "protected", "private", "default", "static"};
    private static final String[] type = {"String", "Long", "long", "Integer", "int", "float", "Float"};

    private static String rootPath = "";

    private final FileSearchService fileSearchService;
    private final ParsingService parsingService;

    @Override
    public PropertyVO getBody(String root, String name) throws IOException {
//        if (parsingService.KMP(name, LIST) != -1) {
//            String str = name.substring(5, name.length() - 1);
//            System.out.println(str);
//        }

        rootPath = root;
        // TODO: List 검사
        // TODO: String 검사
        // TODO: root 검사
        String path = fileSearchService.getClassPath(rootPath, name);
        List<String> lines = Files.readAllLines(Paths.get(path));
//        System.out.println(lines);

        PropertyVO requestBody = new PropertyVO();

        int i = 0;
        while (i < lines.size()) {
            if (parsingService.KMP(lines.get(i++), name) != -1) break;
        }

        while (i < lines.size()) {
            if (!lines.get(i).equals("")) {
                PropertyVO property = getProperty(lines.get(i));
                if (property != null) {
                    requestBody.getProperties().add(property);
                }
            }
            i++;
        }
        System.out.println(requestBody);
        return null;
    }

    public PropertyVO getProperty(String str) throws IOException {
        str = str.strip();
        str = str.replaceAll(";$", "");
        String[] tokens = str.split(" ");
        if (tokens.length <= 1) return null;

        int j = 0;
        while (j < tokens.length) {
            boolean state = false;
            for (int k = 0; k < accessModifier.length; k++) {
                if (tokens[j].equals(accessModifier[k])) {
                    state = true;
                    break;
                }
            }
            if (!state) break;
            j++;
        }

        if ((j + 1) >= tokens.length) return null;
        for (String type : type) {
            if (type.equals(tokens[j])) {
                return PropertyVO.builder().name(tokens[j + 1]).type(tokens[j]).build();
            }
        }

        // TODO: 리스트일 경우
        PropertyVO propertyVO = getBody(rootPath, tokens[j]);
//        if(propertyVO == null) return null;
        return PropertyVO.builder().name(tokens[j + 1]).collectionType(LIST).build();
    }
}

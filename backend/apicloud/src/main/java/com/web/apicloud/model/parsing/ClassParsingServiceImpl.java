package com.web.apicloud.model.parsing;

import com.web.apicloud.domain.vo.PropertyVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class ClassParsingServiceImpl implements ClassParsingService {

    private static final String LIST = "List";
    private static final String[] accessModifier = {"public", "protected", "private", "default", "static"};
    private static final String[] type = {"String", "Long", "long", "Integer", "int", "float", "Float"};

    private static String rootPath = "";
    public static ArrayList<String> useObject = new ArrayList<>();

    private final FileSearchService fileSearchService;
    private final ParsingService parsingService;

    @Override
    public PropertyVO getBody(String root, String name) throws IOException {
        PropertyVO requestBody = new PropertyVO();

        if (parsingService.KMP(name, LIST) != -1) {
            name = name.substring(5, name.length() - 1);
            requestBody.setCollectionType(LIST);
            System.out.println(name);
        }

        for (String type : type) {
            if (type.equals(name)) {
                requestBody.setType(name);
                return requestBody;
            }
        }

        requestBody.setDtoName(name);
        requestBody.setType("Object");
        if(useObject.contains(name)) return requestBody;
        useObject.add(name);

        rootPath = root;
        if (rootPath.equals("") || rootPath == null) return null;

        String path = fileSearchService.getClassPath(rootPath, name);
        if (path == null) return null;
        List<String> lines = Files.readAllLines(Paths.get(path));

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
        return requestBody;
    }

    public PropertyVO getProperty(String str) throws IOException {
        str = str.strip();
        str = str.replaceAll(";", "");
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
        PropertyVO getPropertyVO = getBody(rootPath, tokens[j]);
        if(getPropertyVO == null) return null;
        return PropertyVO.builder()
                .dtoName(getPropertyVO.getDtoName())
                .name(tokens[j + 1])
                .type(getPropertyVO.getType())
                .collectionType(getPropertyVO.getCollectionType())
                .properties(getPropertyVO.getProperties()).build();
    }
}

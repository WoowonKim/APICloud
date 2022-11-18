package com.web.apicloud.model.parsing;

import com.web.apicloud.domain.dto.CodeResponse;
import com.web.apicloud.domain.vo.PropertyVO;
import com.web.apicloud.model.SynchronizeCodeServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@Service
public class ClassUpdateServiceImpl implements ClassUpdateService {

    private static final String IMPORT = "import";
    private static final String IMPORT_LIST = "java.util.List";
    private static final String IMPORT_UTIL = "java.util.*";
    private static final String[] accessModifier = {"public", "protected", "private", "default", "static"};

    private final S3Service s3Service;
    private final ParsingService parsingService;

    @Override
    public void updateObject(String groupSecretKey, PropertyVO property, int index) throws IOException {
        if (property == null) return;
        int i = 0;
        for (i = 1; i < SynchronizeCodeServiceImpl.codeList.size(); i++) {
            if (SynchronizeCodeServiceImpl.codeList.get(i).getName().equals(property.getDtoName())) return;
        }
        Map<String, List<String>> getFileCode = s3Service.getFile(property.getDtoName(), null, groupSecretKey);
        if (getFileCode == null) return;
        List<String> lines = getFileCode.get("code");
        if (lines == null) return;

        String key = StringUtils.removeStart(StringUtils.removeEnd(String.valueOf(getFileCode.get(IMPORT)), "]"), "[");
        SynchronizeCodeServiceImpl.codeList.add(CodeResponse.builder().name(property.getDtoName()).importPackage(key).code(lines).build());
        SynchronizeCodeServiceImpl.importList.add(new HashMap<>());

        i = SynchronizeCodeServiceImpl.codeList.size() - 1;
        if (SynchronizeCodeServiceImpl.importList.get(index).get(key) == null) {
            SynchronizeCodeServiceImpl.importList.get(index).put(key, IMPORT);
            SynchronizeCodeServiceImpl.codeList.get(index).getUpdateImport().add(IMPORT + " " + key + ";");
        }
        updateClass(groupSecretKey, i, property);
    }

    private void updateClass(String groupSecretKey, int index, PropertyVO property) throws IOException {
        int i = 0;
        List<String> lines = SynchronizeCodeServiceImpl.codeList.get(index).getCode();
        if (parsingService.KMP(lines.get(i), IMPORT) != -1) {
            String importStr = lines.get(i).replace(IMPORT, "");
            importStr = importStr.replaceFirst(" ", "");
            SynchronizeCodeServiceImpl.importList.get(index).put(StringUtils.removeEnd(importStr, ";"), IMPORT);
        }

        int startIndex = 0;
        List<Integer> remove = new ArrayList<>();
        while (i < lines.size()) {
            if (parsingService.KMP(lines.get(i++), "class " + property.getDtoName()) != -1) {
                startIndex = i;
                break;
            }
        }

        while (i < lines.size()) {
            if (!lines.get(i).equals("")) {
                if (getProperty(lines.get(i))) remove.add(i);
            } else remove.add(i);
            i++;
        }

        for (int j = remove.size() - 1; j >= 0; j--) {
            SynchronizeCodeServiceImpl.codeList.get(index).getCode().remove(remove.get(j).intValue());
        }

        List<String> body = makeBody(groupSecretKey, property, index);
        if (body != null) SynchronizeCodeServiceImpl.codeList.get(index).getCode().addAll(startIndex, body);
    }

    private List<String> makeBody(String groupSecretKey, PropertyVO property, int index) throws IOException {
        if (property.getProperties() == null || property.getProperties().size() == 0) return null;
        List<String> body = new ArrayList<>();

        for (int i = 0; i < property.getProperties().size(); i++) {
            PropertyVO propertyDetail = property.getProperties().get(i);
            body.add("");
            String propertyBody = "    private ";
            String type = "";
            if (propertyDetail.getType().equals("Object")) {
                type = propertyDetail.getDtoName();
                updateObject(groupSecretKey, propertyDetail, index);
            } else type = propertyDetail.getType();

            if (propertyDetail.getCollectionType() != null && !propertyDetail.getCollectionType().equals("")) {
                propertyBody += "List<" + type + ">";
                if (SynchronizeCodeServiceImpl.importList.get(index).get(IMPORT_UTIL) == null && SynchronizeCodeServiceImpl.importList.get(index).get(IMPORT_LIST) == null) {
                    SynchronizeCodeServiceImpl.importList.get(index).put(IMPORT_LIST, IMPORT);
                    SynchronizeCodeServiceImpl.codeList.get(index).getUpdateImport().add(IMPORT + " " + IMPORT_LIST + ";");
                }
            } else propertyBody += type;

            propertyBody += " " + propertyDetail.getName() + ";";
            body.add(propertyBody);
        }
        return body;
    }

    public boolean getProperty(String str) {
        str = str.strip();
        if (str.charAt(str.length() - 1) != ';') return false;
        str = str.replaceAll(";", "");
        String[] tokens = str.split(" ");
        if (tokens.length <= 1) return false;

        int j = 0;
        boolean state = false;
        while (j < tokens.length) {
            for (int k = 0; k < accessModifier.length; k++) {
                if (tokens[j].equals(accessModifier[k])) {
                    state = true;
                    break;
                }
            }
            j++;
        }
        if (!state) return false;
        return true;
    }
}

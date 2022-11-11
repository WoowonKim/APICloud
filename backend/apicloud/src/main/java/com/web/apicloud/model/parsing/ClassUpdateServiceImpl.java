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
    private final S3Service s3Service;

    @Override
    public void updateObject(String groupSecretKey, PropertyVO property) throws IOException {
        System.out.println("updateObject ==> " + property.getDtoName());
        int i = 0;
        boolean listFlag = false;
        Map<String, List<String>> getFileCode = new HashMap<>();
        List<String> lines;
        String key;
        for (i = 1; i < SynchronizeCodeServiceImpl.codeList.size(); i++) {
            if (SynchronizeCodeServiceImpl.codeList.get(i).getName().equals(property.getDtoName())) {
                listFlag = true;
                break;
            }
        }
        if (listFlag)   {
            lines = SynchronizeCodeServiceImpl.codeList.get(i).getCode();
            key = SynchronizeCodeServiceImpl.codeList.get(i).getImportPackage();
        }
        else {
            getFileCode = s3Service.getFile(property.getDtoName(), null, groupSecretKey);
            lines = getFileCode.get("code");
            key = String.valueOf(getFileCode.get(IMPORT));
            key = StringUtils.removeEnd(key, "]");
            key = StringUtils.removeStart(key, "[");
            SynchronizeCodeServiceImpl.codeList.add(CodeResponse.builder().name(property.getDtoName()).importPackage(key).code(lines).build());
        }
        if (getFileCode == null) return;
        System.out.println(lines);
        if (SynchronizeCodeServiceImpl.importList.get(key) == null) {
            SynchronizeCodeServiceImpl.importList.put(key, IMPORT);
            SynchronizeCodeServiceImpl.updateImport.add(IMPORT + " " + key + ";");
        }
        System.out.println(SynchronizeCodeServiceImpl.updateImport);
    }
}

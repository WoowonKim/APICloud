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

    private final FileSearchService fileSearchService;

    @Override
    public PropertyVO getBody(String root,  String name) throws IOException {
        String path = fileSearchService.getClassPath(root, name);
        List<String> lines = Files.readAllLines(Paths.get(path));
        System.out.println(lines);
        return null;
    }
}

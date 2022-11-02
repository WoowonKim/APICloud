package com.web.apicloud.model;

import com.web.apicloud.domain.vo.PropertyVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class ClassParsingServiceImpl implements ClassParsingService{

    private final FileSearchService fileSearchService;

    @Override
    public PropertyVO getBody(String token) {
        return null;
    }
}
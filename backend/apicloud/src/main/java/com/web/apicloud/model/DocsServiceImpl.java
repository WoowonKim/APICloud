package com.web.apicloud.model;

import com.web.apicloud.domain.entity.Docs;
import com.web.apicloud.domain.repository.DocsRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@Service
public class DocsServiceImpl implements DocsService{
    private final DocsRepository docsRepository;

    @Override
    public Docs findByDocId(Long docId) {
        return docsRepository.findById(docId).orElse(null);
    }
}

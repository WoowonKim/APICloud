package com.web.apicloud.model;

import com.web.apicloud.domain.dto.DetailResponse;
import com.web.apicloud.domain.entity.Docs;
import com.web.apicloud.domain.repository.DocsRepository;
import com.web.apicloud.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ApiServiceImpl implements ApiService{

    private final DocsRepository docsRepository;

    @Override
    public DetailResponse getDetailById(String id) {
        Docs doc = docsRepository.findByEncryptedUrl(id).orElseThrow(() -> new ResourceNotFoundException("doc", "id", id));
        return DetailResponse.builder().detail(doc.getDetail()).build();
    }

    @Override
    public DetailResponse updateDetailById(Long id, String detail) {
        Docs doc = docsRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("doc", "id", id));
        doc.updateDetail(detail);
        docsRepository.save(doc);
        return DetailResponse.builder().detail(detail).build();
    }

}

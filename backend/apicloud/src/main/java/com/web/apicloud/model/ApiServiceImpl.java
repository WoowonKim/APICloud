package com.web.apicloud.model;

import com.web.apicloud.domain.entity.Docs;
import com.web.apicloud.domain.repository.DocsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ApiServiceImpl implements ApiService{

    private final DocsRepository docsRepository;
    @Override
    public String getDetailById(Long id) {
        Docs doc = docsRepository.findById(id).orElse(null);
        if(doc != null && doc.getDetail() != null) {
            return doc.getDetail();
        }
        return "나중에 Exception 처리할 부분";
    }

    @Override
    public String updateDetailById(Long id, String detail) {
        Docs doc = docsRepository.findById(id).orElse(null);
        if(doc != null) {
            doc.setDetail(detail);
            docsRepository.save(doc);
            return doc.getDetail();
        }
        return "나중에 Exception 처리할 부분";
    }


}

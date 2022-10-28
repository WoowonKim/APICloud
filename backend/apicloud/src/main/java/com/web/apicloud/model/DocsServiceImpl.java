package com.web.apicloud.model;

import com.web.apicloud.domain.dto.CreateDocDto;
import com.web.apicloud.domain.entity.Docs;
import com.web.apicloud.domain.entity.Group;
import com.web.apicloud.domain.repository.DocsRepository;
import com.web.apicloud.domain.repository.GroupRepository;
import com.web.apicloud.domain.repository.UserRepository;
import com.web.apicloud.util.SHA256;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.security.NoSuchAlgorithmException;


@Slf4j
@RequiredArgsConstructor
@Service
public class DocsServiceImpl implements DocsService{
    private final DocsRepository docsRepository;

    private final UserRepository userRepository;

    private final GroupRepository groupRepository;

    private final SHA256 sha256;

    @Override
    public Docs findByDocId(Long docId) {
        return docsRepository.findById(docId).orElse(null);
    }
    @Override
    public Long saveDocs(CreateDocDto createDocDto) {
        Group group = Group.builder().authority(1).user(userRepository.getById(createDocDto.getUserId())).build();
        groupRepository.save(group);
        createDocDto.setGroup(group);
        Long docId = docsRepository.save(createDocDto.toEntity()).getId();
        return docId;
    }

    // 암호화된 Url DB에 저장
    private void updateDocs(Long docId, String encryptedUrl) {
        Docs doc = docsRepository.getById(docId);
        doc.setEncryptedUrl(encryptedUrl);
        Docs encryptedDoc = docsRepository.getById(docId);
        docsRepository.save(encryptedDoc);
    }

    public String encryptUrl(Long docId) throws NoSuchAlgorithmException {
        String encryptedDocId = sha256.encrypt(docId.toString());
        String encryptedUrl = "http://localhost:3000/" + encryptedDocId;
        updateDocs(docId, encryptedUrl);
        return encryptedUrl;
    }
}

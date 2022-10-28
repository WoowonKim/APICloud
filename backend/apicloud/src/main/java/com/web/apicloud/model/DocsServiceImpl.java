package com.web.apicloud.model;

import com.web.apicloud.domain.dto.CreateDocDto;
import com.web.apicloud.domain.entity.Docs;
import com.web.apicloud.domain.entity.Group;
import com.web.apicloud.domain.repository.DocsRepository;
import com.web.apicloud.domain.repository.GroupRepository;
import com.web.apicloud.domain.repository.UserRepository;
import com.web.apicloud.util.SHA256;
import io.spring.initializr.web.project.ProjectRequest;
import io.spring.initializr.web.project.WebProjectRequest;
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
    public Docs findByDocsId(Long docsId) {
        return docsRepository.findById(docsId).orElse(null);
    }

    @Override
    public ProjectRequest getProjectRequestByDocsId(Long docId) {
        Docs doc = findByDocsId(docId);
        return convertDocsToProjectRequest(doc);
    }

    private WebProjectRequest convertDocsToProjectRequest(Docs doc) {
        WebProjectRequest pr = new WebProjectRequest();
        // type
        if(doc.getBuildManagement() == 1) {
            pr.setType("maven-project");
        } else if(doc.getBuildManagement() == 2) {
            pr.setType("gradle-project");
        } else {
            // TODO: 잘못된 입력 처리
        }

        // TODO: 다양한 language 처리
        pr.setLanguage("java");

        // bootVersion
        pr.setBootVersion(doc.getSpringVersion());

        // baseDir
        pr.setBaseDir(doc.getDocsName());

        // groupId
        pr.setGroupId(doc.getGroupPackage());

        //artifactId
        pr.setArtifactId(doc.getDocsName());

        //name
        pr.setName(doc.getDocsName());

        // description
        pr.setDescription("");

        // packageName
        pr.setPackageName(doc.getPackageName());

        // packaging
        if(doc.getPackaging() == 1) {
            pr.setPackaging("jar");
        } else if(doc.getPackaging() == 2) {
            pr.setPackaging("war");
        } else {
            // TODO: 에러 처리
        }

        // javaVersion
        pr.setJavaVersion(doc.getJavaVersion().toString());
        return pr;
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
    private void updateDocs(Long docsId, String encryptedUrl) {
        Docs doc = findByDocsId(docsId);
        doc.setEncryptedUrl(encryptedUrl);
        Docs encryptedDoc = findByDocsId(docsId);
        docsRepository.save(encryptedDoc);
    }

    public String encryptUrl(Long docId) throws NoSuchAlgorithmException {
        String encryptedDocId = sha256.encrypt(docId.toString());
        String encryptedUrl = "http://localhost:3000/" + encryptedDocId;
        updateDocs(docId, encryptedUrl);
        return encryptedUrl;
    }
}

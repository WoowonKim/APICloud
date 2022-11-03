package com.web.apicloud.model;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.web.apicloud.domain.dto.CreateDocRequest;
import com.web.apicloud.domain.dto.DocListResponse;
import com.web.apicloud.domain.dto.UpdateDocDto;
import com.web.apicloud.domain.entity.Docs;
import com.web.apicloud.domain.entity.Group;
import com.web.apicloud.domain.entity.GroupUser;
import com.web.apicloud.domain.entity.User;
import com.web.apicloud.domain.repository.DocsRepository;
import com.web.apicloud.domain.repository.GroupRepository;
import com.web.apicloud.domain.repository.GroupUserRepository;
import com.web.apicloud.domain.repository.UserRepository;
import com.web.apicloud.domain.vo.ApiVO;
import com.web.apicloud.domain.vo.ControllerVO;
import com.web.apicloud.domain.vo.DocVO;
import com.web.apicloud.domain.vo.ServerVO;
import com.web.apicloud.util.SHA256;
import io.spring.initializr.web.project.WebProjectRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class DocsServiceImpl implements DocsService{
    private final DocsRepository docsRepository;

    private final UserRepository userRepository;

    private final GroupRepository groupRepository;

    private final GroupUserRepository groupUserRepository;

    private final SHA256 sha256;

    private final ObjectMapper objectMapper;

    @Override
    public Docs findByDocsId(Long docsId) {
        return docsRepository.findById(docsId).orElse(null);
    }

    @Override
    public User findByUserId(Long userId) {
        return userRepository.findById(userId).orElse(null);
    }

    @Override
    public DocVO getDocVOByDocsId(Long docId) throws JsonProcessingException {
        Docs doc = findByDocsId(docId);
        if(doc == null) {
            return null;
        }
        return convertDocsToDocVO(doc);
    }

    private DocVO convertDocsToDocVO(Docs doc) throws JsonProcessingException {
        DocVO docVO = objectMapper.readValue(doc.getDetail(), DocVO.class);
        setServerInfoFromDoc(docVO.getServer(), doc);
        return docVO;
    }

    private void setServerInfoFromDoc(ServerVO server, Docs doc) {
        server.setBootVersion(doc.getSpringVersion());
        if(doc.getBuildManagement() == 1) {
            server.setType("maven-project");
        } else if(doc.getBuildManagement() == 2) {
            server.setType("gradle-project");
        }
        // TODO: 다른 언어 지원
        server.setLanguage("java");
        server.setBaseDir(doc.getDocsName());
        server.setGroupId(doc.getGroupPackage());
        server.setArtifactId(doc.getDocsName());
        server.setName(doc.getDocsName());
        server.setDescription(doc.getDescription() == null ? "" : doc.getDescription());
        server.setPackageName(doc.getPackageName());
        if(doc.getPackaging() == 1) {
            server.setPackaging("jar");
        } else if (doc.getPackaging() == 2) {
            server.setPackaging("war");
        }
        server.setJavaVersion(doc.getJavaVersion());
        server.setContextUri(doc.getContextUri());
    }

    @Override
    public Long saveDocGetDocId(CreateDocRequest createDocRequest) {
        Group group = Group.builder().build();
        groupRepository.save(group);
        GroupUser groupUser = GroupUser.builder().authority(1).user(findByUserId(createDocRequest.getUserId())).group(group).build();
        groupUserRepository.save(groupUser);
        createDocRequest.setGroup(group);
        return docsRepository.save(createDocRequest.toEntity()).getId();
    }

    // 암호화된 Url DB에 저장
    private void saveEncryptedUrl(Long docsId, String encryptedUrl) {
        Docs doc = findByDocsId(docsId);
        doc.setEncryptedUrl(encryptedUrl);
        Docs encryptedDoc = findByDocsId(docsId);
        docsRepository.save(encryptedDoc);
    }

    @Override
    public String encryptUrl(Long docId) throws NoSuchAlgorithmException {
        String encryptedDocId = sha256.encrypt(docId.toString());
        String encryptedUrl = encryptedDocId;
        saveEncryptedUrl(docId, encryptedUrl);
        return encryptedUrl;
    }

    @Override
    public List<DocListResponse> getDocs(Long userId) {
        ArrayList<DocListResponse> docListResponses = new ArrayList<>();
        User user = findByUserId(userId);
        List<GroupUser> groupUsers =  groupUserRepository.findByUser(user);
        for (GroupUser groupUser : groupUsers) {
            List<Docs> docs = docsRepository.findByGroup(groupUser.getGroup());
            for (Docs doc : docs) {
                DocListResponse docListResponse = doc.toDto(doc.getId(), doc.getDocsName(), doc.getGroup().getId(), groupUser.getUser(), groupUser.getAuthority());
                docListResponses.add(docListResponse);
            }
        }
        return docListResponses;
    }

    @Override
    public UpdateDocDto updateDoc(Long docId, UpdateDocDto updateDocDto) {
        Docs doc = findByDocsId(docId);
        doc.setServerUrl(updateDocDto.getServerUrl());
        doc.setContextUri(updateDocDto.getContextUrl());
        doc.setJavaVersion(updateDocDto.getJavaVersion());
        doc.setSpringVersion(updateDocDto.getSpringVersion());
        doc.setBuildManagement(updateDocDto.getBuildManagement());
        doc.setGroupPackage(updateDocDto.getGroupPackage());
        doc.setPackageName(updateDocDto.getPackageName());
        doc.setPackaging(updateDocDto.getPackaging());
        docsRepository.save(doc);
        updateDocDto.setGroupId(doc.getGroup().getId());
        return updateDocDto;
    }

    @Override
    public void deleteDoc(Long docId) {
        Docs doc = findByDocsId(docId);
        docsRepository.delete(doc);
    }
}

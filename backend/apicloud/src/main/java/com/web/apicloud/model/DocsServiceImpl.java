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
import com.web.apicloud.domain.vo.ControllerVO;
import com.web.apicloud.domain.vo.DocVO;
import com.web.apicloud.domain.vo.ServerVO;
import com.web.apicloud.exception.NotFoundException;
import com.web.apicloud.exception.UnauthorizedException;
import com.web.apicloud.security.UserPrincipal;
import com.web.apicloud.util.SHA256;
import com.web.apicloud.util.TextUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.stereotype.Service;

import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@Service
public class DocsServiceImpl implements DocsService {
    private final DocsRepository docsRepository;
    private final UserRepository userRepository;
    private final GroupRepository groupRepository;
    private final GroupUserRepository groupUserRepository;

    private final SHA256 sha256;
    private final TextUtils textUtils;
    private final ObjectMapper objectMapper;

    private static final String NOT_FOUND_DOCS = "해당 API Doc을 찾을 수 없습니다.";
    private static final String NOT_FOUND_USER = "해당 유저를 찾을 수 없습니다.";
    private static final String NOT_FOUND_CONTROLLER_FOR_EXTRACT = "추출할 컨트롤러 정보가 존재하지 않습니다.";
    private static final String NOT_FOUND_DETAIL = "API Doc의 내용이 존재하지 않습니다.";

    @Override
    public Docs findByEncryptUrl(String encryptUrl) {
        return docsRepository.findByEncryptedUrl(encryptUrl).orElseThrow(() -> new NotFoundException(NOT_FOUND_DOCS));
    }

    @Override
    public Docs findByDocsId(Long docsId) {
        return docsRepository.findById(docsId).orElseThrow(() -> new NotFoundException(NOT_FOUND_DOCS));
    }

    @Override
    public User findByUserId(Long userId) {
        return userRepository.findById(userId).orElseThrow(() -> new NotFoundException(NOT_FOUND_USER));
    }

    @Override
    public DocVO getDocVOByEncryptedId(String encryptedId) {
        Docs doc = findByEncryptUrl(encryptedId);
        return convertDocsToDocVO(doc);
    }

    @Override
    public void save(Docs doc) {
        docsRepository.save(doc);
    }

    private DocVO convertDocsToDocVO(Docs doc) {
        if (doc.getDetail() == null) {
            throw new NotFoundException(NOT_FOUND_DETAIL);
        }
        try {
            DocVO docVO = objectMapper.readValue(doc.getDetail(), DocVO.class);
            if(docVO.getServer() == null) {
                docVO.setServer(new ServerVO());
            }
            setServerInfoFromDoc(docVO.getServer(), doc);
            return docVO;
        } catch (JsonProcessingException ex) {
            throw new RuntimeException(ex.getMessage());
        }
    }

    private void setServerInfoFromDoc(ServerVO server, Docs doc) {
        server.setBootVersion(doc.getSpringVersion());
        server.setType(doc.getBuildManagement());
        // TODO: 다른 언어 지원
        server.setLanguage("java");
        server.setBaseDir(doc.getDocsName());
        server.setGroupId(doc.getGroupPackage());
        server.setArtifactId(doc.getDocsName());
        server.setName(doc.getDocsName());
        server.setDescription(doc.getDescription() == null ? "" : doc.getDescription());
        server.setPackageName(doc.getPackageName());
        server.setPackaging(doc.getPackaging());
        server.setJavaVersion(doc.getJavaVersion());
        server.setContextUri(doc.getContextUri());
        server.setServerUrl(doc.getServerUrl());
    }

    @Override
    public Long saveDocGetDocId(CreateDocRequest createDocRequest) {
        String secretKey;
        while (true) {
            secretKey = RandomStringUtils.randomAlphanumeric(6);
            Optional<Group> secretKeyGroup = groupRepository.findByGroupSecretKey(secretKey);
            if(!secretKeyGroup.isPresent()) break;
        }
        Group group = Group.builder().groupSecretKey(secretKey).build();
        groupRepository.save(group);
        GroupUser groupUser = GroupUser.builder().authority(1).user(findByUserId(createDocRequest.getUserId())).group(group).build();
        groupUserRepository.save(groupUser);
        createDocRequest.setGroup(group);
        return docsRepository.save(createDocRequest.toValidEntity()).getId();
    }

    // 암호화된 Url DB에 저장
    private void saveEncryptedUrl(Long docsId, String encryptedUrl) {
        Docs doc = findByDocsId(docsId);
        doc.setEncryptedUrl(encryptedUrl);
        Docs encryptedDoc = findByDocsId(docsId);
        docsRepository.save(encryptedDoc);
    }

    @Override
    public String encryptUrl(Long docId) {
        try {
            String encryptedDocId = sha256.encrypt(docId.toString());
            String encryptedUrl = encryptedDocId;
            saveEncryptedUrl(docId, encryptedUrl);
            return encryptedUrl;
        } catch (NoSuchAlgorithmException ex) {
            throw new RuntimeException(ex.getMessage());
        }
    }

    @Override
    public List<DocListResponse> getDocs(Long userId) {
        ArrayList<DocListResponse> docListResponses = new ArrayList<>();
        User user = findByUserId(userId);
        List<GroupUser> groupUsers = groupUserRepository.findByUser(user);
        for (GroupUser groupUser : groupUsers) {
            List<Docs> docs = docsRepository.findByGroup(groupUser.getGroup());
            for (Docs doc : docs) {
                DocListResponse docListResponse = doc.toDto(doc.getId(), doc.getDocsName(), doc.getGroup().getId(), groupUser.getUser(), groupUser.getAuthority(), doc.getEncryptedUrl());
                docListResponses.add(docListResponse);
            }
        }
        return docListResponses;
    }

    @Override
    public UpdateDocDto getDoc(String encryptedDocId) {
        Docs doc = docsRepository.findByEncryptedUrl(encryptedDocId).orElseThrow(()->new NotFoundException(NOT_FOUND_DOCS));
        UpdateDocDto updateDocDto = doc.toUpdateDocDto();
        return updateDocDto;
    }

    @Override
    public UpdateDocDto updateDoc(Long docId, UpdateDocDto updateDocDto) {
        Docs doc = findByDocsId(docId);
        String docsName = TextUtils.getValidDocsName(updateDocDto.getDocsName());
        String contextUri = TextUtils.getValidUri(updateDocDto.getContextUri());
        String groupPackage = TextUtils.getValidGroupPackage(updateDocDto.getGroupPackage());
        String packageName = TextUtils.getValidPackageName(docsName, groupPackage, updateDocDto.getPackageName());
        doc.setDocsName(docsName);
        doc.setServerUrl(updateDocDto.getServerUrl());
        doc.setContextUri(contextUri);
        doc.setJavaVersion(updateDocDto.getJavaVersion());
        doc.setSpringVersion(updateDocDto.getSpringVersion());
        doc.setBuildManagement(updateDocDto.getBuildManagement());
        doc.setGroupPackage(groupPackage);
        doc.setPackageName(packageName);
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

    @Override
    public byte[] getCsvFile(List<ControllerVO> controllers) {
        StringBuffer csvContent = new StringBuffer();
        if (controllers == null) {
            throw new NotFoundException(NOT_FOUND_CONTROLLER_FOR_EXTRACT);
        }
        controllers.forEach(controller -> {
            csvContent.append("controller name,common uri\n");
            csvContent.append(controller.getName()).append(",").append(controller.getCommonUri()).append("\n");
            csvContent.append("name,uri,method,query,parameters,requestBody,success,fail\n");
            controller.getApis().forEach(api -> {
                csvContent.append(api.getName()).append(",")
                        .append(api.getUri()).append(",")
                        .append(api.getMethod()).append(",")
                        .append("\"").append(textUtils.makeTextFromProperties(api.getQueries())).append("\"").append(",")
                        .append("\"").append(textUtils.makeTextFromProperties(api.getParameters())).append("\"").append(",")
                        .append("\"").append(textUtils.makeTextFromProperty(api.getRequestBody())).append("\"").append(",")
                        .append("\"").append(textUtils.makeTextFromResponse(api.getResponses().get("success"))).append("\"").append(",")
                        .append("\"").append(textUtils.makeTextFromResponse(api.getResponses().get("fail"))).append("\"").append("\n");
            });
            csvContent.append("\n");
        });

        return csvContent.toString().getBytes();
    }

    public void checkAuthority(UserPrincipal userPrincipal, String encryptedUrl) {
        Docs doc = findByEncryptUrl(encryptedUrl);
        List<GroupUser> groupUsers = groupUserRepository.findByGroup(doc.getGroup());
        if (userPrincipal == null || groupUsers.stream().noneMatch(groupUser -> Objects.equals(groupUser.getUser().getId(), userPrincipal.getId()))) {
            throw new UnauthorizedException("허가되지 않은 사용자입니다.");
        }
    }
}

package com.web.apicloud.model;

import com.web.apicloud.domain.dto.CreateDocRequest;
import com.web.apicloud.domain.dto.DocListResponse;
import com.web.apicloud.domain.dto.UpdateDocDto;
import com.web.apicloud.domain.entity.Docs;
import com.web.apicloud.domain.entity.User;
import com.web.apicloud.domain.vo.ControllerVO;
import com.web.apicloud.domain.vo.DocVO;
import com.web.apicloud.security.UserPrincipal;

import java.util.List;

public interface DocsService {

    Docs findByEncryptUrl(String encryptUrl);

    Docs findByDocsId(Long docsId);

    User findByUserId(Long userId);

    Long saveDocGetDocId(CreateDocRequest createDocDto);

    String encryptUrl(Long docId);

    List<DocListResponse> getDocs(Long userId);

    UpdateDocDto getDoc(String encryptedDocId);

    DocVO getDocVOByEncryptedId(String encryptedId);

    UpdateDocDto updateDoc(Long docId, UpdateDocDto updateDocDto);

    void deleteDoc(Long docId);

    byte[] getCsvFile(List<ControllerVO> docVOByDocsId);

    void save(Docs doc);

    void checkAuthority(UserPrincipal userPrincipal, String encryptedUrl);
}

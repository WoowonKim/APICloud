package com.web.apicloud.model;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.web.apicloud.domain.dto.CreateDocRequest;
import com.web.apicloud.domain.dto.DocListResponse;
import com.web.apicloud.domain.dto.UpdateDocDto;
import com.web.apicloud.domain.entity.Docs;
import java.security.NoSuchAlgorithmException;
import java.util.List;
import com.web.apicloud.domain.entity.User;
import com.web.apicloud.domain.vo.ControllerVO;
import com.web.apicloud.domain.vo.DocVO;

public interface DocsService {
    Docs findByDocsId(Long docsId);

    User findByUserId(Long userId);

    Long saveDocGetDocId(CreateDocRequest createDocDto);

    String encryptUrl(Long docId) throws NoSuchAlgorithmException;

    List<DocListResponse> getDocs(Long userId);

    DocVO getDocVOByDocsId(Long docId) throws JsonProcessingException;
    
    UpdateDocDto updateDoc(Long docId, UpdateDocDto updateDocDto);

    void deleteDoc(Long docId);

    byte[] getExcelFile(List<ControllerVO> docVOByDocsId);
}

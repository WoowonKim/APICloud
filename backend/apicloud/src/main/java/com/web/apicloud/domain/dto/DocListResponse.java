package com.web.apicloud.domain.dto;

import com.web.apicloud.domain.entity.User;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DocListResponse {
    private Long docId;

    private String docName;

    private Long groupId;

    private User groupUser;

    private Integer authority;
}

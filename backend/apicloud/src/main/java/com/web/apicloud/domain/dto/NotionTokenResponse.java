package com.web.apicloud.domain.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class NotionTokenResponse {
    private String token;
    private String duplicatedTemplateId;
}
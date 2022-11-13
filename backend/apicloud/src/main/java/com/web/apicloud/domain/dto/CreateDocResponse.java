package com.web.apicloud.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class CreateDocResponse {
    private String encryptedUrl;
}

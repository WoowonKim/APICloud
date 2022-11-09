package com.web.apicloud.domain.dto;

import lombok.Builder;
import lombok.Data;

@Data
public class DetailResponse {

    private String detail;

    @Builder
    public DetailResponse(String detail) {
        this.detail = detail;
    }

}

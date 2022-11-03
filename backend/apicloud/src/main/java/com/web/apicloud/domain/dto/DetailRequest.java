package com.web.apicloud.domain.dto;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class DetailRequest {

    private String detail;

    @Builder
    public DetailRequest(String detail) {
        this.detail = detail;
    }

}

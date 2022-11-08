package com.web.apicloud.domain.dto;

import lombok.Getter;

@Getter
public class SynchronizeRequest {

    private Long docId;

    private Integer controllerId;

    private String name;
}

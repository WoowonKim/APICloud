package com.example.test.vo;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class ControllerVO {

    private String name;

    private String commonUri;

    private List<ApiVO> apis;
}
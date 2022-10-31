package com.example.test.vo;

import lombok.Data;

import java.util.List;

@Data
public class DocVO {

    private ServerVO server;

    private List<ControllerVO> controllers;
}
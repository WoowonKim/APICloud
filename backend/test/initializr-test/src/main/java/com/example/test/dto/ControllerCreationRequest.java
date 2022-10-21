package com.example.test.dto;

import lombok.Data;

import java.util.List;

@Data
public class ControllerCreationRequest {
    List<ControllerDto> controllerDtoList;
}

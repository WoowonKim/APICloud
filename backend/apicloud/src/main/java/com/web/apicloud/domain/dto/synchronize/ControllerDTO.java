package com.web.apicloud.domain.dto.synchronize;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ControllerDTO {

    private String name;

    private String commonUri;

    private List<ApiDTO> apis;

    private boolean commonUriFlag;
}

package com.web.apicloud.domain.dto.synchronize;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ResponseDTO {

    private Integer status;

    private PropertyDTO responseBody;

    private Integer statusFlag;
}

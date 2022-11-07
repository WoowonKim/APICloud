package com.billow.domain.dto.program;

import lombok.*;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RandomProgramResponse {

    private Long id;

    private String posterImg;
}
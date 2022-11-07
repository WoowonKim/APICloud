package com.billow.domain.dto.program;

import lombok.*;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class OttResponse {

    private String name;

    private String url;

    private String imgUrl;
}
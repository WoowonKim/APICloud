package com.billow.domain.dto.addtion;

import lombok.*;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ChatRequest {

    private Long programId;

    private String content;
}
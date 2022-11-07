package com.billow.domain.dto.addtion;

import lombok.*;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ChatResponse {

    private String userNickName;

    private String userProfile;

    private String content;

    private String regDateTime;
}
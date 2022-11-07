package com.billow.domain.dto.user;

import lombok.*;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class LoginResponse {

    private String email;

    private String name;

    private String nickName;

    private String authToken;

    private String refreshToken;
}
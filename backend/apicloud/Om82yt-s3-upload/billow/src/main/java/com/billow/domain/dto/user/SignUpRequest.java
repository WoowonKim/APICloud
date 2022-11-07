package com.billow.domain.dto.user;

import lombok.*;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class SignUpRequest {

    private String email;

    private String name;

    private String nickName;

    private String gender;

    private Integer age;

    private String region;

    private String tvCarrier;

    private Long profileImgId;

    private String mobile;
}
package com.web.apicloud.domain.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class UserAuthorityVO {

    private Long userId;

    private Integer authority;

}

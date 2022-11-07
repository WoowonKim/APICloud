package com.billow.domain.dto.addtion;

import lombok.*;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AlarmRequest {
    
    private Long programOrganizationId;
}
package com.billow.domain.dto.organization;

import lombok.*;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class OrganizationListResponse {

    private String day;

    private List<OrganizationResponse> organizationResponseList;
}
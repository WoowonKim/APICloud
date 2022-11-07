package com.billow.domain.dto.addtion;

import lombok.*;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RatingRequest {

    private Float score;

    private RatingRequest ratingRequest;
}
package com.billow.domain.dto.addtion;

import lombok.*;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RatingResponse {

    private Long id;

    private String posterImg;

    private String title;

    private Long ratingId;

    private Float score;
}
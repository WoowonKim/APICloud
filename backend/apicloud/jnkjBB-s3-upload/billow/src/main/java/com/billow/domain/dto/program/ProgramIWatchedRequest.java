package com.billow.domain.dto.program;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProgramIWatchedRequest {

    String who;

    String genre;

    Long programId;
}
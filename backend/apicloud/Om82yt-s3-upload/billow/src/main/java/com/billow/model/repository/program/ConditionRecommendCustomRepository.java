package com.billow.model.repository.program;

import java.util.List;

public interface ConditionRecommendCustomRepository {

    List<Long> findTop3ByWithWhomAndGenre(String who, String genre);
}
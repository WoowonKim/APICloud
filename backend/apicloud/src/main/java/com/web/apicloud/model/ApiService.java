package com.web.apicloud.model;

import com.web.apicloud.domain.dto.DetailResponse;

public interface ApiService {

    public DetailResponse getDetailById(Long id);

    public DetailResponse updateDetailById(Long id, String detail);

}

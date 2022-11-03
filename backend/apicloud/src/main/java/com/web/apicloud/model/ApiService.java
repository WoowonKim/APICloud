package com.web.apicloud.model;

public interface ApiService {
    public String getDetailById(Long id);
    public String updateDetailById(Long id, String detail);
}

package com.web.apicloud.model;

import java.io.IOException;

public interface SynchronizeService {
    Object getFile(String root, String name) throws IOException;
}

package com.web.apicloud.model;

import com.web.apicloud.domain.entity.Group;
import com.web.apicloud.domain.repository.GroupRepository;
import com.web.apicloud.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class GroupServiceImpl implements GroupService {

    private static final String NOT_FOUND_GROUP = "해당 Group을 찾을 수 없습니다.";

    private final GroupRepository groupRepository;

    @Override
    public Group findById(Long groupId) {
        return groupRepository.findById(groupId).orElseThrow(() -> new NotFoundException(NOT_FOUND_GROUP));
    }
}

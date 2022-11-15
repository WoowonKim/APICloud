package com.web.apicloud.model;

import com.web.apicloud.domain.entity.Group;
import com.web.apicloud.domain.entity.GroupUser;
import com.web.apicloud.domain.entity.User;
import com.web.apicloud.domain.repository.GroupRepository;
import com.web.apicloud.domain.repository.GroupUserRepository;
import com.web.apicloud.domain.repository.UserRepository;
import com.web.apicloud.domain.vo.UserAuthorityVO;
import com.web.apicloud.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class GroupUserServiceImpl implements GroupUserService {

    private final GroupUserRepository groupUserRepository;
    private final GroupRepository groupRepository;
    private final UserRepository userRepository;

    @Override
    public void registerUser(Group group, UserAuthorityVO userAuthorityVO) {
        GroupUser groupUser = GroupUser.builder()
                .group(groupRepository.findById(group.getId()).orElseThrow(() -> new NotFoundException("그룹이 존재하지 않습니다.")))
                .authority(userAuthorityVO.getAuthority())
                .user(userRepository.findById(userAuthorityVO.getUserId()).orElseThrow(() -> new NotFoundException("존재하지 않는 유저입니다.")))
                .build();
        groupUserRepository.save(groupUser);
    }

    @Override
    public void updateUserAuthority(Group group, UserAuthorityVO userAuthorityVO) {
        User user = userRepository.findById(userAuthorityVO.getUserId()).orElseThrow(() -> new NotFoundException("존재하지 않는 유저입니다."));
        GroupUser groupUser = groupUserRepository.findByGroupAndUser(group,user).orElseThrow(() -> new NotFoundException("존재하지 않는 구성원입니다."));
        groupUser.changeAuthority(userAuthorityVO.getAuthority());
        groupUserRepository.save(groupUser);
    }

    @Override
    public GroupUser getGroupUserByGroupAndUser(Group group, User user) {
        return groupUserRepository.findByGroupAndUser(group,user).orElseThrow(() -> new NotFoundException("존재하지 않는 구성원입니다."));
    }

    @Override
    public List<GroupUser> getGroupUserByGroup(Group group) {
        return groupUserRepository.findByGroup(group);
    }

    @Override
    public void deleteUser(Group group, User user) {
        groupUserRepository.deleteByGroupAndUser(group, user);
    }
}

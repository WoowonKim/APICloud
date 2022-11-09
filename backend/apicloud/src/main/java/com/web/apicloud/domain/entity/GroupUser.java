package com.web.apicloud.domain.entity;

import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "tb_group_user")
@Entity
public class GroupUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "group_user_id")
    private Long id;

    @NotNull
    private Integer authority;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "group_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Group group;

    public void changeAuthority(Integer authority) {
        this.authority = authority;
    }

    @Builder
    public GroupUser(Long id, Integer authority, User user, Group group) {
        this.id = id;
        this.authority = authority;
        this.user = user;
        this.group = group;
    }
}
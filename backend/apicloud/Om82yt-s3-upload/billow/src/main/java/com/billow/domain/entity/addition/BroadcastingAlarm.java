package com.billow.domain.entity.addition;

import com.billow.domain.entity.organization.ProgramOrganization;
import com.billow.domain.entity.user.User;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "tb_broadcasting_alarm")
@Entity
public class BroadcastingAlarm {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "broadcasting_alarm_id")
    private Long id;

    @NotNull
    private String groupId;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "program_organization_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private ProgramOrganization programOrganization;

    @Builder
    public BroadcastingAlarm(Long id, String groupId, User user, ProgramOrganization programOrganization) {
        this.id = id;
        this.groupId = groupId;
        this.user = user;
        this.programOrganization = programOrganization;
    }
}
package com.billow.domain.entity.organization;

import com.billow.domain.entity.program.Program;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "tb_program_organization")
@Entity
public class ProgramOrganization {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "program_organization_id")
    private Long id;

    @NotNull
    private String broadcastingDay;

    @NotNull
    private Date broadcastingTime;

    private String broadcastingEpisode;

    private String broadcastingAge;

    private String broadcastingRerun;

    @NotNull
    private String broadcastingStation;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "program_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Program program;

    @Builder
    public ProgramOrganization(Long id, String broadcastingDay, Date broadcastingTime, String broadcastingEpisode, String broadcastingAge, String broadcastingRerun, String broadcastingStation, Program program) {
        this.id = id;
        this.broadcastingDay = broadcastingDay;
        this.broadcastingTime = broadcastingTime;
        this.broadcastingEpisode = broadcastingEpisode;
        this.broadcastingAge = broadcastingAge;
        this.broadcastingRerun = broadcastingRerun;
        this.broadcastingStation = broadcastingStation;
        this.program = program;
    }
}
package com.billow.domain.entity.addition;

import com.billow.domain.entity.program.Program;
import com.billow.domain.entity.user.User;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "tb_chat")
@Entity
public class Chat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "chat_id")
    private Long id;

    @NotNull
    private String content;

    @NotNull
    private String dateTime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "program_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Program program;

    @Builder
    public Chat(Long id, String content, String dateTime, User user, Program program) {
        this.id = id;
        this.content = content;
        this.dateTime = dateTime;
        this.user = user;
        this.program = program;
    }
}
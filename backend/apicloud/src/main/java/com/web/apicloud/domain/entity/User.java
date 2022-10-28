package com.web.apicloud.domain.entity;

import com.web.apicloud.model.AuthProvider;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

@Getter
@NoArgsConstructor
@Table(name = "tb_user")
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    @NotNull
    @Email
    @Column(unique = true)
    private String email;

    @NotNull
    private String name;

    @NotNull
    @Enumerated(EnumType.STRING)
    private AuthProvider provider;

    private String providerId;

    @Builder
    public User(Long id, String email, String name, AuthProvider provider, String providerId) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.provider = provider;
        this.providerId = providerId;
    }

    public void setName(String name) {
        this.name = name;
    }
}
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

    private String imageUrl;
    @Builder
    public User(Long id, String email, String name, AuthProvider provider, String providerId, String imageUrl) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.provider = provider;
        this.providerId = providerId;
        this.imageUrl = imageUrl;
    }

    public void updateUser(String name, String imageUrl) {
        this.name = name;
        this.imageUrl = imageUrl;
    }
}
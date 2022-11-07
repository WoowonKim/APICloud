package com.billow.model.repository.addition;

import com.billow.domain.entity.addition.Chat;
import com.billow.domain.entity.program.Program;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatRepository extends JpaRepository<Chat, Long> {
    List<Chat> findByProgram(Program program);
}
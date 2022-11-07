package com.billow.model.repository.user;

import com.billow.domain.entity.user.Bookmark;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {
    List<Bookmark> findByUser_Id(Long userId);

    Optional<Bookmark> findByUser_IdAndProgram_Id(Long userId, Long programId);
}
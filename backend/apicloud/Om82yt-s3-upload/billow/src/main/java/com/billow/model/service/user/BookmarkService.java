package com.billow.model.service.user;

import com.billow.domain.dto.user.BookmarkResponse;
import com.billow.domain.entity.program.Program;
import com.billow.domain.entity.user.Bookmark;
import com.billow.domain.entity.user.User;
import com.billow.exception.DuplicationException;
import com.billow.exception.NotFoundException;
import com.billow.model.repository.program.ProgramRepository;
import com.billow.model.repository.user.BookmarkRepository;
import com.billow.model.repository.user.UserRepository;
import com.billow.util.Message;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class BookmarkService {

    private static final String PROGRAM_NOT_FOUND = "해당 프로그램을 찾을 수 없습니다.";
    private static final String USER_NOT_FOUND = "해당 유저를 찾을 수 없습니다.";
    private static final String BOOKMARK_NOT_FOUND = "해당 즐겨찾기를 찾을 수 없습니다.";
    private static final String BOOKMARK_ALREADY_REGISTERED = "이미 즐겨찾기에 담겼습니다.";
    private static final String BOOKMARK_ZERO = "담긴 즐겨찾기가 없습니다.";

    private final BookmarkRepository bookmarkRepository;
    private final ProgramRepository programRepository;
    private final UserRepository userRepository;

    public List<BookmarkResponse> selectBookmark(Long userId) {
        List<Bookmark> list = bookmarkRepository.findByUser_Id(userId);
        if (list.size() == 0) {
            throw new NotFoundException(BOOKMARK_ZERO);
        }
        return bookmarkRepository.findByUser_Id(userId)
                .stream()
                .map(bookmark -> BookmarkResponse.builder()
                        .bookmarkId(bookmark.getId())
                        .programId(bookmark.getProgram().getId())
                        .title(bookmark.getProgram().getTitle())
                        .age(bookmark.getProgram().getAge())
                        .summary(bookmark.getProgram().getSummary())
                        .broadcastingDay(bookmark.getProgram().getBroadcastingDay())
                        .broadcastingEpisode(bookmark.getProgram().getBroadcastingEpisode())
                        .broadcastingStation(bookmark.getProgram().getBroadcastingStation())
                        .endFlag(bookmark.getProgram().isEndFlag())
                        .averageRating(bookmark.getProgram().getAverageRating())
                        .bookmarkCnt(bookmark.getProgram().getBookmarkCnt())
                        .ratingCnt(bookmark.getProgram().getRatingCnt())
                        .posterImg(bookmark.getProgram().getPosterImg())
                        .backdropPath(bookmark.getProgram().getBackdropPath())
                        .build())
                .collect(Collectors.toList());
    }

    public Message postBookmark(Long userId, Long programId) {
        Program program = programRepository.findById(programId)
                .orElseThrow(() -> new NotFoundException(PROGRAM_NOT_FOUND));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));

        List<Bookmark> bookmarks = bookmarkRepository.findByUser_Id(userId);
        for (Bookmark b : bookmarks) {
            if (b.getProgram() == program) {
                throw new DuplicationException(BOOKMARK_ALREADY_REGISTERED);
            }
        }

        Bookmark bookmark = Bookmark.builder()
                .user(user)
                .program(program)
                .build();
        program.addBookmark();
        bookmarkRepository.save(bookmark);
        return new Message("프로그램을 즐겨찾기에 담았습니다.");
    }

    public Message deleteBookmark(Long userId, Long programId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
        Bookmark bookmark = bookmarkRepository.findByUser_IdAndProgram_Id(userId, programId)
                .orElseThrow(() -> new NotFoundException(BOOKMARK_NOT_FOUND));
        bookmark.getProgram().deleteBookmark();
        bookmarkRepository.delete(bookmark);
        return new Message("프로그램을 즐겨찾기에서 삭제했습니다.");
    }

    public Boolean selectUserBookmark(Long userId, Long programId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
        Bookmark bookmark = bookmarkRepository.findByUser_IdAndProgram_Id(userId, programId)
                .orElseThrow(() -> new NotFoundException(BOOKMARK_NOT_FOUND));
        return true;
    }
}
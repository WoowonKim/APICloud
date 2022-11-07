package com.billow.model.service.addtion;

import com.billow.domain.dto.addtion.ReviewRequest;
import com.billow.domain.dto.addtion.ReviewResponse;
import com.billow.domain.entity.addition.Review;
import com.billow.domain.entity.program.Program;
import com.billow.domain.entity.user.User;
import com.billow.exception.BadRequestException;
import com.billow.exception.NotFoundException;
import com.billow.model.repository.addition.ReviewRepository;
import com.billow.model.repository.program.ProgramRepository;
import com.billow.model.repository.user.UserRepository;
import com.billow.util.DateUtil;
import com.billow.util.Message;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class ReviewService {

    private static final String PROGRAM_NOT_FOUND = "해당 프로그램을 찾을 수 없습니다.";
    private static final String USER_NOT_FOUND = "해당 유저를 찾을 수 없습니다.";
    private static final String REVIEW_NOT_FOUND = "해당 리뷰를 찾을 수 없습니다.";
    private static final String BAD_REQUEST = "잘못된 접근입니다.";

    private final ReviewRepository reviewRepository;
    private final ProgramRepository programRepository;
    private final UserRepository userRepository;

    public List<ReviewResponse> selectReview(Long programId) {
        return reviewRepository.findByProgramId(programId)
                .stream()
                .map(review -> ReviewResponse.builder()
                        .reviewId(review.getId())
                        .userNickName(review.getUser().getNickName())
                        .userProfile(review.getUser().getProfileImg().getUrl())
                        .content(review.getContent())
                        .regDateTime(review.getDateTime())
                        .build())
                .collect(Collectors.toList());
    }

    public Message postReview(Long userId, Long programId, ReviewRequest reviewRequest) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
        Program program = programRepository.findById(programId)
                .orElseThrow(() -> new NotFoundException(PROGRAM_NOT_FOUND));
        Date date = new Date();
        String dateTime = DateUtil.toReviewDate(date);

        Review review = Review.builder()
                .user(user)
                .program(program)
                .content(reviewRequest.getContent())
                .dateTime(dateTime)
                .build();
        reviewRepository.save(review);
        return new Message("프로그램 리뷰 등록에 성공하였습니다.");
    }

    public Message updateReview(Long userId, Long reviewId, ReviewRequest reviewRequest) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new NotFoundException(REVIEW_NOT_FOUND));
        if (!review.getUser().equals(user)) {
            throw new BadRequestException(BAD_REQUEST);
        }
        review.updateReview(reviewRequest.getContent());
        reviewRepository.save(review);
        return new Message("프로그램 리뷰 수정에 성공하였습니다.");
    }

    public Message deleteReview(Long userId, Long reviewId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new NotFoundException(REVIEW_NOT_FOUND));
        if (!review.getUser().equals(user)) {
            throw new BadRequestException(BAD_REQUEST);
        }
        reviewRepository.delete(review);
        return new Message("프로그램 리뷰 삭제에 성공하였습니다.");
    }
}
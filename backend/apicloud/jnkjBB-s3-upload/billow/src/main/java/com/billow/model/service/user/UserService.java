package com.billow.model.service.user;

import com.billow.domain.dto.addtion.RatingRequest;
import com.billow.domain.dto.addtion.RatingResponse;
import com.billow.domain.dto.user.*;
import com.billow.domain.entity.addition.Rating;
import com.billow.domain.entity.user.ProfileImg;
import com.billow.domain.entity.user.Region;
import com.billow.domain.entity.user.TvCarrier;
import com.billow.domain.entity.user.User;
import com.billow.exception.*;
import com.billow.jwt.JwtTokenProvider;
import com.billow.model.repository.addition.RatingRepository;
import com.billow.model.repository.user.ProfileImgRepository;
import com.billow.model.repository.user.RegionRepository;
import com.billow.model.repository.user.TvCarrierRepository;
import com.billow.model.repository.user.UserRepository;
import com.billow.util.Message;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Service
public class UserService {

    private static final String EMAIL_NOT_FOUND = "이메일 수집에 동의해주세요.";
    private static final String NICKNAME_DUPLICATED = "이미 등록된 닉네임입니다.";
    private static final String USER_NOT_FOUND = "해당 유저를 찾을 수 없습니다.";
    private static final String RATING_NOT_FOUND = "해당 평점을 찾을 수 없습니다.";
    private static final String BAD_REQUEST = "잘못된 요청입니다.";
    private static final String TOKEN_NOT_VALID = "토큰 정보가 올바르지 않습니다.";
    private static final String PROFILE_IMG_NOT_FOUND = "프로필 이미지를 찾을 수 없습니다.";
    private static final String NO_RATING = "남기신 평점이 없습니다!";
    private static final String RE_LOGIN = "다시 로그인 해주세요";


    private final UserRepository userRepository;
    private final RatingRepository ratingRepository;
    private final RegionRepository regionRepository;
    private final TvCarrierRepository tvCarrierRepository;
    private final ProfileImgRepository profileImgRepository;

    public UserResponse selectUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
        return UserResponse.builder()
                .email(user.getEmail())
                .name(user.getName())
                .nickName(user.getNickName())
                .gender(user.getGender())
                .age(user.getAge())
                .region(user.getRegion().getRegion())
                .tvCarrier(user.getTvCarrier().getCompany())
                .mobile(user.getMobile())
                .profileId(user.getProfileImg().getId())
                .profileImgUrl(user.getProfileImg().getUrl())
                .build();
    }

    public LoginResponse kakaoLogin(SignUpRequest signUpRequest) {
        if (signUpRequest.getEmail() == null) {
            throw new NotFoundException(EMAIL_NOT_FOUND);
        } else {
            User user = userRepository.findByEmail(signUpRequest.getEmail());
            if (user == null) {
                user = new User(signUpRequest.getEmail(), signUpRequest.getName());
                userRepository.save(user);
            }
            String authToken = JwtTokenProvider.createAuthToken(user.getId(), user.getEmail(), user.getName());
            String refreshToken = JwtTokenProvider.createRefreshToken();

            saveRefreshToken(user.getEmail(), refreshToken);

            return LoginResponse.builder()
                    .email(user.getEmail())
                    .name(user.getName())
                    .nickName(user.getNickName())
                    .authToken(authToken)
                    .refreshToken(refreshToken)
                    .build();
        }
    }

    public Message validateNickname(String nickname) {
        if (userRepository.existsByNickName(nickname)) {
            throw new DuplicationException(NICKNAME_DUPLICATED);
        }
        return new Message("사용 가능한 닉네임입니다.");
    }

    public Message signUp(SignUpRequest signUpRequest) {
        User user = userRepository.findByEmail(signUpRequest.getEmail());
        if (!user.getName().equals(signUpRequest.getName())) {
            throw new BadRequestException(BAD_REQUEST);
        }
        Region region = regionRepository.findByRegion(signUpRequest.getRegion());
        TvCarrier tvCarrier = tvCarrierRepository.findByCompany(signUpRequest.getTvCarrier());
        ProfileImg profileImg = profileImgRepository.findById(signUpRequest.getProfileImgId())
                .orElseThrow(() -> new NotFoundException(PROFILE_IMG_NOT_FOUND));

        user.postProfile(
                signUpRequest.getNickName(),
                signUpRequest.getGender(),
                signUpRequest.getAge(),
                region,
                tvCarrier,
                profileImg,
                signUpRequest.getMobile()
        );
        userRepository.save(user);
        return new Message("회원가입이 성공하였습니다.");
    }

    public AuthTokenResponse refresh(String email, String refreshToken) {
        User user = userRepository.findByEmail(email);
        if (refreshToken == null) {
            throw new WrongAccessException(RE_LOGIN);
        }
        // 데이터베이스에 있는 리프레시 토큰과 같은지 판단
        if (!user.getRefreshToken().equals(refreshToken)) {
            throw new WrongFormException(TOKEN_NOT_VALID);
        }
        // 리프레시 토큰도 만료되었는지 판단
        if (JwtTokenProvider.validateRefreshToken(refreshToken)) {
            return AuthTokenResponse.builder()
                    .authToken(JwtTokenProvider.createAuthToken(user.getId(), user.getEmail(), user.getName()))
                    .build();
        }
        throw new WrongAccessException(RE_LOGIN);
    }

    public Message logout(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
        user.deleteRefreshToken();
        userRepository.save(user);
        return new Message("로그아웃에 성공하였습니다.");
    }

    public Message updateUser(Long userId, UserUpdateRequest userUpdateRequest) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
        Region region = regionRepository.findByRegion(userUpdateRequest.getRegion());
        TvCarrier tvCarrier = tvCarrierRepository.findByCompany(userUpdateRequest.getTvCarrier());
        ProfileImg profileImg = profileImgRepository.findById(userUpdateRequest.getProfileImgId())
                .orElseThrow(() -> new NotFoundException(PROFILE_IMG_NOT_FOUND));

        user.postProfile(
                userUpdateRequest.getNickName(),
                userUpdateRequest.getGender(),
                userUpdateRequest.getAge(),
                region,
                tvCarrier,
                profileImg,
                userUpdateRequest.getMobile()
        );
        userRepository.save(user);
        return new Message("회원정보 수정에 성공하였습니다.");
    }

    public Message deleteUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
        userRepository.delete(user);
        return new Message("회원 탈퇴에 성공했습니다.");
    }

    public List<RatingResponse> selectRating(Long userId) {
        userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
        List<Rating> list = ratingRepository.findByUser_Id(userId);
        if (list.size() == 0) {
            throw new NotFoundException(NO_RATING);
        }
        return ratingRepository.findByUser_Id(userId)
                .stream()
                .map(rating -> RatingResponse.builder()
                        .id(rating.getProgram().getId())
                        .posterImg(rating.getProgram().getPosterImg())
                        .title(rating.getProgram().getTitle())
                        .ratingId(rating.getId())
                        .score(rating.getScore())
                        .build())
                .collect(Collectors.toList());
    }

    public Message updateRating(Long userId, Long ratingId, RatingRequest ratingRequest) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
        Rating rating = ratingRepository.findById(ratingId)
                .orElseThrow(() -> new NotFoundException(RATING_NOT_FOUND));
        if (!user.equals(rating.getUser())) {
            throw new BadRequestException(BAD_REQUEST);
        }
        rating.updateRating(ratingRequest.getScore());
        ratingRepository.save(rating);

        return new Message("회원님의 평점내역 수정에 성공하였습니다.");
    }

    public Message deleteRating(Long userId, Long ratingId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
        Rating rating = ratingRepository.findById(ratingId)
                .orElseThrow(() -> new NotFoundException(RATING_NOT_FOUND));
        if (!user.equals(rating.getUser())) {
            throw new BadRequestException(BAD_REQUEST);
        }
        rating.getProgram().updateAverageRatingByDelete(rating.getScore());
        ratingRepository.delete(rating);

        return new Message("회원님의 평점내역 삭제에 성공하였습니다.");
    }

    private void saveRefreshToken(String email, String refreshToken) {
        User user = userRepository.findByEmail(email);
        user.saveRefreshToken(refreshToken);
        userRepository.save(user);
    }

    public Optional<User> findById(Long userId) {
        return userRepository.findById(userId);
    }
}
package com.web.apicloud.security.oauth2;

import com.web.apicloud.domain.entity.User;
import com.web.apicloud.domain.repository.UserRepository;
import com.web.apicloud.exception.OAuth2AuthenticationProcessingException;
import com.web.apicloud.model.AuthProvider;
import com.web.apicloud.security.UserPrincipal;
import com.web.apicloud.security.oauth2.user.OAuth2UserInfo;
import com.web.apicloud.security.oauth2.user.OAuth2UserInfoFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Optional;

/*
OAuth2 로그인 성공 이후 가져온 사용자의 정보들을 기반으로 가입 및 정보 수정, 세션 저장 등
 */
@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest oAuth2UserRequest) throws OAuth2AuthenticationException {
        // DefaultOAuth2UserService의 loadUser로 유저 정보 가져오기
        OAuth2User oAuth2User = super.loadUser(oAuth2UserRequest);
        try {
            //받은 user 정보로 작업 수행
            return processOAuth2User(oAuth2UserRequest, oAuth2User);
        } catch (AuthenticationException ex) {
            throw ex;
        } catch (Exception ex) {
            throw new InternalAuthenticationServiceException(ex.getMessage(), ex.getCause());
        }
    }

    private OAuth2User processOAuth2User(OAuth2UserRequest oAuth2UserRequest, OAuth2User oAuth2User) {
        //OAuthUserInfoFactory로 부터 OAuth2UserInfo객체 생성
        OAuth2UserInfo oAuth2UserInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(
                oAuth2UserRequest
                        .getClientRegistration()
                        .getRegistrationId(),
                oAuth2User.getAttributes());

        if (oAuth2UserInfo.getEmail().isEmpty()) {//전달 받은 회원정보에 Email이 없는 경우
            throw new OAuth2AuthenticationProcessingException("Email not found from OAuth2 provider");
        }
        //레포지토리 DB에서 Email로 등록된 회원이 있는지 찾기
        Optional<User> userOptional = userRepository.findByEmail(oAuth2UserInfo.getEmail());
        User user;
        if (userOptional.isPresent()) { //계정 정보가 DB에 존재
            user = userOptional.get();
            //저장된 유저가 가입한 소셜과 현재 로그인 요청의 소셜 서비스가 동일하지 않은 경우
            if (!user.getProvider().equals(AuthProvider.valueOf(oAuth2UserRequest.getClientRegistration().getRegistrationId()))) {
                throw new OAuth2AuthenticationProcessingException("Looks like you're signed up with " +
                        user.getProvider() + " account. Please use your " + user.getProvider() +
                        " account to login.");
            }
            //성공시 바뀐 정보 업데이트
            user = updateExistingUser(user, oAuth2UserInfo);
        } else {
            //DB에 없는 회원이라면 새로운 회원객체 생성
            user = registerNewUser(oAuth2UserRequest, oAuth2UserInfo);
        }
        return UserPrincipal.create(user, oAuth2User.getAttributes());
    }

    private User registerNewUser(OAuth2UserRequest oAuth2UserRequest, OAuth2UserInfo oAuth2UserInfo) {
//        User user = new User();
        User user = User.builder()
                .provider(AuthProvider.valueOf(oAuth2UserRequest.getClientRegistration().getRegistrationId()))
                .providerId(oAuth2UserInfo.getId())
                .name(oAuth2UserInfo.getName())
                .email(oAuth2UserInfo.getEmail())
                .build();
        return userRepository.save(user);
    }

    private User updateExistingUser(User existingUser, OAuth2UserInfo oAuth2UserInfo) {
        existingUser.setName(oAuth2UserInfo.getName());
        return userRepository.save(existingUser);
    }

}
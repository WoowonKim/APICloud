package com.billow.jwt;

import com.billow.exception.BadRequestException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.regex.Pattern;

@Slf4j
@RequiredArgsConstructor
public class JwtAuthInterceptor implements HandlerInterceptor {

    private static final Pattern DATA_REQUEST = Pattern.compile("/api/data/[a-zA-Z0-9]*");
    private static final Pattern CHAT_REQUEST = Pattern.compile("/api/chat/[0-9]*");
    private static final Pattern REVIEW_REQUEST = Pattern.compile("/api/review/[a-zA-Z0-9]*");
    private static final Pattern PROGRAM_REQUEST = Pattern.compile("/api/program/[a-zA-Z0-9]*");
    private static final Pattern PROFILE_REQUEST = Pattern.compile("/api/profile/[0-9]*");

    private static final String HEADER = "Auth-access";
    private static final String NO_TOKEN = "재로그인이 필요합니다.";

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
//        String requestURI = request.getRequestURI();
//        String requestMethod = request.getMethod();
//        log.info("요청 URI: " + requestURI);
//        log.info("요청 Method:" + requestMethod);
//        if (DATA_REQUEST.matcher(requestURI).matches() && HttpMethod.GET.matches(requestMethod)
//                || CHAT_REQUEST.equals(requestURI) && HttpMethod.GET.matches(requestMethod)
//                || REVIEW_REQUEST.matcher(requestURI).matches() && HttpMethod.GET.matches(requestMethod)
//                || PROGRAM_REQUEST.matcher(requestURI).matches() && HttpMethod.GET.matches(requestMethod)
//                || PROFILE_REQUEST.matcher(requestURI).matches()
//                || requestURI.equals("/api/users/oauth")
//                || requestURI.equals("/api/users/signup")
//                || requestURI.equals("/api/users/refresh")
//                || requestURI.equals("/api/recommend/new")
//                || requestURI.equals("/api/recommend/popular")
//                || requestURI.equals("/api/recommend/onair")
//                || requestURI.matches("/api/organization/[0-9]*")
//                || requestURI.equals("/api/program/random")
//                || requestURI.matches("/api/program/cast/[0-9]")
//                || requestURI.equals("/api/program")
//                || requestURI.equals("/api/users/validation/nickname")
//        ) {
//            log.info("JWT 토큰 없이 요청 가능");
//            return true;
//        }
//        log.info("JWT 토큰 검증 시작");
//        String token = request.getHeader(HEADER);
//        if (token == null) {
//            log.info("토큰이 없습니다. -> 재로그인 요청");
//            throw new BadRequestException(NO_TOKEN);
//        }
//        if (JwtTokenProvider.validateToken(token)) {
//            return true;
//        }
        return true;
    }
}
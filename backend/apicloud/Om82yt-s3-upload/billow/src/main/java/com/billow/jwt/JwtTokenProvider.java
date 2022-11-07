package com.billow.jwt;

import com.billow.exception.UnauthorizedException;
import com.billow.exception.WrongAccessException;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Base64;
import java.util.Date;

// 토큰을 생성해주고 검증하는 등 토큰 관리 객체
@Slf4j
@RequiredArgsConstructor
@Component
public class JwtTokenProvider implements InitializingBean {

    private static final String SECRET = "ssafy second project B309 Billow";
    private static final long EXPIRATION = 1000 * 60 * 60 * 2L;
    private static final String EXPIRED_TOKEN = "토큰이 만료되었습니다. 리프레시 토큰을 주세요.";
    private static final String RE_LOGIN = "다시 로그인 해주세요!";

    private static Key key;

    @Override
    public void afterPropertiesSet() throws Exception {  // init()
        String encodedKey = Base64.getEncoder().encodeToString(SECRET.getBytes());
        key = Keys.hmacShaKeyFor(encodedKey.getBytes());
    }

    public static String createAuthToken(Long id, String email, String name) {
        return create(id, email, name, "Auth-access",
                EXPIRATION
        );
    }

    public static String createRefreshToken() {
        return create(null, null, null, "refreshToken",
                EXPIRATION * 5
        );
    }

    public static Long getUserId(String token) {
        return ((Number) getAllClaims(token).get("id")).longValue();
    }

    private static String create(Long id, String email, String name, String subject, long expiration) {
        final JwtBuilder builder = Jwts.builder()
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .claim("id", id)
                .claim("email", email)
                .claim("name", name)
                .signWith(SignatureAlgorithm.HS256, key);
        final String jwt = builder.compact();
        if (email == null) {
            log.info("리프레시 토큰 발행: {}", jwt);
        } else {
            log.info("auth 토큰 발행: {}", jwt);
        }
        return jwt;
    }

    private static Claims getAllClaims(String token) {
        return Jwts.parser()
                .setSigningKey(key)
                .parseClaimsJws(token)
                .getBody();
    }

    public static boolean validateToken(String token) {
        try {
            Jws<Claims> claims = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token);
            return !claims.getBody().getExpiration().before(new Date());
        } catch (ExpiredJwtException e) {
            log.info("액세스 토큰 만료");
            throw new UnauthorizedException(EXPIRED_TOKEN);
        } catch (JwtException | IllegalArgumentException e) {
            log.info("JwtException, IllegalArgumentException");
            throw new WrongAccessException(RE_LOGIN);
        }
    }

    public static boolean validateRefreshToken(String token) {
        try {
            Jws<Claims> claims = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token);
            return !claims.getBody().getExpiration().before(new Date());
        } catch (ExpiredJwtException e) {
            log.info("리프레시 토큰 만료");
            throw new WrongAccessException(RE_LOGIN);
        } catch (JwtException | IllegalArgumentException e) {
            log.info("JwtException, IllegalArgumentException");
            throw new WrongAccessException(RE_LOGIN);
        }
    }
}
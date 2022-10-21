package com.web.trackingtest.util;

import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.util.ContentCachingRequestWrapper;
import org.springframework.web.util.ContentCachingResponseWrapper;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
class CustomServletWrappingFilter extends OncePerRequestFilter {
    //OncePerRequestFilter를 상속받아 request당 한번의 실행만 되도록 보장
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        //HttpServletRequest의 InputStream은 한번 읽으면 다시 읽을 수 없으므로
        //Wrapper 객체를 하나 만든 후 InputStream을 읽고, 다른 곳에서 InputStream을 다시 읽으려고 시도하는 경우
        //이미 읽었던 데이터로 다시 InputStream을 생성해 돌려주도록 만드는 방법
        ContentCachingRequestWrapper wrappingRequest = new ContentCachingRequestWrapper((HttpServletRequest) request);
        ContentCachingResponseWrapper wrappingResponse = new ContentCachingResponseWrapper((HttpServletResponse) response);
        filterChain.doFilter(wrappingRequest, wrappingResponse);

        //실제 response body에 값 할당, 이 코드를 실행하지 않으면 client가 아무 응답도 받지 못함.
        wrappingResponse.copyBodyToResponse();
    }
}
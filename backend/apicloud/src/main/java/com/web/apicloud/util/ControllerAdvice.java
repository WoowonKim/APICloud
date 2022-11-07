//package com.web.apicloud.util;
//
//import com.web.apicloud.exception.*;
//import com.web.apicloud.exception.NullPointerException;
//import io.jsonwebtoken.ExpiredJwtException;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.http.HttpStatus;
//import org.springframework.web.bind.annotation.ExceptionHandler;
//import org.springframework.web.bind.annotation.ResponseStatus;
//import org.springframework.web.bind.annotation.RestControllerAdvice;
//
//@Slf4j
//@RestControllerAdvice
//public class ControllerAdvice {
//
//    @ResponseStatus(HttpStatus.NOT_FOUND)
//    @ExceptionHandler(NotFoundException.class)
//    public Message NotFoundException(RuntimeException runtimeException) {
//        log.info(runtimeException.getMessage());
//        return new Message(runtimeException.getMessage());
//    }
//
//    @ResponseStatus(HttpStatus.CONFLICT)
//    @ExceptionHandler(DuplicationException.class)
//    public Message DuplicationException(RuntimeException runtimeException) {
//        log.info(runtimeException.getMessage());
//        return new Message(runtimeException.getMessage());
//    }
//
//    @ResponseStatus(HttpStatus.BAD_REQUEST)
//    @ExceptionHandler({BadRequestException.class, NotEqualException.class, WrongFormException.class})
//    public Message BadRequestException(RuntimeException runtimeException) {
//        log.info(runtimeException.getMessage());
//        return new Message(runtimeException.getMessage());
//    }
//
//    @ResponseStatus(HttpStatus.FORBIDDEN)
//    @ExceptionHandler(WrongAccessException.class)
//    public Message WrongAccessException(RuntimeException runtimeException) {
//        log.info(runtimeException.getMessage());
//        return new Message(runtimeException.getMessage());
//    }
//
//    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
//    @ExceptionHandler(NullPointerException.class)
//    public Message NullPointerException(RuntimeException runtimeException) {
//        log.info(runtimeException.getMessage());
//        return new Message(runtimeException.getMessage());
//    }
//
//
//    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
//    @ExceptionHandler(InternalServerErrorException.class)
//    public Message InternalServerErrorException(RuntimeException runtimeException) {
//        log.info(runtimeException.getMessage());
//        return new Message(runtimeException.getMessage());
//    }
//
//    @ResponseStatus(HttpStatus.BAD_REQUEST)
//    @ExceptionHandler({RuntimeException.class, Exception.class})
//    public Message commonException(Exception e) {
//        log.info(e.getMessage());
//        return new Message("오류가 발생했습니다.");
//    }
//
//    @ResponseStatus(HttpStatus.UNAUTHORIZED)
//    @ExceptionHandler({ExpiredJwtException.class, UnauthorizedException.class})
//    public Message UnauthorizedException(RuntimeException runtimeException) {
//        log.info(runtimeException.getMessage());
//        return new Message((runtimeException.getMessage()));
//    }
//}

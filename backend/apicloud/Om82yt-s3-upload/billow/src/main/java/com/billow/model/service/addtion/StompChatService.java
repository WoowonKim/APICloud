package com.billow.model.service.addtion;

import com.billow.domain.dto.addtion.ChatRequest;
import com.billow.domain.dto.addtion.ChatResponse;
import com.billow.domain.entity.addition.Chat;
import com.billow.domain.entity.program.Program;
import com.billow.domain.entity.user.User;
import com.billow.exception.NotFoundException;
import com.billow.model.repository.addition.ChatRepository;
import com.billow.model.repository.program.ProgramRepository;
import com.billow.model.repository.user.UserRepository;
import com.billow.util.DateUtil;
import com.billow.util.Message;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.Date;

@RequiredArgsConstructor
@Service
public class StompChatService {

    private static final String PROGRAM_NOT_FOUND = "해당 프로그램을 찾을 수 없습니다.";
    private static final String USER_NOT_FOUND = "해당 유저를 찾을 수 없습니다.";

    private final SimpMessagingTemplate template;
    private final ChatRepository chatRepository;
    private final UserRepository userRepository;
    private final ProgramRepository programRepository;

    public Message sendMessage(Long userId, ChatRequest chatRequest) {
        Program program = programRepository.findById(chatRequest.getProgramId())
                .orElseThrow(() -> new NotFoundException(PROGRAM_NOT_FOUND));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));

        Date date = new Date();
        String dateTime = DateUtil.toReviewDate(date);

        Chat chat = Chat.builder()
                .user(user)
                .program(program)
                .content(chatRequest.getContent())
                .dateTime(dateTime)
                .build();
        chatRepository.save(chat);

        ChatResponse castResponse = ChatResponse.builder()
                .userNickName(chat.getUser().getNickName())
                .userProfile(chat.getUser().getProfileImg().getUrl())
                .content(chat.getContent())
                .regDateTime(chat.getDateTime())
                .build();

        template.convertAndSend("/sub/chat/program/" + chatRequest.getProgramId(), castResponse);
        return new Message("메시지 전송 성공");
    }
}
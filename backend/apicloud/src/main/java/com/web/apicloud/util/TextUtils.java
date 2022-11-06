package com.web.apicloud.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.web.apicloud.domain.vo.PropertyVO;
import com.web.apicloud.domain.vo.ResponseVO;
import com.web.apicloud.exception.InternalServerErrorException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class TextUtils {
    private final ObjectMapper objectMapper;

    public StringBuffer makeTextFromProperties(List<PropertyVO> properties) {
        StringBuffer text = new StringBuffer();
        if(properties == null) {
            return text;
        }
        properties.forEach(property -> {
            text.append(makeTextFromProperty(property)).append("\n");
        });
        return text;
    }

    public String makeTextFromProperty(PropertyVO property) {
        String text = "";
        if(property == null) {
            return text;
        }
        try {
            text += objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(property);
        } catch (JsonProcessingException e) {
            throw new InternalServerErrorException("변환에 실패햐였습니다.");
        }
        return text.replace("\"", "");
    }

    public StringBuffer makeTextFromResponse(ResponseVO response) {
        StringBuffer text = new StringBuffer();
        if(response == null) {
            return text;
        }
        return text.append("status: ").append(response.getStatus()).append("\n")
                .append(makeTextFromProperty(response.getResponseBody()));
    }
}

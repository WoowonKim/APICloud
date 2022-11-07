package com.billow.model.service.addtion;

import com.billow.domain.entity.organization.ProgramOrganization;
import com.billow.exception.BadRequestException;
import com.billow.util.DateUtil;
import net.nurigo.java_sdk.api.Message;
import net.nurigo.java_sdk.exceptions.CoolsmsException;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.HashMap;

@Service
public class MessageService {

    private static final String ALRAM_MESSAGE_ERROR = "방영 알림 메시지 처리 중 오류 발생";

    @Value("${coolsms.apikey}")
    private String apiKey;

    @Value("${coolsms.apisecret}")
    private String apiSecret;

    @Value("${coolsms.fromnumber}")
    private String fromNumber;

    public String sendMessage(String toNumber, ProgramOrganization programOrganization) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(programOrganization.getBroadcastingTime());
        calendar.add(Calendar.MINUTE, -15);
        String dateTime = DateUtil.toAlarmDate(calendar.getTime());

        Message coolsms = new Message(apiKey, apiSecret);
        HashMap<String, String> params = new HashMap<String, String>();
        params.put("to", toNumber);
        params.put("from", fromNumber);
        params.put("type", "LMS");
        params.put("text", "[BILLOW]\n알림 예약하신 [" + programOrganization.getProgram().getTitle() + "] 방영 15분 전입니다.\n" +
                "방영 시간 : " + DateUtil.toAlarmString(programOrganization.getBroadcastingTime()) + " " + programOrganization.getBroadcastingDay() + "\n" +
                "방영 채널 : " + programOrganization.getBroadcastingStation());
        params.put("datetime", dateTime);
        try {
            JSONObject result = (JSONObject) coolsms.send(params);
            return (String) result.get("group_id");
        } catch (CoolsmsException e) {
            throw new BadRequestException(ALRAM_MESSAGE_ERROR);
        }
    }

    public void cancleMessage(String groupId) {
        Message coolsms = new Message(apiKey, apiSecret);
        HashMap<String, String> params = new HashMap<String, String>();
        params.put("gid", groupId);
        try {
            JSONObject result = coolsms.cancel(params);
        } catch (CoolsmsException e) {
            throw new BadRequestException(ALRAM_MESSAGE_ERROR);
        }
    }
}
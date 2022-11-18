package com.web.apicloud.model;

import com.web.apicloud.domain.dto.NotionTokenResponse;
import com.web.apicloud.domain.vo.ApiVO;
import com.web.apicloud.domain.vo.ControllerVO;
import com.web.apicloud.domain.vo.DocVO;
import com.web.apicloud.exception.NotFoundException;
import com.web.apicloud.util.TextUtils;
import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;
import org.jraf.klibnotion.client.*;
import org.jraf.klibnotion.client.future.FutureNotionClient;
import org.jraf.klibnotion.client.future.FutureNotionClientUtils;
import org.jraf.klibnotion.model.base.reference.DatabaseReference;
import org.jraf.klibnotion.model.base.reference.PageReference;
import org.jraf.klibnotion.model.block.MutableBlockList;
import org.jraf.klibnotion.model.database.Database;
import org.jraf.klibnotion.model.page.Page;
import org.jraf.klibnotion.model.property.value.PropertyValueList;
import org.jraf.klibnotion.model.richtext.Annotations;
import org.jraf.klibnotion.model.richtext.RichText;
import org.jraf.klibnotion.model.richtext.RichTextList;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ExecutionException;

@RequiredArgsConstructor
@Service
public class NotionServiceImpl implements NotionService {
    private final TextUtils textUtils;

    private static final String NOT_FOUND_CONTROLLER_FOR_EXTRACT = "추출할 컨트롤러 정보가 존재하지 않습니다.";

    @Value("${notion-clientSecret}")
    private String clientSecret;

    @Value("${notion-clientId}")
    private String clientId;

    @Value("${notion-redirectUri}")
    private String redirectUri;

    public void makeApiPage(String token, String databaseId, DocVO doc) {
        if(doc.getControllers() == null) {
            throw new NotFoundException(NOT_FOUND_CONTROLLER_FOR_EXTRACT);
        }
        FutureNotionClient client = initClient(token);
        RichTextList richTextList = new RichTextList();
        richTextList.text(doc.getServer().getName() + " api docs", Annotations.DEFAULT);
        try {
            client.getDatabases().updateDatabase(
                    databaseId,
                    richTextList,
                    null,
                    null,
                    null
            ).get();
        } catch (ExecutionException | InterruptedException e) {
            throw new RuntimeException(e);
        }
        for(ControllerVO controller : doc.getControllers()) {
            String controllerName = controller.getName();
            String commonUri = controller.getCommonUri();
            for(ApiVO api : controller.getApis()) {
                try {
                    client.getPages().createPage(
                            new DatabaseReference(databaseId),
                            null, // Emoji
                            null, // File
                            new PropertyValueList()
                                    .selectByName("controller", controllerName)
                                    .text("common uri", commonUri)
                                    .title("name", api.getName())
                                    .text("uri", api.getUri())
                                    .selectByName("method", api.getMethod())
                                    .text("query", textUtils.makeTextFromProperties(api.getQueries()).toString())
                                    .text("parameter", textUtils.makeTextFromProperties(api.getParameters()).toString())
                                    .text("requestBody", textUtils.makeTextFromProperty(api.getRequestBody()))
                                    .text("success", textUtils.makeTextFromResponse(api.getResponses().get("success")).toString())
                                    .text("fail", textUtils.makeTextFromResponse(api.getResponses().get("fail")).toString()),
                            (MutableBlockList) null
                    ).get();
                } catch (InterruptedException | ExecutionException e) {
                    throw new RuntimeException(e);
                }
            }
        }

        client.close();
    }

    private FutureNotionClient initClient(String token) {
        NotionClient notionClient = NotionClient.newInstance(
                new ClientConfiguration(
                        new Authentication(token),
                        new HttpConfiguration(
                                // Uncomment to see more logs
                                // loggingLevel = HttpLoggingLevel.BODY,
                                HttpLoggingLevel.INFO,
                                null,
                                // This is only needed to debug with, e.g., Charles Proxy
                                null
                        )
                )
        );
        return FutureNotionClientUtils.asFutureNotionClient(notionClient);
    }

    public NotionTokenResponse getAccessToken(String token) {
        Map<String, String> params = new HashMap<>();
        params.put("grant_type", "authorization_code");
        params.put("code", token);
        params.put("redirect_uri", redirectUri);
        WebClient client = WebClient.builder()
                .baseUrl("https://api.notion.com/v1/oauth/token")
                .defaultHeader("Authorization", "Basic "+ Base64.getEncoder().encodeToString((clientId+":"+clientSecret).getBytes()))
                .defaultHeader("Content-Type", "application/json")
                .build();
        Map<String, String> response = client.post().body(Mono.just(params), Map.class).retrieve().bodyToMono(Map.class).block();
        return NotionTokenResponse.builder()
                .token(response.get("access_token"))
                .duplicatedTemplateId(response.get("duplicated_template_id")).build();
    }
}

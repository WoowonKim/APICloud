package com.web.apicloud.model;

import com.web.apicloud.domain.vo.ApiVO;
import com.web.apicloud.domain.vo.ControllerVO;
import com.web.apicloud.domain.vo.DocVO;
import com.web.apicloud.exception.NotFoundException;
import com.web.apicloud.util.TextUtils;
import lombok.RequiredArgsConstructor;
import org.jraf.klibnotion.client.*;
import org.jraf.klibnotion.client.future.FutureNotionClient;
import org.jraf.klibnotion.client.future.FutureNotionClientUtils;
import org.jraf.klibnotion.model.base.reference.DatabaseReference;
import org.jraf.klibnotion.model.base.reference.PageReference;
import org.jraf.klibnotion.model.block.MutableBlockList;
import org.jraf.klibnotion.model.database.Database;
import org.jraf.klibnotion.model.page.Page;
import org.jraf.klibnotion.model.property.value.PropertyValueList;
import org.springframework.stereotype.Service;

import java.util.Random;
import java.util.concurrent.ExecutionException;

@RequiredArgsConstructor
@Service
public class NotionServiceImpl implements NotionService {
    // TODO: database.parent 활용해서 프로젝트 제목, contextUri 등 설정하기

    private final TextUtils textUtils;

    private static final String NOT_FOUND_CONTROLLER_FOR_EXTRACT = "추출할 컨트롤러 정보가 존재하지 않습니다.";

    public void makeApiPage(String token, String databaseId, DocVO doc) {
        if(doc.getControllers() == null) {
            throw new NotFoundException(NOT_FOUND_CONTROLLER_FOR_EXTRACT);
        }
        FutureNotionClient client = initClient(token);
        for(ControllerVO controller : doc.getControllers()) {
            String controllerName = controller.getName();
            String commonUri = controller.getCommonUri();
            for(ApiVO api : controller.getApis()) {
                try {
                    Page createdPageInDatabase = client.getPages().createPage(
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
}

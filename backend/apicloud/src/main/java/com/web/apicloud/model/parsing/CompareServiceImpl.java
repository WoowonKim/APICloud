package com.web.apicloud.model.parsing;

import com.web.apicloud.domain.dto.synchronize.ApiDTO;
import com.web.apicloud.domain.dto.synchronize.ControllerDTO;
import com.web.apicloud.domain.dto.synchronize.PropertyDTO;
import com.web.apicloud.domain.dto.synchronize.ResponseDTO;
import com.web.apicloud.domain.vo.ApiVO;
import com.web.apicloud.domain.vo.ControllerVO;
import com.web.apicloud.domain.vo.PropertyVO;
import com.web.apicloud.domain.vo.ResponseVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@Service
public class CompareServiceImpl implements CompareService {
    @Override
    public ControllerDTO compareControllerVO(ControllerVO original, ControllerVO controllerVO) {
        ControllerDTO controllerDTO = ControllerMapper.INSTANCE.ControllerVOToControllerDTO(controllerVO);
        System.out.println("==> " + controllerDTO);

        if (equals(original.getCommonUri(), controllerVO.getCommonUri())) {
            controllerDTO.setCommonUriFlag(true);
        }

        if (controllerVO.getApis() == null) return controllerDTO;
        for (int i = 0; i < controllerVO.getApis().size(); i++) {
            if (original.getApis() == null || original.getApis().size() <= i) {
                controllerDTO.getApis().get(i).setCreateFlag(true);
                continue;
            }
            compareApiVO(controllerDTO.getApis().get(i), original.getApis().get(i), controllerVO.getApis().get(i));
        }
        return controllerDTO;
    }

    private void compareApiVO(ApiDTO apiDTO, ApiVO original, ApiVO apiVO) {
        if (equals(original.getMethod(), apiVO.getMethod())) {
            apiDTO.setMethodFlag(true);
        }

        if (equals(original.getUri(), apiVO.getUri())) {
            apiDTO.setUriFlag(true);
        }

        if (apiVO.getRequestBody() == null) return;
        comparePropertyVO(apiDTO.getRequestBody(), original.getRequestBody(), apiVO.getRequestBody());

        if (apiVO.getParameters() == null) return;
        for (int i = 0; i < apiVO.getParameters().size(); i++) {
            if (original.getParameters() == null || original.getParameters().size() <= i) {
                apiDTO.getParameters().get(i).setCreateFlag(true);
                continue;
            }
            comparePropertyVO(apiDTO.getParameters().get(i), original.getParameters().get(i), apiVO.getParameters().get(i));
        }

        if (apiVO.getQueries() == null) return;
        for (int i = 0; i < apiVO.getQueries().size(); i++) {
            if (original.getQueries() == null || original.getQueries().size() <= i) {
                apiDTO.getQueries().get(i).setCreateFlag(true);
                continue;
            }
            comparePropertyVO(apiDTO.getQueries().get(i), original.getQueries().get(i), apiVO.getQueries().get(i));
        }

        if (apiVO.getResponses() == null) return;
        compareResponseVO(apiDTO.getResponses(), original.getResponses(), apiVO.getResponses());
    }

    private void compareResponseVO(Map<String, ResponseDTO> responses, Map<String, ResponseVO> original, Map<String, ResponseVO> responseVO) {
        PropertyVO originalPropertyVO = original.get("success").getResponseBody();
        PropertyVO responseVOPropertyVO = responseVO.get("success").getResponseBody();
        PropertyDTO responseDTO = responses.get("success").getResponseBody();
        if (originalPropertyVO == null && responseVOPropertyVO == null) return;
        if (originalPropertyVO == null) {
            responses.get("success").setCreateFlag(true);
            return;
        }
        comparePropertyVO(responseDTO, originalPropertyVO, responseVOPropertyVO);
    }

    private void comparePropertyVO(PropertyDTO propertyDTO, PropertyVO original, PropertyVO propertyVO) {
        if (original == null && propertyVO == null) return;
        if (propertyVO == null) return;
        if (original == null) {
            propertyDTO.setCreateFlag(true);
            return;
        }

        if (equals(original.getDtoName(), propertyVO.getDtoName())) {
            propertyDTO.setDtoNameFlag(true);
        }

        if (equals(original.getName(), propertyVO.getName())) {
            propertyDTO.setNameFlag(true);
        }

        if (equals(original.getType(), propertyVO.getType())) {
            propertyDTO.setTypeFlag(true);
        }

        if (equals(original.getCollectionType(), propertyVO.getCollectionType())) {
            propertyDTO.setCollectionTypeFlag(true);
        }

        if (original.isRequired() != propertyVO.isRequired()) {
            propertyDTO.setRequiredFlag(true);
        }

        if (propertyVO.getProperties() == null) return;
        for (int i = 0; i < propertyVO.getProperties().size(); i++) {
            if (original.getProperties() == null || original.getProperties().size() <= i) {
                propertyDTO.getProperties().get(i).setCreateFlag(true);
                continue;
            }
            comparePropertyVO(propertyDTO.getProperties().get(i), original.getProperties().get(i), propertyVO.getProperties().get(i));
        }
    }

    private boolean equals(String original, String propertyVO) {
        if (original == null && propertyVO == null) return false;
        if (original == null || propertyVO == null) return true;
        if (!original.equals(propertyVO)) return true;
        return false;
    }
}

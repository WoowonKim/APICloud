package com.web.apicloud.model.parsing;

import com.web.apicloud.domain.dto.synchronize.ApiDTO;
import com.web.apicloud.domain.dto.synchronize.ControllerDTO;
import com.web.apicloud.domain.vo.ApiVO;
import com.web.apicloud.domain.vo.ControllerVO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = "spring")
public interface ControllerMapper {
    ControllerMapper INSTANCE = Mappers.getMapper(ControllerMapper.class);

    @Mappings({
            @Mapping(source = "name", target = "name"),
            @Mapping(source = "commonUri", target = "commonUri"),
            @Mapping(source = "apis", target = "apis"),
    })
    ControllerDTO ControllerVOToControllerDTO(ControllerVO controllerVO);
}
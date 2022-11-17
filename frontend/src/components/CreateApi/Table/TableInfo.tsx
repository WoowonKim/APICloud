import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import SelectTypes from "../SelectTypes/SelectTypes";
import { handleDtoProperties } from "../validationCheck";
import "./Table.scss";
import { MappedTypeDescription } from "@syncedstore/core/types/doc";
import { ControllerType } from "../../../pages/CreateApi/ApisType";

interface Props {
  activeTab: number;
  handleBasicInfo: (
    e: React.ChangeEvent<HTMLInputElement> | string,
    type: string,
    depth: number,
    responseType: string
  ) => void;
  selectedController: number;
  selectedApi: number;
  responseType?: string;
  dtoData?: any;
  dtoExists?: boolean;
  state: MappedTypeDescription<{
    data: ControllerType[];
  }>;
}

const TableInfo = ({
  activeTab,
  handleBasicInfo,
  selectedApi,
  selectedController,
  responseType,
  dtoData,
  dtoExists,
  state,
}: Props) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (
      state.data[selectedController].apis[selectedApi].requestBody.type !==
      "Object"
    ) {
      state.data[selectedController].apis[selectedApi].requestBody.type =
        "Object";
    }
  }, []);
  useEffect(() => {
    if (responseType === "fail" || responseType === "success") {
      if (
        !state.data[selectedController].apis[selectedApi].responses[
          responseType
        ]?.responseBody
      ) {
        state.data[selectedController].apis[selectedApi].responses[
          responseType
        ] = {
          status: responseType === "fail" ? 400 : 200,
          responseBody: {
            dtoName: "",
            name: "",
            type: "String",
            required: true,
            collectionType: "",
            properties: [],
          },
        };
      }
    }
  }, []);
  return (
    <div>
      {activeTab === 4 ? (
        <>
          <div className="tableInfoTitleContainer">
            <div className="tableInfoNameDtoNameGroup">
              {state.data[selectedController].apis[selectedApi].requestBody
                .type === "Object" && (
                <div className="tableInfoInputGroup">
                  <label
                    htmlFor={`dtoName${activeTab}`}
                    className="tableInfoLabel"
                  >
                    dtoName
                  </label>
                  <div className="dtoInputGroup">
                    <input
                      className="dtoInput"
                      type="text"
                      id={`dtoName${activeTab}`}
                      onChange={(e) => handleBasicInfo(e, "dtoName", 1, "")}
                      value={
                        state.data[selectedController].apis[selectedApi]
                          .requestBody.dtoName !== null
                          ? state.data[selectedController].apis[selectedApi]
                              .requestBody.dtoName
                          : ""
                      }
                      placeholder="dtoName은 필수 입력값입니다"
                    />
                    {dtoExists &&
                      dtoData &&
                      dtoData.dtoName ===
                        state.data[selectedController].apis[selectedApi]
                          .requestBody.dtoName && (
                        <FontAwesomeIcon
                          icon={faCheck}
                          className="dtoCheckIcon"
                          onClick={() => setVisible(!visible)}
                        />
                      )}
                  </div>
                  {visible && dtoExists && dtoData && (
                    <div className="tableInfoDtoContainer">
                      <p className="tableInfoDtoUseInfoTitle">
                        {dtoData.dtoName}
                      </p>
                      {dtoData.properties.length > 0 &&
                        dtoData.properties.map((item: any, index: number) => (
                          <div
                            key={index}
                            className="tableInfoDtoPropertiesContainer"
                          >
                            <span className="tableInfoDtoUseInfoText">
                              {item.name}
                            </span>
                            {item.collectionType === "List" ? (
                              <span className="tableInfoDtoUseInfoText">{`<List>${item.type}`}</span>
                            ) : (
                              <span className="tableInfoDtoUseInfoText">
                                {item.type}
                              </span>
                            )}
                            <span className="tableInfoDtoUseInfoText">
                              {item.required}
                            </span>
                          </div>
                        ))}
                      <button
                        className="tableInfoUseCurrentDtoButton"
                        onClick={() => {
                          handleDtoProperties(
                            state.data[selectedController].apis[selectedApi]
                              .requestBody
                          );
                        }}
                      >
                        {dtoData.dtoName} 사용하기
                      </button>
                    </div>
                  )}
                </div>
              )}
              <div className="tableInfoGroup">
                <div className="tableInfoInputGroup">
                  <label
                    htmlFor={`name${activeTab}`}
                    className="tableInfoLabel"
                  >
                    name
                  </label>
                  <input
                    className="tableInfoInput"
                    type="text"
                    id={`name${activeTab}`}
                    onChange={(e) => handleBasicInfo(e, "name", 1, "")}
                    value={
                      state.data[selectedController].apis[selectedApi]
                        .requestBody.name !== null
                        ? state.data[selectedController].apis[selectedApi]
                            .requestBody.name
                        : ""
                    }
                    placeholder="name은 필수 입력값입니다"
                  />
                </div>
              </div>
            </div>
            <div className="tableInfoTypeRequiredContainer">
              <div className="typeInputContainer">
                <p className="tableInfoLabel">type</p>
                <p className="tableInfoTypeLabelText">
                  {
                    state.data[selectedController].apis[selectedApi].requestBody
                      .type
                  }
                </p>
              </div>
              <div className="typeInputContainer">
                <label
                  htmlFor={`required${activeTab}`}
                  className="tableInfoLabel"
                >
                  required
                </label>
                <input
                  className="apiTableCheckbox"
                  type="checkbox"
                  id={`required${activeTab}`}
                  onChange={(e) => handleBasicInfo(e, "required", 1, "")}
                  checked={
                    state.data[selectedController].apis[selectedApi].requestBody
                      .required
                      ? true
                      : false
                  }
                />
              </div>
            </div>
          </div>
          {dtoExists &&
            dtoData &&
            dtoData.dtoName ===
              state.data[selectedController].apis[selectedApi].requestBody
                .dtoName && (
              <p className="tableInfoWarningText">
                Controller 내에 동일한 DtoName이 존재합니다. 기존 Dto를
                사용하시거나 이름을 변경해주세요.
              </p>
            )}
        </>
      ) : activeTab === 5 &&
        (responseType === "fail" || responseType === "success") &&
        state.data[selectedController].apis[selectedApi].responses[responseType]
          ?.responseBody ? (
        <>
          <div className="responseTypeGroup">
            <span className="responseTypeLabel">
              {responseType} {responseType === "success" ? 200 : 400}
            </span>
          </div>
          <div className="tableInfoTitleContainer">
            <div className="tableInfoNameDtoNameGroup">
              {state.data[selectedController].apis[selectedApi].responses[
                responseType
              ]?.responseBody?.type === "Object" && (
                <div className="tableInfoInputGroup">
                  <label htmlFor="successDtoName" className="tableInfoLabel">
                    dtoName
                  </label>
                  <div className="dtoInputGroup">
                    <input
                      className="dtoInput"
                      type="text"
                      id="successDtoName"
                      onChange={(e) =>
                        handleBasicInfo(e, "dtoName", 1, responseType)
                      }
                      value={
                        state.data[selectedController].apis[selectedApi]
                          .responses[responseType].responseBody.dtoName !== null
                          ? state.data[selectedController].apis[selectedApi]
                              .responses[responseType].responseBody.dtoName
                          : ""
                      }
                      placeholder="dtoName은 필수 입력값입니다"
                    />
                    {dtoExists &&
                      dtoData &&
                      dtoData.dtoName ===
                        state.data[selectedController].apis[selectedApi]
                          .responses[responseType]?.responseBody.dtoName && (
                        <FontAwesomeIcon
                          icon={faCheck}
                          className="dtoCheckIcon"
                          onClick={() => setVisible(!visible)}
                        />
                      )}
                  </div>
                  {visible && dtoExists && dtoData && (
                    <div className="tableInfoDtoContainer">
                      <p className="tableInfoDtoUseInfoTitle">
                        {dtoData.dtoName}
                      </p>
                      {dtoData.properties.length > 0 &&
                        dtoData.properties.map((item: any, index: number) => (
                          <div
                            key={index}
                            className="tableInfoDtoPropertiesContainer"
                          >
                            <span className="tableInfoDtoUseInfoText">
                              {item.name}
                            </span>
                            {item.collectionType === "List" ? (
                              <span className="tableInfoDtoUseInfoText">{`<List>${item.type}`}</span>
                            ) : (
                              <span className="tableInfoDtoUseInfoText">
                                {item.type}
                              </span>
                            )}
                            <span className="tableInfoDtoUseInfoText">
                              {item.required}
                            </span>
                          </div>
                        ))}
                      <button
                        className="tableInfoUseCurrentDtoButton"
                        onClick={() => {
                          handleDtoProperties(
                            state.data[selectedController].apis[selectedApi]
                              .responses[responseType]?.responseBody
                          );
                          setVisible(!visible);
                        }}
                      >
                        {dtoData.dtoName} 사용하기
                      </button>
                    </div>
                  )}
                </div>
              )}
              <div className="tableInfoGroup">
                <div className="tableInfoInputGroup">
                  <label htmlFor="successName" className="tableInfoLabel">
                    name
                  </label>
                  <input
                    className="tableInfoInput"
                    type="text"
                    id="successName"
                    onChange={(e) =>
                      handleBasicInfo(e, "name", 1, responseType)
                    }
                    value={
                      state.data[selectedController].apis[selectedApi]
                        .responses[responseType].responseBody.name !== null
                        ? state.data[selectedController].apis[selectedApi]
                            .responses[responseType].responseBody.name
                        : ""
                    }
                    placeholder="name은 필수 입력값입니다"
                  />
                </div>
              </div>
            </div>

            <div className="tableInfoTypeRequiredContainer">
              <div className="typeInputContainer1">
                <p className="typeInputLabel1">type</p>
                <div className="tableInputTypeGroup">
                  {state.data[selectedController].apis[selectedApi].responses[
                    responseType
                  ].responseBody.collectionType === "List" && (
                    <SelectTypes
                      handleBasicInfo={handleBasicInfo}
                      responseType={responseType}
                      depth={1}
                      isCollection={true}
                    />
                  )}
                  <SelectTypes
                    handleBasicInfo={handleBasicInfo}
                    responseType={responseType}
                    depth={1}
                    value={
                      state.data[selectedController].apis[selectedApi]
                        .responses[responseType].responseBody.type
                    }
                  />
                </div>
              </div>
              <div className="typeInputContainer">
                <label htmlFor="successRequired" className="tableInfoLabel">
                  required
                </label>
                <input
                  type="checkbox"
                  id="successRequired"
                  onChange={(e) =>
                    handleBasicInfo(e, "required", 1, responseType)
                  }
                  className="apiTableCheckbox"
                  checked={
                    state.data[selectedController].apis[selectedApi].responses[
                      responseType
                    ].responseBody.required
                      ? true
                      : false
                  }
                />
              </div>
            </div>
          </div>
          {dtoExists &&
            dtoData &&
            dtoData.dtoName ===
              state.data[selectedController].apis[selectedApi].responses[
                responseType
              ].responseBody.dtoName && (
              <p className="tableInfoWarningText">
                Controller 내에 동일한 DtoName이 존재합니다. 기존 Dto를
                사용하시거나 이름을 변경해주세요.
              </p>
            )}
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default TableInfo;

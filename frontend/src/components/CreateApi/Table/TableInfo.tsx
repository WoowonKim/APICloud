import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSyncedStore } from "@syncedstore/react";
import { store } from "../store";
import React, { useState } from "react";
import SelectTypes from "../SelectTypes/SelectTypes";
import { handleDtoProperties } from "../validationCheck";
import "./Table.scss";

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
}

const TableInfo = ({
  activeTab,
  handleBasicInfo,
  selectedApi,
  selectedController,
  responseType,
  dtoData,
  dtoExists,
}: Props) => {
  const state = useSyncedStore(store);
  const [visible, setVisible] = useState(false);
  return (
    <div>
      {activeTab === 4 ? (
        <>
          <div className="tableInfoGroup">
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
                        .requestBody.dtoName
                    }
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
                    {dtoData.dtoName}
                    {dtoData.properties.length > 0 &&
                      dtoData.properties.map((item: any, index: number) => (
                        <div
                          key={index}
                          className="tableInfoDtoPropertiesContainer"
                        >
                          <span>{item.name}</span>
                          {item.collectionType === "List" ? (
                            <span>{`<List>${item.type}`}</span>
                          ) : (
                            <span>{item.type}</span>
                          )}
                          <span>{item.required}</span>
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
            <div className="tableInfoInputGroup">
              <label htmlFor={`name${activeTab}`} className="tableInfoLabel">
                name
              </label>
              <input
                className="tableInfoInput"
                type="text"
                id={`name${activeTab}`}
                onChange={(e) => handleBasicInfo(e, "name", 1, "")}
                value={
                  state.data[selectedController].apis[selectedApi].requestBody
                    .name
                }
              />
            </div>
            <div className="typeInputContainer">
              <p className="typeInputLabel">type</p>
              <p>
                {
                  state.data[selectedController].apis[selectedApi].requestBody
                    .type
                }
              </p>
            </div>
            <div className="tableInfoInputGroup">
              <label
                htmlFor={`required${activeTab}`}
                className="tableInfoLabel"
              >
                required
              </label>
              <input
                className="tableInfoInput"
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
        (responseType === "fail" || responseType === "success") ? (
        <>
          <div className="responseTypeGroup">
            <p className="responseTypeLabel">{responseType}</p>
            <label htmlFor="successStatus" className="tableInfoLabel">
              status
            </label>
            <p>{responseType === "success" ? 200 : 400}</p>
          </div>
          <div className="tableInfoGroup">
            {state.data[selectedController].apis[selectedApi].responses[
              responseType
            ].responseBody.type === "Object" && (
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
                        .responses[responseType].responseBody.dtoName
                    }
                  />
                  {dtoExists &&
                    dtoData &&
                    dtoData.dtoName ===
                      state.data[selectedController].apis[selectedApi]
                        .responses[responseType].responseBody.dtoName && (
                      <FontAwesomeIcon
                        icon={faCheck}
                        className="dtoCheckIcon"
                        onClick={() => setVisible(!visible)}
                      />
                    )}
                </div>
                {visible && dtoExists && dtoData && (
                  <div className="tableInfoDtoContainer">
                    {dtoData.dtoName}
                    {dtoData.properties.length > 0 &&
                      dtoData.properties.map((item: any, index: number) => (
                        <div
                          key={index}
                          className="tableInfoDtoPropertiesContainer"
                        >
                          <span>{item.name}</span>
                          {item.collectionType === "List" ? (
                            <span>{`<List>${item.type}`}</span>
                          ) : (
                            <span>{item.type}</span>
                          )}
                          <span>{item.required}</span>
                        </div>
                      ))}
                    <button
                      className="tableInfoUseCurrentDtoButton"
                      onClick={() => {
                        handleDtoProperties(
                          state.data[selectedController].apis[selectedApi]
                            .responses[responseType].responseBody
                        );
                      }}
                    >
                      {dtoData.dtoName} 사용하기
                    </button>
                  </div>
                )}
              </div>
            )}
            <div className="tableInfoInputGroup">
              <label htmlFor="successName" className="tableInfoLabel">
                name
              </label>
              <input
                className="tableInfoInput"
                type="text"
                id="successName"
                onChange={(e) => handleBasicInfo(e, "name", 1, responseType)}
                value={
                  state.data[selectedController].apis[selectedApi].responses[
                    responseType
                  ].responseBody.name
                }
              />
            </div>
            <div className="typeInputContainer">
              <p className="typeInputLabel">type</p>
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
              />
            </div>
            <div className="tableInfoInputGroup">
              <label htmlFor="successRequired" className="tableInfoLabel">
                required
              </label>
              <input
                type="checkbox"
                id="successRequired"
                onChange={(e) =>
                  handleBasicInfo(e, "required", 1, responseType)
                }
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

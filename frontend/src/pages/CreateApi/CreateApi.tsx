import React, { useEffect, useMemo, useState } from "react";
import { ApisType, ControllerType, PropertiesType } from "./ApisType";
import "./CreateApi.scss";
import Sidebar from "../../components/CreateApi/Sidebar/Sidebar";
import Table from "../../components/CreateApi/Table/Table";
import { useSyncedStore } from "@syncedstore/react";
import { connectDoc, store } from "../../components/CreateApi/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { RootState } from "../../Store/store";
import apiDocsApiSlice, { getApiDetail } from "../../Store/slice/apiDocsApi";
import ExtractModal from "./ExtractModal";
import { useLocation, useParams } from "react-router-dom";
import { useAppDispatch } from "../../Store/hooks";
import { checkDataValidation } from "../../components/CreateApi/validationCheck";

const CreateApi = () => {
  const dispatch = useAppDispatch();
  const { encryptedUrl } = useParams();
  useEffect(() => {
    if (encryptedUrl) {
      connectDoc(encryptedUrl);
    }
  }, [encryptedUrl]);

  const isOpenExtractModal = useSelector(
    (state: RootState) => state.apiDocsApi.isOpenExtractModal
  );
  // api 정보를 저장할 state
  const [apiData, setApiData] = useState<ApisType>({
    name: "",
    uri: "",
    method: "get",
    requestBody: {
      dtoName: "",
      name: "",
      type: "String",
      collectionType: "",
      properties: [],
      required: true,
    },
    parameters: [
      {
        dtoName: "",
        name: "",
        type: "String",
        required: true,
        properties: [],
        collectionType: "",
      },
    ],
    queries: [
      {
        dtoName: "",
        name: "",
        type: "String",
        required: true,
        properties: [],
        collectionType: "",
      },
    ],
    headers: [{ key: "", value: "" }],
    responses: {
      fail: {
        status: 400,
        responseBody: {
          dtoName: "",
          name: "",
          type: "String",
          collectionType: "",
          properties: [],
          required: true,
        },
      },
      success: {
        status: 200,
        responseBody: {
          dtoName: "",
          name: "",
          type: "String",
          collectionType: "",
          properties: [],
          required: true,
        },
      },
    },
  });
  // controller 정보를 저장할 state
  const [controllerData, setControllerData] = useState<ControllerType>({
    name: "",
    commonUri: "",
    apis: [],
  });

  const propertiesData: PropertiesType = {
    dtoName: "",
    name: "",
    type: "String",
    required: true,
    collectionType: "",
    properties: [],
  };

  const state = useSyncedStore(store);
  useEffect(() => {
    console.log(JSON.parse(JSON.stringify(state.data)));
  }, [state.data]);
  // 테이블의 탭 전환을 위한 state
  const [activeTab, setActiveTab] = useState(1);
  // 선택된 api,controller 저장 state
  const [selectedApi, setSelectedApi] = useState(-1);
  const [selectedController, setSelectedController] = useState(-1);

  // 추가된 api, controller index를 저장할 state
  const [addedApiIndex, setAddedApiIndex] = useState(-1);
  const [addedControllerIndex, setAddedControllerIndex] = useState(-1);

  // controller 추가/삭제 함수 -> 기존 데이터에 새 데이터 추가
  const handleController = (method: string, index?: number) => {
    if (method === "add") {
      state.data.push(controllerData);
      setAddedControllerIndex(state.data.length - 1);
    } else if (method === "delete" && typeof index === "number") {
      state.data.splice(index, 1);
    }
  };

  // api 추가 함수 -> 기존 데이터에 새 데이터 추가
  const addApi = (index: number) => {
    state.data[index].apis.push(apiData);
    setAddedApiIndex(state.data[index].apis.length);
  };

  // table의 row 추가 함수
  const addTableRow = (responseType?: "fail" | "success") => {
    if (activeTab === 1) {
      state.data[selectedController].apis[selectedApi].headers.push({
        key: "",
        value: "",
      });
    } else if (activeTab === 2 || activeTab === 3) {
      const tab = activeTab === 3 ? "queries" : "parameters";
      state.data[selectedController].apis[selectedApi][tab].push(
        propertiesData
      );
    } else if (activeTab === 4) {
      state.data[selectedController].apis[
        selectedApi
      ].requestBody.properties.push(propertiesData);
    } else if (activeTab === 5 && responseType) {
      state.data[selectedController].apis[selectedApi].responses[
        responseType
      ].responseBody.properties.push(propertiesData);
    }
  };

  const getData = (selectedController: number, selectedApi: number) => {
    return state.data[selectedController].apis[selectedApi].headers;
  };
  const data = useMemo(() => {
    if (state.data[selectedController])
      return getData(selectedController, selectedApi);
    else return [];
  }, [state.data]);
  // 사이드바의 api 정보 가져오는 함수
  const handleSidebarApi = (index: number, idx: number) => {
    setSelectedController(index);
    setSelectedApi(idx);
    setActiveTab(1);
  };
  // 데이터 확인 용 로그
  console.log(JSON.parse(JSON.stringify(state.data)));
  const location = useLocation();
  useEffect(() => {
    dispatch(getApiDetail({ docId: location.state.data.docId })).then(
      (res: any) => {
        if (res.meta.requestStatus === "fulfilled") {
          console.log(res.payload);
        }
      }
    );
  }, []);
  return (
    <div className="apiDocscontainer">
      <Sidebar
        handleController={handleController}
        addApi={addApi}
        state={state}
        handleSidebarApi={handleSidebarApi}
        selectedApi={selectedApi}
        selectedController={selectedController}
        addedApiIndex={addedApiIndex}
        addedControllerIndex={addedControllerIndex}
      />
      <div className="apiDocsMaincontainer">
        <div className="titleContainer">
          <p className="apiDocsTitleText">APICloud API 명세서</p>
          <div className="buttonContainer">
            <button
              onClick={() => {
                const test = checkDataValidation(state.data);
                console.log(test);
              }}
            >
              테스트
            </button>
            <button>공유</button>
            <button>동기화</button>
            <button
              type="button"
              onClick={() =>
                dispatch(
                  apiDocsApiSlice.actions.setIsOpenExtractModal({
                    isOpenExtractModal: true,
                  })
                )
              }
            >
              추출
            </button>
            {isOpenExtractModal && <ExtractModal></ExtractModal>}
          </div>
        </div>
        <div className="infoContainer">
          <div>
            <p>사이트 주소</p>
            <p className="infoValue">http://localhost:8080</p>
          </div>
          <div>
            <p>공통 URI</p>
            <p className="infoValue">/api</p>
          </div>
        </div>
        <div className="tabContainer">
          <div
            className={activeTab === 1 ? "tabItem active" : "tabItem"}
            onClick={() => setActiveTab(1)}
          >
            headers
          </div>
          <div
            className={activeTab === 2 ? "tabItem active" : "tabItem"}
            onClick={() => setActiveTab(2)}
          >
            parameters
          </div>
          <div
            className={activeTab === 3 ? "tabItem active" : "tabItem"}
            onClick={() => setActiveTab(3)}
          >
            queries
          </div>
          <div
            className={activeTab === 4 ? "tabItem active" : "tabItem"}
            onClick={() => setActiveTab(4)}
          >
            requestBody
          </div>
          <div
            className={activeTab === 5 ? "tabItem active" : "tabItem"}
            onClick={() => setActiveTab(5)}
          >
            responses
          </div>
        </div>
        <div className="tableContainer">
          {selectedApi > -1 && selectedController > -1 && (
            <div className="apiTable">
              <button
                className="apiPlusButton"
                onClick={() => addTableRow("success")}
              >
                <FontAwesomeIcon icon={faPlus} className="plusIcon" />
              </button>
              {state?.data.length > 0 &&
                state.data[selectedController]?.apis.length > 0 && (
                  <Table
                    activeTab={activeTab}
                    selectedController={selectedController}
                    selectedApi={selectedApi}
                    data={
                      activeTab === 1
                        ? JSON.parse(
                            JSON.stringify(
                              state.data[selectedController].apis[selectedApi]
                                .headers
                            )
                          )
                        : activeTab === 2
                        ? JSON.parse(
                            JSON.stringify(
                              state.data[selectedController].apis[selectedApi]
                                .parameters
                            )
                          )
                        : activeTab === 3
                        ? JSON.parse(
                            JSON.stringify(
                              state.data[selectedController].apis[selectedApi]
                                .queries
                            )
                          )
                        : activeTab === 4
                        ? JSON.parse(
                            JSON.stringify(
                              state.data[selectedController].apis[selectedApi]
                                .requestBody?.properties
                            )
                          )
                        : JSON.parse(
                            JSON.stringify(
                              state.data[selectedController].apis[selectedApi]
                                .responses.success.responseBody?.properties
                            )
                          )
                    }
                    responseType={"success"}
                  />
                )}
            </div>
          )}
          {selectedApi > -1 && selectedController > -1 && activeTab === 5 && (
            <div className="apiTable">
              <button
                className="apiPlusButton"
                onClick={() => addTableRow("fail")}
              >
                <FontAwesomeIcon icon={faPlus} className="plusIcon" />
              </button>
              <Table
                activeTab={activeTab}
                selectedController={selectedController}
                selectedApi={selectedApi}
                data={
                  state.data[selectedController].apis[selectedApi].responses
                    .fail.responseBody?.properties
                }
                responseType={"fail"}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateApi;

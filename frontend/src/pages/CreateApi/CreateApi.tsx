import React, { useEffect, useMemo, useState } from "react";
import { ApisType, ControllerType, PropertiesType } from "./ApisType";
import "./CreateApi.scss";
import Sidebar from "../../components/CreateApi/Sidebar/Sidebar";
import { useSyncedStore } from "@syncedstore/react";
import { connectDoc, store } from "../../components/CreateApi/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { RootState } from "../../Store/store";
import apiDocsApiSlice, {
  checkAuthority,
  getApiDetail,
  setApiDetail,
  updateSynchronizeData,
} from "../../Store/slice/apiDocsApi";
import ExtractModal from "../../components/CreateApi/ExtractModal/ExtractModal";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ErrorPage from "../ErrorPage";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import ApiTable from "../../components/CreateApi/ApiTable/ApiTable";
import SynchronizeModal from "../../components/CreateApi/SynchronizeModal/SynchronizeModal";
import { getApiDoc } from "../../Store/slice/mainApi";
import SynchronizeCode from "../../components/CreateApi/SynchronizeModal/SynchronizeCode";
import SynchroinizeData from "../../components/CreateApi/SynchronizeModal/SynchroinizeData";
import Header from "../../components/main/Header";
import { InfinitySpin } from "react-loader-spinner";
import styled from "styled-components";

const CreateApi = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { encryptedUrl } = useParams();
  const [authority, setAuthority] = useState<number>(0);
  const [isSynchronizeModal, setIsSynchronizeModal] = useState(false);
  const [changeData, setChangeData] = useState();
  const [changeCode, setChangeCode] = useState<any>();
  const [selectedChangeCode, setSelectedChangeCode] = useState(0);
  const [docInfo, setDocInfo] = useState<any>();
  const [syncData, setSyncData] = useState<any>();
  const [selectedControllerName, setSelectedControllerName] = useState("");
  const [selectedControllerIndex, setSelectedControllerIndex] = useState(-1);
  const [isSynced, setIsSynced] = useState(0);
  const [isWarningModal, setIsWarningModal] = useState(false);
  const [isLodaing, setIsLoading] = useState(true);

  useEffect(() => {
    if (!encryptedUrl) {
      return;
    }
    dispatch(checkAuthority({ encryptedUrl }))
      .then((res: any) => {
        setAuthority(res.data);
      })
      .catch((err: any) => {
        console.log(err.response.data);
        setAuthority(0);
      });
    connectDoc(encryptedUrl);
  }, [encryptedUrl]);

  const isOpenExtractModal = useSelector(
    (state: RootState) => state.apiDocsApi.isOpenExtractModal
  );
  // api 정보를 저장할 state
  const [apiData, setApiData] = useState<ApisType>({
    name: "",
    uri: "",
    method: "Get",
    requestBody: {
      dtoName: "",
      name: "",
      type: "Object",
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
  const responsesData = {
    fail: {
      status: 400,
      responseBody: {
        dtoName: "",
        name: "",
        type: "String",
        required: true,
        collectionType: "",
        properties: [],
      },
    },
    success: {
      status: 200,
      responseBody: {
        dtoName: "",
        name: "",
        type: "String",
        required: true,
        collectionType: "",
        properties: [],
      },
    },
  };
  const state = useSyncedStore(store);
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
      if (state.data[selectedController].apis[selectedApi].headers === null) {
        state.data[selectedController].apis[selectedApi].headers = [];
      }
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

  const saveChangeData = () => {
    dispatch(
      updateSynchronizeData({
        docId: docInfo.docId,
        controllerId: selectedControllerIndex,
        controllerDTO: changeData,
      })
    ).then((res: any) => {
      if (res.meta.requestStatus === "fulfilled") {
        handleGetApiDetail();
      }
    });
    setIsSynced((curr) => curr++);
  };
  // 데이터 확인 용 로그
  console.log(JSON.parse(JSON.stringify(state.data)));

  const handleGetApiDetail = () => {
    dispatch(getApiDetail({ docId: encryptedUrl })).then((res: any) => {
      if (res.meta.requestStatus === "fulfilled") {
        const detail = JSON.parse(res.payload.detail);
        if (detail && detail.controllers.length > 0) {
          state.data.splice(0);
          for (let idx = 0; idx < detail.controllers.length; idx++) {
            state.data.push(detail.controllers[idx]);
          }
        }
      }
    });
  };

  const handleSetApiDetail = () => {
    dispatch(
      setApiDetail({
        encryptedUrl: localStorage.getItem("docId"),
        detailRequest: {
          detail: JSON.stringify({
            server: { dependencies: [] },
            controllers: state.data,
          }),
        },
      })
    )
      .then((res: any) => {
        dispatch(getApiDetail({ docId: encryptedUrl })).then((res: any) => {
          if (res.meta.requestStatus === "fulfilled") {
            const detail = JSON.parse(res.payload.detail);
            if (detail && detail.controllers.length > 0) {
              if (
                state.data &&
                (state.data.length === detail.controllers.length ||
                  state.data.length < detail.controllers.length)
              ) {
                for (let idx = 0; idx < state.data.length; idx++) {
                  state.data.splice(idx, 1);
                  state.data.splice(idx, 0, detail.controllers[idx]);
                }
                if (state.data.length < detail.controllers.length) {
                  for (
                    let idx =
                      state.data.length === 0 ? 0 : state.data.length - 1;
                    idx < detail.controllers.length;
                    idx++
                  ) {
                    state.data.push(detail.controllers[idx]);
                  }
                }
              }
            }
          }
        });
      })
      .catch((err: any) => console.log(err));
  };
  useEffect(() => {
    handleGetApiDetail();
    if (encryptedUrl) {
      connectDoc(encryptedUrl);
    }
    setIsSynchronizeModal(false);
  }, [changeCode, isSynced]);

  useEffect(() => {
    return () => {
      handleSetApiDetail();
    };
  }, [encryptedUrl]);

  useEffect(() => {
    dispatch(getApiDoc({ docId: encryptedUrl })).then((res: any) => {
      if (res.meta.requestStatus === "fulfilled") {
        setDocInfo(res.payload);
      }
    });
  }, [encryptedUrl]);

  useEffect(() => {
    if (!docInfo) {
      return;
    }
  }, [docInfo]);

  const preventClose = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = "";
    handleSetApiDetail();
  };

  useEffect(() => {
    (() => {
      window.addEventListener("beforeunload", preventClose);
    })();

    return () => {
      window.removeEventListener("beforeunload", preventClose);
    };
  }, []);
  const isPending = useAppSelector((state) => state.apiDocsApi.isPending);
  const handleStart = () => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  useEffect(() => {
    handleStart();
  }, []);

  if (authority === 0) {
    return (
      <>
        <ErrorPage code="403"></ErrorPage>
      </>
    );
  } else {
    return (
      <>
        {isPending || isLodaing ? (
          <Loading>
            <InfinitySpin width="250" color="#6FC7D1" />
          </Loading>
        ) : (
          <div>
            <Header />
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
                docInfo={docInfo}
              />
              <div className="apiDocsMaincontainer">
                <div className="titleGridContainer">
                  <div className="titleContainer">
                    <p className="apiDocsTitleText">{docInfo?.docsName}</p>
                    <div className="infoContainer">
                      <p className="infoValue">{docInfo?.serverUrl}</p>
                      <p className="infoValue">{docInfo?.contextUri}</p>
                    </div>
                  </div>
                  <div className="buttonContainer">
                    <div className="createApiTitleButtonGroup">
                      <button className="createApiButton">공유</button>
                      <button
                        className="createApiButton"
                        onClick={() => {
                          setIsSynchronizeModal(!isSynchronizeModal);
                        }}
                      >
                        동기화
                      </button>
                      <button
                        className="createApiButton"
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
                    </div>
                    <div className="createApiTitleModalGroup">
                      {isOpenExtractModal && (
                        <ExtractModal
                          controllers={state.data}
                          isWarningModal={isWarningModal}
                          setIsWarningModal={setIsWarningModal}
                        />
                      )}
                      {isSynchronizeModal && (
                        <SynchronizeModal
                          setIsSynchronizeModal={setIsSynchronizeModal}
                          setChangeData={setChangeData}
                          setChangeCode={setChangeCode}
                          setSyncData={setSyncData}
                          setSelectedControllerName={setSelectedControllerName}
                          setSelectedControllerIndex={
                            setSelectedControllerIndex
                          }
                          selectedControllerIndex={selectedControllerIndex}
                          selectedControllerName={selectedControllerName}
                          isWarningModal={isWarningModal}
                          setIsWarningModal={setIsWarningModal}
                          docInfo={docInfo}
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div className="bodyGridContainer">
                  <div>
                    <div className="tabContainer">
                      <div
                        className={
                          activeTab === 1 ? "tabItem active" : "tabItem"
                        }
                        onClick={() => setActiveTab(1)}
                      >
                        headers
                      </div>
                      <div
                        className={
                          activeTab === 2 ? "tabItem active" : "tabItem"
                        }
                        onClick={() => setActiveTab(2)}
                      >
                        parameters
                      </div>
                      <div
                        className={
                          activeTab === 3 ? "tabItem active" : "tabItem"
                        }
                        onClick={() => setActiveTab(3)}
                      >
                        queries
                      </div>
                      <div
                        className={
                          activeTab === 4 ? "tabItem active" : "tabItem"
                        }
                        onClick={() => {
                          if (
                            JSON.stringify(
                              state.data[selectedController].apis[selectedApi]
                                .requestBody
                            ) === "{}"
                          ) {
                            state.data[selectedController].apis[
                              selectedApi
                            ].requestBody = {
                              dtoName: "",
                              name: "",
                              type: "Object",
                              required: true,
                              collectionType: "",
                              properties: [],
                            };
                          }
                          setActiveTab(4);
                        }}
                      >
                        requestBody
                      </div>
                      <div
                        className={
                          activeTab === 5 ? "tabItem active" : "tabItem"
                        }
                        onClick={() => {
                          if (
                            JSON.stringify(
                              state.data[selectedController].apis[selectedApi]
                                .responses
                            ) === "{}"
                          ) {
                            state.data[selectedController].apis[
                              selectedApi
                            ].responses = responsesData;
                          } else if (
                            JSON.stringify(
                              state.data[selectedController].apis[selectedApi]
                                .responses.fail
                            ) === "{}"
                          ) {
                            state.data[selectedController].apis[
                              selectedApi
                            ].responses.fail = {
                              status: 400,
                              responseBody: propertiesData,
                            };
                          } else if (
                            JSON.stringify(
                              state.data[selectedController].apis[selectedApi]
                                .responses.success
                            ) === "{}"
                          ) {
                            state.data[selectedController].apis[
                              selectedApi
                            ].responses.success = {
                              status: 200,
                              responseBody: propertiesData,
                            };
                          } else if (
                            state.data[selectedController].apis[selectedApi]
                              .responses.success?.responseBody &&
                            JSON.stringify(
                              state.data[selectedController].apis[selectedApi]
                                .responses.success.responseBody
                            ) === "{}"
                          ) {
                            state.data[selectedController].apis[
                              selectedApi
                            ].responses.success.responseBody = propertiesData;
                          } else if (
                            state.data[selectedController].apis[selectedApi]
                              .responses.fail?.responseBody &&
                            JSON.stringify(
                              state.data[selectedController].apis[selectedApi]
                                .responses.fail.responseBody
                            ) === "{}"
                          ) {
                            state.data[selectedController].apis[
                              selectedApi
                            ].responses.fail.responseBody = propertiesData;
                          }
                          setActiveTab(5);
                        }}
                      >
                        responses
                      </div>
                    </div>
                    <div className="tableContainer">
                      {selectedApi > -1 &&
                        selectedController > -1 &&
                        state?.data.length > 0 &&
                        state.data[selectedController]?.apis.length > 0 && (
                          <div className="apiTable">
                            <button
                              className="apiPlusButton"
                              onClick={() => addTableRow("success")}
                            >
                              <FontAwesomeIcon
                                icon={faPlus}
                                className="plusIcon"
                              />
                            </button>
                            <ApiTable
                              activeTab={activeTab}
                              selectedController={selectedController}
                              selectedApi={selectedApi}
                              responseType={"success"}
                            />
                          </div>
                        )}
                      {selectedApi > -1 &&
                        selectedController > -1 &&
                        state?.data.length > 0 &&
                        state.data[selectedController]?.apis.length > 0 &&
                        activeTab === 5 &&
                        state.data[selectedController].apis[selectedApi]
                          .responses?.fail && (
                          <div className="apiTable">
                            <button
                              className="apiPlusButton"
                              onClick={() => addTableRow("fail")}
                            >
                              <FontAwesomeIcon
                                icon={faPlus}
                                className="plusIcon"
                              />
                            </button>
                            <ApiTable
                              activeTab={activeTab}
                              selectedController={selectedController}
                              selectedApi={selectedApi}
                              responseType={"fail"}
                            />
                          </div>
                        )}
                    </div>
                  </div>
                  <div className="rightSideContainer">
                    {changeCode && changeCode.length > 0 && (
                      <SynchronizeCode
                        changeCode={changeCode}
                        selectedChangeCode={selectedChangeCode}
                        setSelectedChangeCode={setSelectedChangeCode}
                        setChangeCode={setChangeCode}
                      />
                    )}
                    {changeData && syncData && (
                      <SynchroinizeData
                        syncData={syncData}
                        setSyncData={setSyncData}
                        saveChangeData={saveChangeData}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
};

export const Loading = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default CreateApi;

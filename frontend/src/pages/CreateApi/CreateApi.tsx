import React, { useEffect, useState } from "react";
import "./CreateApi.scss";
import Sidebar from "../../components/CreateApi/Sidebar/Sidebar";
import { useSyncedStore } from "@syncedstore/react";
import { connect, store } from "../../components/CreateApi/store";
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
import { useParams } from "react-router-dom";
import ErrorPage from "../ErrorPage";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import ApiTable from "../../components/CreateApi/ApiTable/ApiTable";
import SynchronizeModal from "../../components/CreateApi/SynchronizeModal/SynchronizeModal";
import { getApiDoc } from "../../Store/slice/mainApi";
import SynchronizeCode from "../../components/CreateApi/SynchronizeModal/SynchronizeCode";
import SynchroinizeData from "../../components/CreateApi/SynchronizeModal/SynchroinizeData";
import { InfinitySpin } from "react-loader-spinner";
import styled from "styled-components";
import GuideModal from "../../components/CreateApi/GuideModal/GuideModal";
import MetaData from "../../components/MetaData";
import {
  apiData,
  controllerData,
  propertiesData,
  responsesData,
} from "./ApiData";

const CreateApi = () => {
  const dispatch = useAppDispatch();
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
  const [isGuideModal, setIsGuideModal] = useState(false);
  const [isViewer, setIsViewer] = useState(false);

  useEffect(() => {
    if (!encryptedUrl) {
      return;
    }
    dispatch(checkAuthority({ encryptedUrl }))
      .then((res: any) => {
        setAuthority(res.payload);
        if (res.payload === 3) {
          setIsViewer(true);
        } else {
          setIsViewer(false);
        }
      })
      .catch((err: any) => {
        setAuthority(0);
      });
  }, [encryptedUrl]);

  const isOpenExtractModal = useSelector(
    (state: RootState) => state.apiDocsApi.isOpenExtractModal
  );

  const state = useSyncedStore(store);
  const [activeTab, setActiveTab] = useState(1);
  const [selectedApi, setSelectedApi] = useState(-1);
  const [selectedController, setSelectedController] = useState(-1);
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
  // 사이드바의 api 정보 가져오는 함수
  const handleSidebarApi = (index: number, idx: number) => {
    setSelectedController(index);
    setSelectedApi(idx);
    setActiveTab(1);
  };

  const handleGetApiDetail = () => {
    dispatch(getApiDetail({ docId: encryptedUrl })).then((res: any) => {
      if (res.meta.requestStatus === "fulfilled") {
        const detail = JSON.parse(res.payload.detail);
        if (state.data.length > 0) {
          while (state.data.length !== 0) {
            state.data.splice(0);
          }
        }
        if (detail && detail.controllers.length > 0) {
          for (let idx = 0; idx < detail.controllers.length; idx++) {
            state.data.push(detail.controllers[idx]);
          }
        }
      }
    });
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
        setChangeData(undefined);
      }
    });
    setIsSynced((curr) => curr++);
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
        if (res.meta.requestStatus === "fulfilled") {
          handleGetApiDetail();
        }
      })
      .catch((err: any) => {});
  };
  useEffect(() => {
    handleGetApiDetail();
    setIsSynchronizeModal(false);
  }, [isSynced]);

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
    }, 2000);
  };

  useEffect(() => {
    handleStart();
  }, []);

  const handleTableNullValue = () => {
    const rootPath = state.data[selectedController].apis[selectedApi];
    if (activeTab === 1) {
      if (
        rootPath.headers === null ||
        JSON.stringify(rootPath.headers) === "[]"
      ) {
        rootPath.headers = [{ key: "", value: "" }];
      }
    } else if (activeTab === 2 || activeTab === 3) {
      const tab = activeTab === 2 ? "parameters" : "queries";
      if (rootPath[tab] === null || JSON.stringify(rootPath[tab]) === "[]") {
        rootPath[tab] = [propertiesData];
      }
    } else if (activeTab === 4) {
      if (
        rootPath.requestBody === null ||
        JSON.stringify(rootPath.requestBody) === "{}"
      ) {
        rootPath.requestBody = {
          dtoName: "",
          name: "",
          type: "Object",
          required: true,
          collectionType: "",
          properties: [],
        };
      } else if (
        !rootPath.requestBody?.properties &&
        (rootPath.requestBody.properties !== null ||
          JSON.stringify(rootPath.requestBody.properties) === "[]")
      ) {
        rootPath.requestBody.properties = [
          {
            dtoName: "",
            name: "",
            type: "String",
            required: true,
            collectionType: "",
            properties: [],
          },
        ];
      }
    } else if (activeTab === 5) {
      if (
        rootPath.responses === null ||
        JSON.stringify(rootPath.responses) === "{}"
      ) {
        rootPath.responses = responsesData;
      } else {
        if (
          !rootPath.responses?.fail ||
          rootPath.responses?.fail === null ||
          JSON.stringify(rootPath.responses.fail) === "{}"
        ) {
          rootPath.responses.fail = {
            status: 400,
            responseBody: propertiesData,
          };
        } else {
          if (
            !rootPath.responses.fail?.responseBody ||
            rootPath.responses.fail.responseBody === null ||
            JSON.stringify(rootPath.responses.fail.responseBody) === "{}"
          ) {
            rootPath.responses.fail = {
              status: 400,
              responseBody: propertiesData,
            };
          }
          if (
            !rootPath.responses.fail?.status ||
            rootPath.responses.fail.status === null
          ) {
            rootPath.responses.fail.status = 400;
          }
        }
        if (
          !rootPath.responses?.success ||
          rootPath.responses?.success === null ||
          JSON.stringify(rootPath.responses.success) === "{}"
        ) {
          rootPath.responses.success = {
            status: 200,
            responseBody: propertiesData,
          };
        } else {
          if (
            !rootPath.responses.success?.responseBody ||
            rootPath.responses.success.responseBody === null ||
            JSON.stringify(rootPath.responses.success.responseBody) === "{}"
          ) {
            rootPath.responses.success = {
              status: 200,
              responseBody: propertiesData,
            };
          }
          if (
            !rootPath.responses.success?.status ||
            rootPath.responses.success.status === null
          ) {
            rootPath.responses.success.status = 200;
          }
        }
      }
    }
  };

  if (authority === 0) {
    return (
      <>
        <ErrorPage code="403"></ErrorPage>
      </>
    );
  } else {
    return (
      <>
        <MetaData
          title="APICloud 명세 작성"
          description="APICloud에서 새로운 Api 명세서를 작성해보세요"
          name="APICloud"
        />
        {isPending || isLodaing ? (
          <Loading>
            <InfinitySpin width="250" color="#6FC7D1" />
          </Loading>
        ) : (
          <div>
            {isGuideModal && (
              <GuideModal
                setIsGuideModal={setIsGuideModal}
                isGuideModal={isGuideModal}
              />
            )}
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
                isViewer={isViewer}
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
                      <button
                        className="createApiButton"
                        onClick={() => {
                          setIsGuideModal(!isGuideModal);
                        }}
                      >
                        사용법
                      </button>
                      <button
                        className="createApiButton"
                        onClick={() => {
                          setIsSynchronizeModal(!isSynchronizeModal);
                        }}
                        disabled={isViewer}
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
                          state={state}
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
                          state={state}
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
                        onClick={() => {
                          setActiveTab(1);
                          if (selectedApi > -1 && selectedController > -1) {
                            handleTableNullValue();
                          }
                        }}
                      >
                        headers
                      </div>
                      <div
                        className={
                          activeTab === 2 ? "tabItem active" : "tabItem"
                        }
                        onClick={() => {
                          setActiveTab(2);
                          if (selectedApi > -1 && selectedController > -1) {
                            handleTableNullValue();
                          }
                        }}
                      >
                        parameters
                      </div>
                      <div
                        className={
                          activeTab === 3 ? "tabItem active" : "tabItem"
                        }
                        onClick={() => {
                          setActiveTab(3);
                          if (selectedApi > -1 && selectedController > -1) {
                            handleTableNullValue();
                          }
                        }}
                      >
                        queries
                      </div>
                      <div
                        className={
                          activeTab === 4 ? "tabItem active" : "tabItem"
                        }
                        onClick={() => {
                          setActiveTab(4);
                          if (selectedApi > -1 && selectedController > -1) {
                            handleTableNullValue();
                          }
                        }}
                      >
                        requestBody
                      </div>
                      <div
                        className={
                          activeTab === 5 ? "tabItem active" : "tabItem"
                        }
                        onClick={() => {
                          setActiveTab(5);
                          if (selectedApi > -1 && selectedController > -1) {
                            handleTableNullValue();
                          }
                        }}
                      >
                        responses
                      </div>
                    </div>
                    <div className="tableContainer">
                      {selectedApi > -1 &&
                        selectedController > -1 &&
                        state.data?.length > 0 &&
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
                              state={state}
                              isViewer={isViewer}
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
                              state={state}
                              isViewer={isViewer}
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

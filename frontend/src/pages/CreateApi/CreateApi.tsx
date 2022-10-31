import React, { useState } from "react";
import { ApisType, ControllerType, DataType, ServerInfoType } from "./ApisType";
import "./CreateApi.scss";
import Sidebar from "../../components/CreateApi/Sidebar/Sidebar";
import Table from "../../components/CreateApi/Table/Table";

const CreateApi = () => {
  // 서버 정보를 저장할 state (임시 데이터)
  const [serverInfo, setServerInfo] = useState<ServerInfoType>({
    serverUrl: "http://localhost:8080",
    rootUri: "/apis",
    javaVersion: 8,
    buildManagement: "Gradle",
    groupPackage: "com.example",
    packageName: "com.example.demo",
    jarWar: "jar",
    springVersion: "2.7.5",
  });
  // api 정보를 저장할 state
  const [apiData, setApiData] = useState<ApisType>({
    name: "",
    uri: "",
    method: "GET",
    requestBody: {
      name: "",
      type: "",
      properties: [{ name: "", type: "", required: true, properties: [] }],
      required: true,
    },
    parameters: [{ name: "", type: "", required: true, properties: [] }],
    query: {
      name: "",
      type: "",
      properties: [{ name: "", type: "", required: true, properties: [] }],
      required: true,
    },
    header: [{ key: "", value: "" }],
    responses: {
      fail: {
        status: 0,
        type: "",
        required: true,
        properties: [{ name: "", type: "", required: true, properties: [] }],
      },
      success: {
        status: 0,
        type: "",
        required: true,
        properties: [{ name: "", type: "", required: true, properties: [] }],
      },
    },
  });
  // controller 정보를 저장할 state
  const [controllerData, setControllerData] = useState<ControllerType>({
    name: "",
    commonUri: "",
    apis: [],
  });
  // 전체 데이터를 관리하는 state
  const [data, setData] = useState<DataType>({
    server: serverInfo,
    controller: [],
  });
  // 테이블의 탭 전환을 위한 state
  const [activeTab, setActiveTab] = useState(1);
  // 선택된 api를 저장할 state
  const [selectedApi, setSelectedApi] = useState(-1);
  const [selectedController, setSelectedController] = useState(-1);

  // controller 추가 함수 -> 기존 데이터에 새 데이터 추가
  const addController = () => {
    setData((old) => {
      let copy = JSON.parse(JSON.stringify(old));
      copy.controller = [...old.controller, controllerData];
      return copy;
    });
  };

  // api 추가 함수 -> 기존 데이터에 새 데이터 추가
  const addApi = (index: number) => {
    setData((old) => {
      let copy = JSON.parse(JSON.stringify(old));
      copy.controller[index].apis = [...copy.controller[index].apis, apiData];
      return copy;
    });
  };

  // 사이드바의 api 정보 가져오는 함수
  const handleSidebarApi = (index: number, idx: number) => {
    setSelectedController(index);
    setSelectedApi(idx);
    setActiveTab(1);
  };

  return (
    <div className="apiDocscontainer">
      <Sidebar
        addController={addController}
        addApi={addApi}
        data={data}
        setData={setData}
        handleSidebarApi={handleSidebarApi}
      />
      <div className="apiDocsMaincontainer">
        <div className="titleContainer">
          <p className="apiDocsTitleText">APICloud API 명세서</p>
          <div className="buttonContainer">
            <button>공유</button>
            <button>동기화</button>
            <button>추출</button>
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
            query
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
            <Table
              activeTab={activeTab}
              selectedController={selectedController}
              selectedApi={selectedApi}
              data={
                activeTab === 1
                  ? data.controller[selectedController].apis[selectedApi].header
                  : activeTab === 2
                  ? data.controller[selectedController].apis[selectedApi]
                      .parameters
                  : activeTab === 3
                  ? data.controller[selectedController].apis[selectedApi].query
                      .properties
                  : activeTab === 4
                  ? data.controller[selectedController].apis[selectedApi]
                      .requestBody.properties
                  : data.controller[selectedController].apis[selectedApi]
                      .responses.fail.properties
              }
              setData={setData}
              wholeData={data}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateApi;

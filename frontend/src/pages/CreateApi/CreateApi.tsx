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
    requestBody: {},
    parameters: [],
    query: {},
    header: [],
    responses: {},
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
  return (
    <div className="apiDocscontainer">
      <Sidebar
        addController={addController}
        addApi={addApi}
        data={data}
        setData={setData}
      />
      <div className="mainContainer">
        <div className="titleContainer">
          <p>APICloud API 명세서</p>
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
          <Table activeTab={activeTab} />
        </div>
      </div>
    </div>
  );
};

export default CreateApi;

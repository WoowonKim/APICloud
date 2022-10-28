import React, { useState } from "react";
import Sidebar from "../components/CreateApi/Sidebar/Sidebar";
import {
  ApisType,
  ControllerType,
  DataType,
  ServerInfoType,
} from "./CreateApi/ApisType";
import TestTable from "./TestTable";
import "./CreateApi/CreateApi.scss";

const Test = () => {
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
  const [apiData, setApiData] = useState<ApisType>({
    name: "",
    uri: "",
    method: "",
    requestBody: {},
    parameters: [],
    query: {},
    header: [],
    responses: {},
  });
  const [controllerData, setControllerData] = useState<ControllerType>({
    name: "",
    commonUri: "",
    apis: [],
  });
  const [data, setData] = useState<DataType>({
    server: serverInfo,
    controller: [],
  });
  const [activeTab, setActiveTab] = useState(1);

  const addController = () => {
    setData((old) => {
      let copy = JSON.parse(JSON.stringify(old));
      copy.controller = [...old.controller, controllerData];
      return copy;
    });
  };

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
        controllers={data.controller}
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
          <TestTable activeTab={activeTab} />
        </div>
      </div>
    </div>
  );
};

export default Test;

import React, { useEffect, useState } from "react";
import Sidebar from "../components/CreateApi/Sidebar/Sidebar";
import "./CreateApi/CreateApi.scss";
import TestTable from "./TestTable";

export type DefaultConfigType = {
  openapi: string;
  info: {
    title: string;
    version: string;
  };
  servers: [
    {
      url: string;
      variables: {
        commonUri: {
          default: string;
        };
      };
    }
  ];
  paths: ApiType[];
};

export type DataType = {
  name: string;
  content: DefaultConfigType;
};

export type RequestBodyType = {
  content: {
    "application/json": {
      schema: Schema;
    };
  };
};

export type ResponsesType = {
  200: {
    description: string;
    content: {
      "application/json": {
        schema: Schema;
      };
    };
  };
  400: {
    description: string;
    content: {
      "application/json": {
        schema: Schema;
      };
    };
  };
};

export type Schema = {
  type: string;
  required: boolean;
  properties: object;
};

export type ParametersType = {
  in: string;
  name: string;
  required: boolean;
  schema: {};
}[];

// table의 row type 설정
export type ApiType = {
  detailUri: {
    method: MethodType[];
  };
};

export type MethodType = {
  parameters: ParametersType;
  requestBody: RequestBodyType;
  responses: ResponsesType;
};

// 전체 api들의 type 설정
export type ApiListType = {
  url: string;
  details: ApiType[];
};

const Test = () => {
  const [serverUrl, setServerUrl] = useState("http://localhost:8000");
  const [commonUri, setCommonUri] = useState("api");
  const [title, setTitle] = useState("APICloud API 명세서");

  const [defualtConfig, setDefaultConfig] = useState<DefaultConfigType>({
    openapi: "3.0.0",
    info: {
      title,
      version: "1.0.0",
    },
    servers: [
      {
        url: `${serverUrl}/{commonUri}`,
        variables: {
          commonUri: {
            default: commonUri,
          },
        },
      },
    ],
    paths: [
      {
        detailUri: {
          method: [
            {
              parameters: [
                {
                  in: "query",
                  name: "test",
                  required: true,
                  schema: {
                    type: "type",
                    required: false,
                    properties: {},
                  },
                },
              ],
              requestBody: {
                content: {
                  "application/json": {
                    schema: {
                      type: "type",
                      required: false,
                      properties: {},
                    },
                  },
                },
              },
              responses: {
                200: {
                  description: "string",
                  content: {
                    "application/json": {
                      schema: {
                        type: "type",
                        required: false,
                        properties: {},
                      },
                    },
                  },
                },
                400: {
                  description: "string",
                  content: {
                    "application/json": {
                      schema: {
                        type: "type",
                        required: false,
                        properties: {},
                      },
                    },
                  },
                },
              },
            },
          ],
        },
      },
    ],
  });
  const [datas, setDatas] = useState<DataType[]>([]);

  const [activeTab, setActiveTab] = useState(1);

  return (
    <div className="apiDocscontainer">
      <Sidebar />
      <div className="mainContainer">
        <div className="titleContainer">
          <p>{title}</p>
          <div className="buttonContainer">
            <button>공유</button>
            <button>동기화</button>
            <button>추출</button>
          </div>
        </div>
        <div className="infoContainer">
          <div>
            <p>사이트 주소</p>
            <p className="infoValue">{serverUrl}</p>
          </div>
          <div>
            <p>공통 URI</p>
            <p className="infoValue">{`/${commonUri}`}</p>
          </div>
        </div>
        <div className="tabContainer">
          <button
            className={activeTab === 1 ? "tabItem active" : "tabItem"}
            onClick={() => setActiveTab(1)}
          >
            requestBody
          </button>
          <button
            className={activeTab === 2 ? "tabItem active" : "tabItem"}
            onClick={() => setActiveTab(2)}
          >
            parameters
          </button>
          <button
            className={activeTab === 3 ? "tabItem active" : "tabItem"}
            onClick={() => setActiveTab(3)}
          >
            responses
          </button>
        </div>
        <div className="tableContainer">
          <TestTable activeTab={activeTab} />
        </div>
      </div>
    </div>
  );
};

export default Test;

import React, { useState } from "react";
import Sidebar from "../../components/CreateApi/Sidebar/Sidebar";
import Table from "../../components/CreateApi/Table/Table";
import "./CreateApi.scss";

// table의 row type 설정
export type ApiType = {
  detailUri: String;
  summary: String;
  method:
    | "GET"
    | "POST"
    | "PUT"
    | "DELETE"
    | "PATCH"
    | "OPTIONS"
    | "HEAD"
    | null;
  param: String;
  requestBody: String;
  header: String;
  successResponseBody: String;
  failResponseBody: String;
  subRows?: ApiType[];
};

// 전체 api들의 type 설정
export type ApiListType = {
  url: string;
  details: ApiType[];
};

const CreateApi = () => {
  // api를 저장하기 위한 state (임시 기본값 설정)
  const [datas, setDatas] = useState<ApiListType[]>([
    {
      url: "/user",
      details: [
        {
          detailUri: "",
          summary: "",
          method: null,
          param: "",
          requestBody: "",
          header: "",
          successResponseBody: "",
          failResponseBody: "",
        },
      ],
    },
    {
      url: "/post",
      details: [
        {
          detailUri: "",
          summary: "",
          method: null,
          param: "",
          requestBody: "",
          header: "",
          successResponseBody: "",
          failResponseBody: "",
        },
      ],
    },
  ]);

  // table에 row 추가 함수
  const addTableRow = (index: number, data: ApiListType) => {
    const addData = {
      detailUri: "",
      summary: "",
      method: null,
      param: "",
      requestBody: "",
      header: "",
      successResponseBody: "",
      failResponseBody: "",
    };

    let copy = [...datas];
    copy[index].details = [...data.details, addData];
    setDatas(copy);
  };

  return (
    <div className="container">
      <Sidebar />
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
        <div className="tableContainer">
          {datas.map((data, index) => (
            <>
              <div className="apiTable">
                <button
                  className="apiPlusButton"
                  onClick={() => {
                    addTableRow(index, data);
                  }}
                >
                  Plus
                </button>
                <div>
                  <Table
                    datas={datas}
                    key={index}
                    index={index}
                    data={data.details}
                    setData={setDatas}
                    url={data.url}
                  />
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreateApi;

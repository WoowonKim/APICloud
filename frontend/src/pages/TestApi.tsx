import React, { useEffect, useState } from "react";
import Header from "../components/main/Header";
import ApiAddress from "../components/ApiTest/ApiAddress";
import ApiBody from "../components/ApiTest/ApiBody";
import ApiHeader from "../components/ApiTest/ApiHeader";
import ApiInputUri from "../components/ApiTest/ApiInputUri";
import ApiResponse from "../components/ApiTest/ApiResponse";
import ApiSide from "../components/ApiTest/ApiSide";
import "../components/ApiTest/ApiTest.scss";
import { useSelector } from "react-redux";
import { RootState } from "../Store/rootReducer";

interface sideType {
  header: {
    contentType: string;
    contentLength: string;
    Host: string;
    Accept: string;
    AcceptEncoding: string;
    Connection: string;
    Token: string;
    Cookie: string;
  };
  infomethod: {
    address: string;
    commonUri: string;
    userAddress: string;
    method: string;
  };
  body: string;
}
const TestApi = () => {
  const responseList = useSelector((state: RootState) => state.sideApi);
  const [sideApiList, setSidApiList] = useState<number>(0);
  const [responseApiList, setResponseApiList] = useState<sideType | null>();

  return (
    <div>
      <Header />
      <div className="testContainer">
        <div className="testSide">
          <ApiSide setSidApiList={setSidApiList} />
        </div>
        <div className="testMain">
          <div className="testInfomation">
            {/* <ApiAddress /> */}
            <ApiInputUri sideApiList={sideApiList} />
          </div>
          <div className="testInfo">
            <div className="testSetting">
              <ApiHeader />
              <ApiBody />
            </div>
            <ApiResponse />
          </div>
        </div>
      </div>
    </div>
  );
};
export default TestApi;

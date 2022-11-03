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

const TestApi = () => {
  const [sideApiList, setSidApiList] = useState<number>(0);
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
              <ApiHeader sideApiList={sideApiList} />
              <ApiBody sideApiList={sideApiList} />
            </div>
            <ApiResponse />
          </div>
        </div>
      </div>
    </div>
  );
};
export default TestApi;

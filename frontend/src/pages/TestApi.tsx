import React from "react";
import Header from "../components/main/Header";
import ApiAddress from "../components/ApiTest/ApiAddress";
import ApiBody from "../components/ApiTest/ApiBody";
import ApiHeader from "../components/ApiTest/ApiHeader";
import ApiInputUri from "../components/ApiTest/ApiInputUri";
import ApiResponse from "../components/ApiTest/ApiResponse";
import ApiSide from "../components/ApiTest/ApiSide";
import "../components/ApiTest/ApiTest.scss";
const TestApi = () => {
  return (
    <div>
      {/* <Header /> 구현 완료 후 추가 할 부분입니다.*/}
      <div className="testContainer">
        <div className="testSide">
          <ApiSide />
        </div>
        <div className="testMain">
          <ApiAddress />
          <ApiInputUri />
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

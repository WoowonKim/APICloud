import React from "react";
import Header from "../components/main/Header";
import ApiAddress from "../components/ApiTest/ApiAddress";
import ApiBody from "../components/ApiTest/ApiBody";
import ApiHeader from "../components/ApiTest/ApiHeader";
import ApiInputUri from "../components/ApiTest/ApiInputUri";
import ApiResponse from "../components/ApiTest/ApiResponse";
import ApiSide from "../components/ApiTest/ApiSide";
import "../components/ApiTest/ApiTest.scss";

/**
 * 기본 객체 : Header, Token, Cookie
 * 테스트 객체 : URI + Method + Body 를 보내면 Response 객체를 반환
 * Response 객체 : Header, Body, Status, Cookie 값이 있어야한다.
 * Side에는 Api 폴더 구조 정리
 */

const TestApi = () => {
  return (
    <div>
      <Header />
      <div className="testContainer">
        <div className="testSide">
          <ApiSide />
        </div>
        <div className="testMain">
          <div className="testInfomation">
            <ApiAddress />
            <ApiInputUri />
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

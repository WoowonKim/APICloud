import React, { useState } from "react";
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

export type SiteAddressType = {
  Address: string;
  commonUri: string;
};
export type subMethod = {
  method: string;
  uri: string;
};
export type HeaderType = {
  contentType: string;
  contentLength: string;
  Host: string;
  Accept: string;
  AcceptEncoding: string;
  Connection: string;
  Token: string;
};
const siteAddress: SiteAddressType = {
  Address: "https://localhost:8080",
  commonUri: "/ApiCloud",
};
const headerApi = {
  contentType: "application/json",
  contentLength: "calculated when request is sent",
  Host: "calculated when request is sent",
  Accept: "*/*",
  AcceptEncoding: "gzip, deflate, br",
  Connection: "keep-alive",
  Token: "1q2w3er45t",
};
const TestApi = () => {
  const [submitMethod, setSubmitMethod] = useState<subMethod | null>(null);

  return (
    <div>
      <Header />
      <div className="testContainer">
        <div className="testSide">
          <ApiSide />
        </div>
        <div className="testMain">
          <div className="testInfomation">
            <ApiAddress siteAddress={siteAddress} />
            <ApiInputUri siteAddress={siteAddress} setSubmitMethod={setSubmitMethod} />
          </div>
          <div className="testInfo">
            <div className="testSetting">
              <ApiHeader headerApi={headerApi} />
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

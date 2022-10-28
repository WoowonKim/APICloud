import React, { useState } from "react";
import Header from "../components/main/Header";
import ApiAddress from "../components/ApiTest/ApiAddress";
import ApiBody from "../components/ApiTest/ApiBody";
import ApiHeader from "../components/ApiTest/ApiHeader";
import ApiInputUri from "../components/ApiTest/ApiInputUri";
import ApiResponse from "../components/ApiTest/ApiResponse";
import ApiSide from "../components/ApiTest/ApiSide";
import "../components/ApiTest/ApiTest.scss";

export type SiteAddressType = {
  Address: string;
  commonUri: string;
};
export type subMethod = {
  method: string;
  uri: string;
};
const siteAddress: SiteAddressType = {
  Address: "https://localhost:8080",
  commonUri: "/ApiCloud",
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
          <ApiAddress siteAddress={siteAddress} />
          <ApiInputUri siteAddress={siteAddress} setSubmitMethod={setSubmitMethod} />
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

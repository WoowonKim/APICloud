import React, { useEffect, useState } from "react";
import Header from "../components/main/Header";
import ApiBody from "../components/ApiTest/ApiBody";
import ApiHeader from "../components/ApiTest/ApiHeader";
import ApiInputUri from "../components/ApiTest/ApiInputUri";
import ApiResponse from "../components/ApiTest/ApiResponse";
import ApiSide from "../components/ApiTest/ApiSide";
import "../components/ApiTest/ApiTest.scss";
import { useAppDispatch, useAppSelector } from "../Store/hooks";
import { mainApi } from "../Store/slice/mainApi";
import { getApiRequestInfo } from "../Store/slice/testApi";
import { RequestTypeInfo } from "./CreateApi/ApisType";

const TestApi = () => {
  const [getInfo, setGetInfo] = useState<RequestTypeInfo>();
  const dispatch = useAppDispatch();
  const getDocsId = useAppSelector(mainApi);

  // 해당 API정보의 전체를 불러오기.
  useEffect(() => {
    dispatch(getApiRequestInfo({ docId: getDocsId.docId })).then((res: any) => {
      const json = res.payload.detail;
      const obj = JSON.parse(json);
      setGetInfo(JSON.parse(obj.detail));
    });
  }, [getDocsId.docId]);

  return (
    <div>
      <Header />
      <div className="testContainer">
        <div className="testSide">
          <ApiSide getInfo={getInfo} />
        </div>
        <div className="testMain">
          <div className="testInfomation">
            <ApiInputUri getInfo={getInfo} />
          </div>
          <p className="apiHeaderMainTitle">Request</p>
          <div className="testSetting">
            <div className="testInfo">
              <ApiHeader getInfo={getInfo} />
            </div>
            <div className="testBodyInfo">
              <ApiBody getInfo={getInfo} />
            </div>
          </div>
          <p className="apiHeaderMainTitle">Response</p>
          <ApiResponse getInfo={getInfo} />
        </div>
      </div>
    </div>
  );
};
export default TestApi;

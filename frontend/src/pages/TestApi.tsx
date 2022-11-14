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
import styled from "styled-components";

interface IHome {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}
export type reBodyType = {};
const TestSide = styled.div`
  width: 20%;
  height: 91vh;
  background-color: ${props => props.theme.sideBgClodr};
  border-top: 1px solid ${props => props.theme.border};
  border-right: 2px solid ${props => props.theme.border};
`;
const TestApi = ({ isDarkMode, toggleDarkMode }: IHome) => {
  const [getInfo, setGetInfo] = useState<RequestTypeInfo>();
  const dispatch = useAppDispatch();
  const getDocsId = useAppSelector(mainApi);
  const [testbodyInfo, setTestbodyInfo] = useState<reBodyType[]>([]);

  // 해당 API정보의 전체를 불러오기.
  useEffect(() => {
    dispatch(getApiRequestInfo({ docId: getDocsId.docId })).then((res: any) => {
      const json = res.payload.detail;
      const obj = JSON.parse(json);
      setGetInfo(obj);
    });
  }, [getDocsId.docId]);

  return (
    <div>
      <Header />
      <div className="testContainer">
        <TestSide>
          <ApiSide getInfo={getInfo} />
        </TestSide>
        <div className="testMain">
          <div className="testInfomation">
            <ApiInputUri
              getInfo={getInfo}
              testbodyInfo={testbodyInfo}
              setTestbodyInfo={setTestbodyInfo}
            />
          </div>
          <p className="apiHeaderMainTitle">Request</p>
          <div className="testSetting">
            <div className="testInfo">
              <ApiHeader
                getInfo={getInfo}
                testbodyInfo={testbodyInfo}
                setTestbodyInfo={setTestbodyInfo}
              />
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

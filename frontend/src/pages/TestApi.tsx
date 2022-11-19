import React, { useEffect, useState } from "react";
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
import HeaderList from "../components/ApiTest/HeaderList";
import ApiHeaderTitle from "../components/ApiTest/ApiHeaderTitle";
import ApiResList from "../components/ApiTest/ApiResList";

interface IHome {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}
export type reBodyType = {};
const TestSide = styled.div`
  width: 20%;
  height: 91vh;
  background-color: ${props => props.theme.startBgColor};
  border-top: 1px solid ${props => props.theme.border};
  border-right: 2px solid ${props => props.theme.border};
  height: 100vh;
`;
const TestApi = ({ isDarkMode, toggleDarkMode }: IHome) => {
  const [getInfo, setGetInfo] = useState<RequestTypeInfo>();
  const [testbodyInfo, setTestbodyInfo] = useState<reBodyType>();
  const [queriesInfo, setQueriesInfo] = useState<reBodyType>();
  const [bodyObject, setBodyObject] = useState({});
  const dispatch = useAppDispatch();
  const getDocsId = useAppSelector(mainApi);

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
              queriesInfo={queriesInfo}
              setQueriesInfo={setQueriesInfo}
              bodyObject={bodyObject}
            />
          </div>
          <p className="apiHeaderMainTitle">Request</p>
          <div className="testSetting">
            <HeaderList />
            <ApiHeaderTitle />
            <ApiHeader
              getInfo={getInfo}
              testbodyInfo={testbodyInfo}
              setTestbodyInfo={setTestbodyInfo}
              queriesInfo={queriesInfo}
              setQueriesInfo={setQueriesInfo}
              setBodyObject={setBodyObject}
            />
          </div>
          <p className="apiHeaderMainTitle">Response</p>
          <div className="testSetting">
            <ApiResList />
            <ApiResponse getInfo={getInfo} testbodyInfo={testbodyInfo} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default TestApi;

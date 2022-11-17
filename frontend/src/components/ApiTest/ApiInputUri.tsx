import axios from "axios";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RequestTypeInfo } from "../../pages/CreateApi/ApisType";
import { reBodyType } from "../../pages/TestApi";
import { useAppDispatch } from "../../Store/hooks";
import testApiSlice, { selectTestApi } from "../../Store/slice/testApi";
import MethodTest from "./MethodTest";

const ApiInputUriSearch = styled.input`
  width: 80%;
  border: none;
  border-bottom: 2px solid #dadada;
  // border-right: 2px solid #000000;
  // border-top: 1px solid #000000;
  border-top-right-radius: 15px;
  // border-bottom-right-radius: 15px;
  padding: 1px 50px 1px 10px;
  outline: none;
  font-weight: 500;
  font-size: 14px;
  color: ${(props) => props.theme.color};
  background-color: ${(props) => props.theme.bgColor};
`;

export type list = {
  getInfo: RequestTypeInfo | undefined;
  testbodyInfo: reBodyType | undefined;
  setTestbodyInfo: Dispatch<SetStateAction<reBodyType | undefined>>;
  setParamsInfo: Dispatch<SetStateAction<reBodyType | undefined>>;
  paramsInfo: reBodyType | undefined;
  queriesInfo: reBodyType | undefined;
  setQueriesInfo: Dispatch<SetStateAction<reBodyType | undefined>>;
};

const ApiInputUri = ({
  getInfo,
  testbodyInfo,
  setTestbodyInfo,
  paramsInfo,
  setParamsInfo,
  queriesInfo,
  setQueriesInfo,
}: list) => {
  const [sendFlag, setSendFlag] = useState(false);
  const [methodUri, setMethodUri] = useState<string | undefined>("");
  const info = useSelector(selectTestApi);
  const dispatch = useAppDispatch();

  let token = info.getToken.length >= 1 ? `Bearer${info.getToken}` : "";

  //해당 uri 받아오기
  useEffect(() => {
    setMethodUri(
      getInfo?.controllers[info.getControllerInfomation].apis[
        info.getApisInfomation
      ].uri
    );
  }, [getInfo, info.getApisInfomation, info.getControllerInfomation]);

  // 서버 주소 받아오기
  const server = Object.values(info.getServerUrl).toString();
  const context = Object.values(info.getContextUrl).toString();
  const requestMaapingUri =
    getInfo?.controllers[info.getControllerInfomation].commonUri;
  const testUri = server + context + requestMaapingUri + methodUri;

  // 성공시 Response 반환
  const responseAllInfo = (e: any) => {
    e.status && dispatch(testApiSlice.actions.getStatus(e.status));
    e.statusText &&
      dispatch(testApiSlice.actions.getStatusTextInfo(e.statusText));
    e.data && dispatch(testApiSlice.actions.getData(e.data));
    e.headers && dispatch(testApiSlice.actions.getSuccessHeader(e.headers));
  };

  // 실패시 Response 반환
  const errResponsAllInfo = (e: any) => {
    e.response.status &&
      dispatch(testApiSlice.actions.getStatus(e.response.status));
    e.message && dispatch(testApiSlice.actions.getErrMessage(e.message));
  };

  // 메소드 정보 받아오기
  const requestMethod =
    getInfo?.controllers[info.getControllerInfomation].apis[
      info.getApisInfomation
    ].method;
  const submitRequest = () => {
    switch (requestMethod) {
      case "Get":
        axios({
          method: "get",
          url: testUri,
          headers: {
            Authorization: token,
          },
          params: paramsInfo,
        })
          .then((res) => {
            console.log("RES=>", res);
            responseAllInfo(res);
          })
          .catch((err) => {
            errResponsAllInfo(err);
            console.log("ERR => ", err);
            console.log("Params => ", paramsInfo);
            console.log("TestUri => ", testUri);
          });
        break;
      case "Post":
        axios({
          method: "post",
          url: testUri,
          data: testbodyInfo,
          headers: {
            Authorization: token,
          },
        })
          .then((res) => {
            console.log("post 성공", res);
            console.log("postBody =>", testbodyInfo);
            responseAllInfo(res);
          })
          .catch((err) => {
            console.log("ERR =>", err);
            console.log("postBody =>", testbodyInfo);
            errResponsAllInfo(err);
          });
        break;
      case "Put":
        axios({
          method: "put",
          url: testUri,
          data: testbodyInfo,
          headers: {
            Authorization: token,
          },
        })
          .then((res) => {
            console.log("put 성공 =>", res);
            console.log("putBody =>", testbodyInfo);
            responseAllInfo(res);
          })
          .catch((err) => {
            console.log("ERR => ", err);
            console.log("putBody=>", testbodyInfo);
            errResponsAllInfo(err);
          });
        break;
      case "Delete":
        axios({
          method: "delete",
          url: testUri,
          headers: {
            Authorization: token,
          },
          params: paramsInfo,
        })
          .then((res) => {
            responseAllInfo(res);
            console.log("Delete 성공=>", res);
          })
          .catch((err) => {
            errResponsAllInfo(err);
            console.log("ERR => ", err);
          });
        break;
      case "patch":
        axios.patch(testUri, {
          testbodyInfo,
          headers: {
            Authoriztion: token,
          },
          params: paramsInfo,
        });
        break;
      case "head":
        axios.head(testUri, testbodyInfo);
        break;
      default:
        axios.options(testUri);
        break;
    }
    setSendFlag(!sendFlag);
    dispatch(testApiSlice.actions.getFlagResponse(!sendFlag));
  };

  // body정보 초기화 하기
  useEffect(() => {
    setTestbodyInfo({});
    setParamsInfo({});
    setQueriesInfo({});
  }, [sendFlag]);

  return (
    <div className="apiInputContainer">
      <span className="apiChoice">
        <MethodTest methodApiWord={requestMethod} />
      </span>
      <ApiInputUriSearch type="text" value={testUri} />
      <button className="apiTestBtn" onClick={submitRequest}>
        send
      </button>
    </div>
  );
};

export default ApiInputUri;

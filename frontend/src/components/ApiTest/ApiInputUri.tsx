import axios from "axios";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import {
  PropertiesType,
  RequestTypeInfo,
} from "../../pages/CreateApi/ApisType";
import { reBodyType } from "../../pages/TestApi";
import { useAppDispatch } from "../../Store/hooks";
import testApiSlice, { selectTestApi } from "../../Store/slice/testApi";
import MethodTest from "./MethodTest";

const ApiInputUriSearch = styled.input`
  width: 80%;
  border: none;
  border-bottom: 2px solid #dadada;
  border-top-right-radius: 15px;
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
  bodyObject: any;
};

const ApiInputUri = ({
  getInfo,
  testbodyInfo,
  setTestbodyInfo,
  paramsInfo,
  setParamsInfo,
  queriesInfo,
  setQueriesInfo,
  bodyObject,
}: list) => {
  const [sendFlag, setSendFlag] = useState(false);
  const [methodUri, setMethodUri] = useState<string | undefined>("");
  const [testUri, setTestUri] = useState("");
  const [realParams, setRealParams] = useState<string[]>([]);
  const [reqArr, setReqArr] = useState<string[]>([]);
  const [infoQueries, setInfoQueries] = useState<PropertiesType[]>();
  const [reqUri, setReqUri] = useState("");

  const info = useSelector(selectTestApi);
  const dispatch = useAppDispatch();

  //토큰값 받아오기
  let token = info.getToken.length >= 1 ? `Bearer${info.getToken}` : "";

  // 물을표 입력
  const uriFlag = testUri.includes("?");

  // 서버 주소 받아오기
  const server = Object.values(info.getServerUrl).toString();
  const context = Object.values(info.getContextUrl).toString();
  const requestMaapingUri =
    getInfo?.controllers[info.getControllerInfomation]?.commonUri;

  //해당 uri 받아오기
  useEffect(() => {
    setMethodUri(
      getInfo?.controllers[info.getControllerInfomation]?.apis[
        info.getApisInfomation
      ]?.uri
    );
  }, [getInfo, info.getApisInfomation, info.getControllerInfomation]);

  // URI 창에 Path 입력하기 위한 초기화
  useEffect(() => {
    setTestUri(server + context + requestMaapingUri + methodUri);
  }, [requestMaapingUri, methodUri]);

  // URI 창에 Path 입력하기 위한 초기화
  useEffect(() => {
    const paramsText = realParams.toString().replace(",", "");
    paramsText.length === 0
      ? setTestUri(server + context + requestMaapingUri + methodUri)
      : setTestUri(
          server + context + requestMaapingUri + methodUri + paramsText
        );
  }, [realParams]);

  // 쿼리 정보 받아오기
  useEffect(() => {
    if (getInfo) {
      setInfoQueries(
        getInfo?.controllers[info.getControllerInfomation]?.apis[
          info.getApisInfomation
        ]?.queries
      );
    }
  }, [getInfo, info.getControllerInfomation, info.getApisInfomation]);

  // 값 변할때 마다 쿼리 정보 초기화
  useEffect(() => {
    setReqArr([]);
  }, [info.getApisInfomation, info.getControllerInfomation]);

  // 쿼리문 받아오기
  useEffect(() => {
    let testARR: string[] = [];
    if (infoQueries && infoQueries.length > 0) {
      infoQueries.map((it, idx) => {
        if (it.name && it.name.length > 0) {
          testARR = [...testARR, it.name];
        }
        setReqArr([...reqArr, ...testARR]);
      });
    }
  }, [infoQueries]);

  // 쿼리문 문자열 변환
  useEffect(() => {
    setReqUri(reqArr.toString().replace(",", "=&") + "=");
  }, [reqArr, uriFlag]);

  // 변환된 문자열을 URI에 추가해주기.
  useEffect(() => {
    if (uriFlag) {
      const sum = testUri + reqUri;
      setTestUri(sum);
    }
  }, [uriFlag]);

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
    getInfo?.controllers[info.getControllerInfomation]?.apis[
      info.getApisInfomation
    ]?.method;

  // 서버 통신
  const submitRequest = () => {
    switch (requestMethod) {
      case "Get":
        axios({
          method: "get",
          url: testUri,
          headers: {
            Authorization: token,
          },
          params: queriesInfo,
        })
          .then((res) => {
            responseAllInfo(res);
          })
          .catch((err) => {
            errResponsAllInfo(err);
          });
        break;
      case "Post":
        axios({
          method: "post",
          url: testUri,
          data: bodyObject,
          headers: {
            Authorization: token,
          },
          params: queriesInfo,
        })
          .then((res) => {
            responseAllInfo(res);
          })
          .catch((err) => {
            errResponsAllInfo(err);
          });
        break;
      case "Put":
        axios({
          method: "put",
          url: testUri,
          data: bodyObject,
          headers: {
            Authorization: token,
          },
          params: queriesInfo,
        })
          .then((res) => {
            responseAllInfo(res);
          })
          .catch((err) => {
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
          params: queriesInfo,
        })
          .then((res) => {
            responseAllInfo(res);
          })
          .catch((err) => {
            errResponsAllInfo(err);
          });
        break;
      case "patch":
        axios.patch(testUri, {
          testbodyInfo,
          headers: {
            Authoriztion: token,
          },
          params: queriesInfo,
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

  // send 입력시 모든값 초기화
  useEffect(() => {
    setTestbodyInfo({});
    setParamsInfo({});
    setQueriesInfo({});
    setTestUri(server + context + requestMaapingUri + methodUri);
    setRealParams([]);
    setReqUri("");
  }, [sendFlag]);
  const testString = `{"id":"test","pw":"1234"}`;
  const testObj = JSON.parse(testString);
  console.log("객체 =>", testObj);
  console.log("객체 키 값 =>", Object.keys(testObj));

  return (
    <div className="apiInputContainer">
      <span className="apiChoice">
        <MethodTest methodApiWord={requestMethod} />
      </span>
      <ApiInputUriSearch
        type="text"
        value={testUri}
        onChange={(e) => {
          setTestUri(e.target.value);
        }}
      />
      <button className="apiTestBtn" onClick={submitRequest}>
        SEND
      </button>
    </div>
  );
};

export default ApiInputUri;

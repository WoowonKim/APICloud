import axios from "axios";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RequestTypeInfo } from "../../pages/CreateApi/ApisType";
import { reBodyType } from "../../pages/TestApi";
import { useAppDispatch } from "../../Store/hooks";
import testApiSlice, { selectTestApi } from "../../Store/slice/testApi";
import { testAxiosDelete, testAxiosGet, testAxiosPost, testAxiosPut } from "../../util/tesxAxiosUtil";
import MethodTest from "./MethodTest";

export type list = {
  getInfo: RequestTypeInfo | undefined;
  testbodyInfo: reBodyType | undefined;
  setTestbodyInfo: Dispatch<SetStateAction<reBodyType | undefined>>;
};

const ApiInputUriSearch = styled.input`
  width: 50%;
  border: none;
  border-bottom: 1px solid #000000;
  border-right: 1px solid #000000;
  border-top: 1px solid #000000;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  padding: 1px 50px 1px 10px;
  outline: none;
  font-weight: 500;
  font-size: 14px;
  color: ${(props) => props.theme.color};
  background-color: ${(props) => props.theme.bgColor};
`;
const ApiInputUri = ({ getInfo, testbodyInfo, setTestbodyInfo }: list) => {
  const [getUri, setUri] = useState("");
  const [getMethodApi, setMethodApi] = useState("");
  const [sendFlag, setSendFlag] = useState(false);
  const dispatch = useAppDispatch();
  const info = useSelector(selectTestApi);
  useEffect(() => {
    if (getInfo) {
      setUri(getInfo?.controllers[info.getControllerInfomation].apis[info.getApisInfomation].uri);
      setMethodApi(getInfo?.controllers[info.getControllerInfomation].apis[info.getApisInfomation].method);
    }
  }, [getInfo, info.getControllerInfomation, info.getApisInfomation]);

  const headReq = getInfo?.controllers[info.getControllerInfomation].apis[info.getApisInfomation].headers;
  const [headObj, setHeadObj] = useState({});
  useEffect(() => {
    let test = {};
    headReq?.map((it, idx) => {
      const key = it.key;
      const value = it.value;
      test = { ...test, [key]: value };
    });
    setHeadObj(test);
  }, [getInfo, info.getControllerInfomation, info.getApisInfomation]);

  const server = Object.values(info.getServerUrl).toString();
  const context = Object.values(info.getContextUrl).toString();
  const testUri = server + context;
  // console.log("HEAD =>", headObj);
  // console.log("testbodyInfo =>", testbodyInfo);
  const requestMethod = getInfo?.controllers[info.getControllerInfomation].apis[info.getApisInfomation].method;

  const testGet = (uri: string) => {
    console.log("URI+>", uri);
    // console.log("METHOD =>", method);
    testAxiosGet(uri).then(() => {
      console.log("GET Success");
    });
  };
  const submitRequest = () => {
    switch (requestMethod) {
      case "get":
        axios.get("testt/test").then((res) => {
          console.log("RES=>", res);
        });
        break;
      // case "post":
      //   testAxiosPost(testUri, requestMethod, testbodyInfo).then(() => {
      //     console.log("POST Success");
      //   });
      //   break;
      // case "put":
      //   testAxiosPut(testUri, requestMethod).then(() => {
      //     console.log("Put Success");
      //   });
      //   break;
      // case "delete":
      //   testAxiosDelete(testUri, requestMethod).then(() => {
      //     console.log("Delete Success");
      //   });
      //   break;
      // case "patch":
      //   console.log("PATCH");
      //   break;
      // case "options":
      //   console.log("OPTIONS");
      //   break;
      // case "head":
      //   console.log("HEAD");
      //   break;
      default:
        break;
    }

    setSendFlag(!sendFlag);
  };

  useEffect(() => {
    setTestbodyInfo({});
  }, [sendFlag]);

  return (
    <div className="apiInputContainer">
      <span className="apiChoice">
        <MethodTest methodApiWord={getMethodApi} />
      </span>
      <ApiInputUriSearch type="text" defaultValue={testUri} />
      {/* <button className="apiTestBtn" onClick={submitRequest}> */}
      <button
        className="apiTestBtn"
        onClick={() => {
          axios.get("http://testt/test").then((res) => {
            console.log("RES=>", res);
          });
        }}
      >
        send
      </button>
    </div>
  );
};

export default ApiInputUri;

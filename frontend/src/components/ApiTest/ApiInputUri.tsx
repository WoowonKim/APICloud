import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RequestTypeInfo } from "../../pages/CreateApi/ApisType";
import { useAppDispatch } from "../../Store/hooks";
import testApiSlice, { selectTestApi } from "../../Store/slice/testApi";
import MethodTest from "./MethodTest";

export type list = {
  getInfo: RequestTypeInfo | undefined;
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

const ApiInputUri = ({ getInfo }: list) => {
  const [getUri, setUri] = useState("");
  const [getMethodApi, setMethodApi] = useState("");
  const dispatch = useAppDispatch();
  const info = useSelector(selectTestApi);

  useEffect(() => {
    if (getInfo) {
      setUri(getInfo?.controllers[info.getControllerInfomation].apis[info.getApisInfomation].uri);
      setMethodApi(getInfo?.controllers[info.getControllerInfomation].apis[info.getApisInfomation].method);
    }
  }, [getInfo, info.getControllerInfomation, info.getApisInfomation]);
  const addRequestFun = (e: number) => {
    dispatch(testApiSlice.actions.addRequest(e));
  };

  return (
    <div className="apiInputContainer">
      <span className="apiChoice">
        <MethodTest methodApiWord={getMethodApi} />
      </span>
      <ApiInputUriSearch type="text" defaultValue={getUri} />
      <button
        className="apiTestBtn"
        onClick={() => {
          addRequestFun(0);
        }}
      >
        성공
      </button>
      <button
        className="apiTestBtn"
        onClick={() => {
          addRequestFun(1);
        }}
      >
        실패
      </button>
      {/* <button className="apiTestBtn">저장하기</button> */}
    </div>
  );
};

export default ApiInputUri;

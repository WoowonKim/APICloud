import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RequestTypeInfo } from "../../pages/CreateApi/ApisType";
import { selectTestApi } from "../../Store/slice/testApi";
import MethodTest from "./MethodTest";

export type list = {
  getInfo: RequestTypeInfo | undefined;
};

const ApiInputUri = ({ getInfo }: list) => {
  const [getUri, setUri] = useState("");
  const [getMethodApi, setMethodApi] = useState("");
  const info = useSelector(selectTestApi);

  useEffect(() => {
    if (getInfo) {
      setUri(getInfo?.controllers[info.getControllerInfomation].apis[info.getApisInfomation].uri);
      setMethodApi(getInfo?.controllers[info.getControllerInfomation].apis[info.getApisInfomation].method);
    }
  }, [getInfo, info.getControllerInfomation, info.getApisInfomation]);

  return (
    <div className="apiInputContainer">
      <span className="apiChoice">
        <MethodTest methodApiWord={getMethodApi} />
      </span>
      <input className="apiInput" type="text" defaultValue={getUri} />
      <button className="apiTestBtn">보내기</button>
      <button className="apiTestBtn">저장하기</button>
    </div>
  );
};

export default ApiInputUri;

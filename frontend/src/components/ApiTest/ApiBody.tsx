import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  RequestBodyType,
  RequestTypeInfo,
} from "../../pages/CreateApi/ApisType";
import { reBodyType } from "../../pages/TestApi";
import { selectTestApi } from "../../Store/slice/testApi";

interface type {
  getInfo: RequestTypeInfo | undefined;
  setTestbodyInfo: Dispatch<SetStateAction<reBodyType | undefined>>;
  testbodyInfo: reBodyType | undefined;
  setBodyObject: Dispatch<SetStateAction<any>>;
}

const ApiBody = ({
  getInfo,
  testbodyInfo,
  setTestbodyInfo,
  setBodyObject,
}: type) => {
  const info = useSelector(selectTestApi);
  const [requestBody, setRequestBody] = useState<RequestBodyType>();
  const [codeInput, setcodeInput] = useState("");
  const [bodyString, setBodyString] = useState("");

  // RequestBody 작성 할 값 불러오기 및 기존 body값 초기화
  useEffect(() => {
    if (
      getInfo &&
      getInfo?.controllers &&
      getInfo.controllers.length > info.getControllerInfomation &&
      getInfo?.controllers[info.getControllerInfomation]?.apis &&
      getInfo?.controllers[info.getControllerInfomation].apis.length >
        info.getApisInfomation
    ) {
      setRequestBody(
        getInfo?.controllers[info.getControllerInfomation].apis[
          info.getApisInfomation
        ]?.requestBody
      );
      setTestbodyInfo({});
    }
  }, [getInfo, info.getControllerInfomation, info.getApisInfomation]);

  // 저장 버튼 클릭 시 body값 갱신 및 객체화 하는 inputbody 초기화
  const onSubmit = (e: any) => {
    e.preventDefault();
    const body = JSON.parse(bodyString);
    setBodyObject(body);
  };

  // TextArea TAB 처리
  const codeInputTabHandler = (event: {
    key: string;
    preventDefault: () => void;
  }) => {
    if (event.key === "Tab") {
      event.preventDefault();
      setcodeInput(codeInput + "\t");
    }
  };

  // TextArea TAB 처리
  const codeInputHandler = (event: {
    target: any;
    currentTarget: { value: React.SetStateAction<string> };
  }) => {
    setcodeInput(event.currentTarget.value);
    setBodyString(event.target.value);
  };

  return (
    <>
      {requestBody?.properties[0]?.name && (
        <div className="bodyTextAreaDiv">
          <textarea
            className="bodyTextArea"
            value={codeInput}
            onKeyDown={codeInputTabHandler}
            onChange={codeInputHandler}
            onBlur={onSubmit}
          />
        </div>
      )}
    </>
  );
};

export default ApiBody;

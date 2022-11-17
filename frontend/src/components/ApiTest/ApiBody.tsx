import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RequestBodyType, RequestTypeInfo } from "../../pages/CreateApi/ApisType";
import { reBodyType } from "../../pages/TestApi";
import { selectTestApi } from "../../Store/slice/testApi";
import { HeaderContatinerList, HeaderListInput, HeaderListTitle, HeaderListTitleCon } from "./Headerheader";

interface type {
  getInfo: RequestTypeInfo | undefined;
  setTestbodyInfo: Dispatch<SetStateAction<reBodyType | undefined>>;
  testbodyInfo: reBodyType | undefined;
}

const ApiBody = ({ getInfo, testbodyInfo, setTestbodyInfo }: type) => {
  const [requestBody, setRequestBody] = useState<RequestBodyType>();

  const [inputBody, setInputBody] = useState("");
  const [newBodyInfo, setNewBodyInfo] = useState({});

  const [test, setTest] = useState("");
  const info = useSelector(selectTestApi);

  // RequestBody 작성 할 값 불러오기 및 기존 body값 초기화
  useEffect(() => {
    if (getInfo) {
      setRequestBody(getInfo?.controllers[info.getControllerInfomation].apis[info.getApisInfomation].requestBody);
      setTestbodyInfo({});
    }
  }, [getInfo, info.getControllerInfomation, info.getApisInfomation]);

  // 전송할 body값 객체화
  useEffect(() => {
    let key = test;
    setNewBodyInfo({ [key]: inputBody });
  }, [inputBody]);

  // 저장 버튼 클릭 시 body값 갱신 및 객체화 하는 inputbody 초기화
  const onSubmit = (e: any) => {
    e.preventDefault();
    setTestbodyInfo({ ...testbodyInfo, ...newBodyInfo });
    setInputBody("");
  };

  return (
    <>
      {requestBody?.properties.map((it, idx) => (
        <div key={idx}>
          <HeaderContatinerList>
            <HeaderListTitleCon>
              <HeaderListTitle>{it.name}</HeaderListTitle>
            </HeaderListTitleCon>
            {it.name && (
              <div className="headerListContent">
                <form onSubmit={onSubmit}>
                  <HeaderListInput
                    type="text"
                    onChange={(e) => {
                      setInputBody(e.target.value);
                      setTest(it.name);
                    }}
                  />
                  <button>저장</button>
                </form>
              </div>
            )}
          </HeaderContatinerList>
        </div>
      ))}
    </>
  );
};

export default ApiBody;

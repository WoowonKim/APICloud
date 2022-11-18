import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  RequestBodyType,
  RequestTypeInfo,
} from "../../pages/CreateApi/ApisType";
import { reBodyType } from "../../pages/TestApi";
import { useAppSelector } from "../../Store/hooks";
import { selectTestApi } from "../../Store/slice/testApi";
import {
  HeaderContatinerList,
  HeaderListInput,
  HeaderListTitle,
  HeaderListTitleCon,
} from "./Headerheader";

interface type {
  getInfo: RequestTypeInfo | undefined;
  setTestbodyInfo: Dispatch<SetStateAction<reBodyType | undefined>>;
  testbodyInfo: reBodyType | undefined;
}

const ApiBody = ({ getInfo, testbodyInfo, setTestbodyInfo }: type) => {
  const info = useSelector(selectTestApi);
  const [requestBody, setRequestBody] = useState<RequestBodyType>();
  const [inputBody, setInputBody] = useState("");
  const [newBodyInfo, setNewBodyInfo] = useState({});
  const [test, setTest] = useState("");
  const [arrTest, setArrTest] = useState<[any, any][]>([]);

  // RequestBody 작성 할 값 불러오기 및 기존 body값 초기화
  useEffect(() => {
    if (getInfo) {
      setRequestBody(
        getInfo?.controllers[info.getControllerInfomation].apis[
          info.getApisInfomation
        ].requestBody
      );
      setTestbodyInfo({});
    }
  }, [getInfo, info.getControllerInfomation, info.getApisInfomation]);

  useEffect(() => {
    if (testbodyInfo) {
      setArrTest(Object.entries(testbodyInfo));
    }
  }, [testbodyInfo]);

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
      {requestBody?.properties &&
        requestBody.properties.length > 0 &&
        requestBody?.properties.map((it, idx) => (
          <div className="headerListTitleisHeader" key={idx}>
            <div className="apiKeyHeaderTitle">
              <p className="apiHeaderListPtag">{it.name}</p>
            </div>
            <div className="apiKeyHeaderTitleValueSubmit">
              <p className="apiHeaderListPtagInput">
                <input
                  className="apiHeaderListInputTag"
                  type="text"
                  onChange={(e) => {
                    setInputBody(e.target.value);
                    setTest(it.name);
                  }}
                  onBlur={onSubmit}
                />
              </p>
            </div>
            <div className="apiKeyHeaderTitleCheck">
              <p className="apiHeaderListButtonTag">SAVE</p>
            </div>
          </div>
          <div className="apiKeyHeaderTitleValueSubmit">
            <p className="apiHeaderListPtagInput">
              <input
                className="apiHeaderListInputTag"
                type="text"
                defaultValue={arrTest.length > idx ? arrTest[idx][1] : ""}
                onChange={e => {
                  setInputBody(e.target.value);
                  setTest(it.name);
                }}
                onBlur={onSubmit}
              />
            </p>
          </div>
          <div className="apiKeyHeaderTitleCheck">
            <p className="apiHeaderListButtonTag">SAVE</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default ApiBody;

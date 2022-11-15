import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RequestBodyType, RequestTypeInfo } from "../../pages/CreateApi/ApisType";
import { reBodyType } from "../../pages/TestApi";
import { useAppDispatch } from "../../Store/hooks";
import testApiSlice, { selectTestApi } from "../../Store/slice/testApi";
import { ChoiceText } from "../main/ApiList";
import { HeaderContatinerList, HeaderListInput, HeaderListTitle, HeaderListTitleCon } from "./Headerheader";

interface type {
  getInfo: RequestTypeInfo | undefined;
  setTestbodyInfo: Dispatch<SetStateAction<reBodyType | undefined>>;
  testbodyInfo: reBodyType | undefined;
}

const ApiBody = ({ getInfo, testbodyInfo, setTestbodyInfo }: type) => {
  const [requestBody, setRequestBody] = useState<RequestBodyType>();
  const [test, setTest] = useState("");
  const [bodyInfo, setBodyInfo] = useState({});
  const [inputBody, setInputBody] = useState("");
  const [newBodyInfo, setNewBodyInfo] = useState({});
  const info = useSelector(selectTestApi);

  useEffect(() => {
    if (getInfo) {
      setRequestBody(getInfo?.controllers[info.getControllerInfomation].apis[info.getApisInfomation].requestBody);
      setTestbodyInfo({});
      setBodyInfo({});
    }
  }, [getInfo, info.getControllerInfomation, info.getApisInfomation]);

  useEffect(() => {
    let key = test;
    setNewBodyInfo({ [key]: inputBody });
  }, [inputBody]);

  const onSubmit = (e: any) => {
    e.preventDefault();
    setBodyInfo({ ...bodyInfo, ...newBodyInfo });
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

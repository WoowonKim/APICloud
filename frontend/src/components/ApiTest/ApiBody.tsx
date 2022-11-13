import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  RequestBodyType,
  RequestTypeInfo,
} from "../../pages/CreateApi/ApisType";
import testApiSlice, { selectTestApi } from "../../Store/slice/testApi";
import { ChoiceText } from "../main/ApiList";
import {
  HeaderContatinerList,
  HeaderListInput,
  HeaderListTitle,
  HeaderListTitleCon,
} from "./Headerheader";

interface type {
  getInfo: RequestTypeInfo | undefined;
}

const ApiBody = ({ getInfo }: type) => {
  const [requestBody, setRequestBody] = useState<RequestBodyType>();
  const [test, setTest] = useState("");
  const [bodyInfo, setBodyInfo] = useState([{}]);
  const [inputBody, setInputBody] = useState("");
  const [newBodyInfo, setNewBodyInfo] = useState({});
  const info = useSelector(selectTestApi);

  useEffect(() => {
    if (getInfo) {
      setRequestBody(
        getInfo?.controllers[info.getControllerInfomation].apis[
          info.getApisInfomation
        ].requestBody
      );
    }
  }, [getInfo, info.getControllerInfomation, info.getApisInfomation]);

  useEffect(() => {
    let key = test;
    setNewBodyInfo({ [key]: inputBody });
  }, [inputBody]);

  const onSubmit = (e: any) => {
    e.preventDefault();
    setBodyInfo([...bodyInfo, newBodyInfo]);
    setInputBody("");
  };
  useEffect(() => {
    console.log("BodyInfo", bodyInfo);
  }, [bodyInfo]);

  return (
    <>
      {requestBody?.properties.map((it, idx) => (
        <div key={idx}>
          <HeaderContatinerList>
            <HeaderListTitleCon>
              <HeaderListTitle>{it.name}</HeaderListTitle>
            </HeaderListTitleCon>
            <div className="headerListContent">
              <form onSubmit={onSubmit}>
                <HeaderListInput
                  type="text"
                  onChange={e => {
                    setInputBody(e.target.value);
                    setTest(it.name);
                  }}
                />
                <button>저장</button>
              </form>
            </div>
          </HeaderContatinerList>
        </div>
      ))}
    </>
  );
};

export default ApiBody;

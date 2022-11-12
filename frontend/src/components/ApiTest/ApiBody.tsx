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
  // const [Addobject, setAddObject] = useState({});
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const requestBodyKey: string[] = [];
  useEffect(() => {
    if (requestBody) {
      requestBody?.properties.map((it, idx) => (requestBodyKey[idx] = it.name));
    }
  }, [requestBody, requestBodyKey]);

  const [todo, setTodo] = useState([{ name: "" }]);
  const [inputValue, setInputValue] = useState("");
  const [newTodo, setNewTodo] = useState({ name: "" });

  const [test, setTest] = useState("");
  const [bodyInfo, setBodyInfo] = useState([{}]);
  const [inputBody, setInputBody] = useState("");
  const [newBodyInfo, setNewBodyInfo] = useState({});

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
    bodyInfo.map((it, idx) => {
      if (it) {
        console.log("TE", it);
      }
    });
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

/**
 * 1. API 명세서에는 각기 다른 Properties를 갖고 있다.
 * 2. 해당 Method클릭 시 해당 Properties를 보여줘야 한다. => 해당 정보를 저장할 공간 마련 해야함
 * 3. Key값을 저장 한다면 Value값을 넣어야 한다. => (2)번만 완성되면 수월하게 동작할듯?
 *
 * a. input 값을 모두 작성하고 저장 버튼을 눌렀을 때 => 키값 : 벨류값 형태로  저장 시킨다
 * b. 저장 시킨 값(배열? 객체?)을 관리 배열에 합친다.
 * b-1. 값을 수정한다면 어떻게 할 것인지?
 *
 * 저장 버튼 클릭 시 => 키값 전송, 벨류값 전송.
 * 배열에 키값과 벨류값 합침
 */

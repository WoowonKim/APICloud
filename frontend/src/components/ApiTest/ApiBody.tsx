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

  const inputChg = (e: any) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    setNewTodo({ name: inputValue });
  }, [inputValue]);

  const onSubmit = (e: any) => {
    e.preventDefault();
    setTodo([...todo, newTodo]);
    setInputValue("");
  };
  console.log("TODO => ", todo);

  /**
   * 키 저장할 state 생성
   * 값 저장할 state 생성
   * 저장 버튼 클릭 시 두개 실행
   * useEffect 사용해서 키state : 값state 추가?
   */

  // const [requestKey, setRequestKey] = useState("");
  // const [requestValue, setRequestValue] = useState("");
  // const [newRequestValue, setNewRequestValue] = useState("");
  // const [requestArray, setRequestArray] = useState([""]);
  // useEffect(() => {
  //   setRequestArray([...requestArray, `${requestKey}:${newRequestValue}`]);
  // }, [requestKey]);
  // console.log("TEST==>", requestArray);
  const [test, setTest] = useState([]);

  return (
    <>
      {requestBody?.properties.map((it, idx) => (
        <div key={idx}>
          <HeaderContatinerList>
            <HeaderListTitleCon>
              <HeaderListTitle>{it.name}</HeaderListTitle>
            </HeaderListTitleCon>
            <div className="headerListContent">
              <HeaderListInput type="text" />
            </div>
          </HeaderContatinerList>
        </div>
      ))}
    </>
  );
};

export default ApiBody;

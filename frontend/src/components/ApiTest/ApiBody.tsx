import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RequestBodyType, RequestTypeInfo } from "../../pages/CreateApi/ApisType";
import testApiSlice, { selectTestApi } from "../../Store/slice/testApi";
import { ChoiceText } from "../main/ApiList";
import { HeaderContatinerList, HeaderListInput, HeaderListTitle, HeaderListTitleCon } from "./Headerheader";

interface type {
  getInfo: RequestTypeInfo | undefined;
}
const ApiBody = ({ getInfo }: type) => {
  const [requestBody, setRequestBody] = useState<RequestBodyType>();
  const [Addobject, setAddObject] = useState([""]);
  const info = useSelector(selectTestApi);

  useEffect(() => {
    if (getInfo) {
      setRequestBody(getInfo?.controllers[info.getControllerInfomation].apis[info.getApisInfomation].requestBody);
    }
  }, [getInfo, info.getControllerInfomation, info.getApisInfomation]);

  const requestBodyKey: string[] = [];
  useEffect(() => {
    if (requestBody) {
      requestBody?.properties.map((it, idx) => (requestBodyKey[idx] = it.name));
    }
  }, [requestBody]);

  return (
    <>
      {requestBody?.properties.map((it, idx) => (
        <>
          <HeaderContatinerList key={idx}>
            <HeaderListTitleCon>
              <HeaderListTitle>{it.name}</HeaderListTitle>
            </HeaderListTitleCon>
            <div className="headerListContent">
              <HeaderListInput
                type="text"
                // onChange={(e) => {
                // setAddObject(`${it.name} = ${e.target.value}`);
                // '            setAddObject(
                //               {...Addobject,}
                //             );
                //           }}'
              />
              <button>저장</button>
            </div>
          </HeaderContatinerList>
        </>
      ))}
    </>
  );
};

export default ApiBody;

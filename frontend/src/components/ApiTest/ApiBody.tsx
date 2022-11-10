import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RequestBodyType, RequestTypeInfo } from "../../pages/CreateApi/ApisType";
import testApiSlice, { selectTestApi } from "../../Store/slice/testApi";
import { ChoiceText } from "../main/ApiList";
import { HeaderContatinerList, HeaderListInput, HeaderListTitle } from "./Headerheader";

interface type {
  getInfo: RequestTypeInfo | undefined;
}
const ApiBody = ({ getInfo }: type) => {
  const [requestBody, setRequestBody] = useState<RequestBodyType>();
  const [Addobject, setAddObject] = useState({});
  const info = useSelector(selectTestApi);

  useEffect(() => {
    if (getInfo) {
      setRequestBody(getInfo?.controllers[info.getControllerInfomation].apis[info.getApisInfomation].requestBody);
    }
  }, [getInfo, info.getControllerInfomation, info.getApisInfomation]);

  return (
    <div className="apiHeaderContainer">
      <ChoiceText>Body</ChoiceText>
      <div>
        {requestBody?.properties.map((it, idx) => (
          <HeaderContatinerList key={idx}>
            <div className="headerListTitle">
              <HeaderListTitle>{it.name}</HeaderListTitle>
            </div>
            <div className="headerListContent">
              <p>
                <HeaderListInput
                  type="text"
                  onChange={(e) => {
                    setAddObject(`${it.name} = ${e.target.value}`);
                  }}
                />
              </p>
            </div>
          </HeaderContatinerList>
        ))}
      </div>
    </div>
  );
};

export default ApiBody;

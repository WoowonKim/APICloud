import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RequestBodyType, RequestTypeInfo } from "../../pages/CreateApi/ApisType";
import testApiSlice, { selectTestApi } from "../../Store/slice/testApi";

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
    <div className="apiBodyContainer">
      <span>Body</span>
      {requestBody?.properties.map((it, idx) => (
        <div key={idx}>
          <p>{it.name}</p>
          <input
            type="text"
            onChange={(e) => {
              setAddObject(`${it.name} = ${e.target.value}`);
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default ApiBody;

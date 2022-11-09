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
    <div className="apiHeaderContainer">
      <span className="headerClickList">Body</span>
      <div>
        {requestBody?.properties.map((it, idx) => (
          <div key={idx} className="headerContainerList">
            <div className="headerListTitle">
              <p>{it.name}</p>
            </div>
            <div className="headerListContent">
              <p>
                <input
                  type="text"
                  onChange={(e) => {
                    setAddObject(`${it.name} = ${e.target.value}`);
                  }}
                />
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApiBody;

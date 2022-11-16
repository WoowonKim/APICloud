import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RequestTypeInfo } from "../../pages/CreateApi/ApisType";
import { selectTestApi } from "../../Store/slice/testApi";

interface type {
  getInfo: RequestTypeInfo | undefined;
}
const ApiResponse = ({ getInfo }: type) => {
  const info = useSelector(selectTestApi);

  const [getStatusInfo, setGetStatusInfo] = useState<number>();
  const [getStatusData, setGetStatusData] = useState<any>();

  console.log("getDATE => ", getStatusData);

  // Response 정보 갖고 오기.
  useEffect(() => {
    setGetStatusInfo(info.getResponseStatus);
    setGetStatusData(info.getResponseData);
  }, [info]);

  const [arr, setArr] = useState<[string, string][]>();
  useEffect(() => {
    setArr(Object.entries(info.getResponseSuccessHeader));
  }, [getInfo]);

  return (
    <div>
      <div className="apiResponseResultCommonState">
        <p>Status : {getStatusInfo}</p>
      </div>
      <div className="apiResponseResult">
        {info.getResponseListNumber === 0 && (
          <div>
            {getStatusInfo === 200 ? (
              <div>
                <div className="resltResponseHeaderContainer">
                  <div>
                    <p className="centercalcu">{"{"}</p>
                    <div>
                      {arr?.map((it, idx) => (
                        <div className="objectResponseResult">
                          <p className="titleResponseResult">"{it[0]}" :</p>
                          <p className="titleResponseResult">"{it[1]}",</p>
                        </div>
                      ))}
                    </div>
                    <p className="centercalcu">{"}"}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <p className="errorResponseResult">
                  {info.getResponseErroStatusMessage}...
                </p>
              </div>
            )}
          </div>
        )}
        {info.getResponseListNumber === 1 && (
          <div>
            {getStatusInfo === 200 ? (
              <div>
                <div className="resltResponseHeaderContainer">
                  <div>
                    <p className="centercalcu">{"{"}</p>
                    <span className="resultResponseHeaderContent">
                      {getStatusData && JSON.stringify(getStatusData)}
                    </span>
                    <p className="centercalcu">{"}"}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <p className="errorResponseResult">
                  {info.getResponseErroStatusMessage}...
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ApiResponse;

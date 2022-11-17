import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RequestTypeInfo } from "../../pages/CreateApi/ApisType";
import { reBodyType } from "../../pages/TestApi";
import { selectTestApi } from "../../Store/slice/testApi";

interface type {
  getInfo: RequestTypeInfo | undefined;
  testbodyInfo: reBodyType | undefined;
}
const ApiResponse = ({ getInfo, testbodyInfo }: type) => {
  const info = useSelector(selectTestApi);

  const [getStatusInfo, setGetStatusInfo] = useState<number>();
  const [getStatusData, setGetStatusData] = useState<any>();
  const [bodyDataFlag, setBodyDataFlag] = useState(false);
  const [bodyData, setBodyData] = useState<[string, string][]>();
  const [arr, setArr] = useState<[string, string][]>();
  const [typeFlag, setTypeFlag] = useState(false);
  // Response Body 불러와서 객체형태로 뿌려주기
  useEffect(() => {
    if (getStatusData !== undefined && typeof getStatusData !== typeof "") {
      setBodyData(Object.entries(getStatusData));
    }
  }, [info.getFlag, bodyDataFlag]);

  // Response 정보 갖고 오기.
  useEffect(() => {
    setGetStatusInfo(info.getResponseStatus);
    setGetStatusData(info.getResponseData);
    setBodyDataFlag(!bodyDataFlag);
  }, [info]);

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
                    <p className="centercalcu">{"}"}</p>{" "}
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <p className="errorResponseResult">{info.getResponseErroStatusMessage}...</p>
              </div>
            )}
          </div>
        )}
        {info.getResponseListNumber === 1 && (
          <div>
            {getStatusInfo === 200 ? (
              <div>
                {typeof getStatusData !== typeof "" && <p className="centercalcu">{"{"}</p>}
                <div className="resltResponseHeaderContainer">
                  {typeof getStatusData !== typeof "" && (
                    <div>
                      {bodyData?.map((it, idx) => (
                        <div className="objectResponseResult">
                          <p className="titleResponseResult">"{it[0]} : "</p>
                          <p className="titleResponseResult">"{it[1]}",</p>
                        </div>
                      ))}
                    </div>
                  )}
                  {typeof getStatusData === typeof "" && (
                    <div>
                      <p>{getStatusData}</p>
                    </div>
                  )}
                </div>
                {typeof getStatusData !== typeof "" && <p className="centercalcu">{"}"}</p>}
              </div>
            ) : (
              <div>
                <p className="errorResponseResult">{info.getResponseErroStatusMessage}...</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ApiResponse;

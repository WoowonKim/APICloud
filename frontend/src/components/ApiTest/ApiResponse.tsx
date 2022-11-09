import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RequestTypeInfo } from "../../pages/CreateApi/ApisType";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { mainApi } from "../../Store/slice/mainApi";
import { getApiRequestInfo, selectTestApi } from "../../Store/slice/testApi";

const dummy = {
  status: 200,
  message: "ok",
  header: {
    contentType: "application/json",
    contentLength: "calculated when request is sent",
    Host: "calculated when request is sent",
    Accept: "*/*",
    AcceptEncoding: "gzip, deflate, br",
    Connection: "keep-alive",
  },
  result: {
    id: "zero",
    email: "zero",
    password: "1q2w3e",
    token: 1234,
  },
};
interface type {
  getInfo: RequestTypeInfo | undefined;
}
const ApiResponse = ({ getInfo }: type) => {
  const info = useSelector(selectTestApi);
  const [getSuccess, setGetSuccess] = useState(0);
  const [responseStatus, setResponseStatus] = useState(0);
  useEffect(() => {
    if (getInfo) {
      setResponseStatus(info.getRequest);
      info.getRequest === 0
        ? setGetSuccess(getInfo?.controllers[info.getControllerInfomation].apis[info.getApisInfomation].responses.success.status)
        : setGetSuccess(getInfo?.controllers[info.getControllerInfomation].apis[info.getApisInfomation].responses.fail.status);
    }
  }, [getInfo, info.getControllerInfomation, info.getApisInfomation, info.getRequest]);
  const [responseFlag, setResponseFlag] = useState<number | null>(1);
  const flag = (e: React.SetStateAction<number | null>) => {
    setResponseFlag(e);
  };
  const testObj = Object.entries(dummy.result);
  const testHeaderObj = Object.entries(dummy.header);
  const start = "{";
  const end = "}";
  return (
    <div className="apiResponseContainer">
      <span
        onClick={() => {
          flag(0);
        }}
        className={responseFlag === 0 ? "headerClickList" : "headerNoClicklist"}
      >
        Header
      </span>
      <span
        onClick={() => {
          flag(1);
        }}
        className={responseFlag === 1 ? "headerClickList" : "headerNoClicklist"}
      >
        Body
      </span>
      <span
        onClick={() => {
          flag(2);
        }}
        className={responseFlag === 2 ? "headerClickList" : "headerNoClicklist"}
      >
        Cookie
      </span>
      <div className="apiResponseResultCommonState">
        <p>Status : {getSuccess}</p>
      </div>
      <div className="apiResponseResult">
        {responseFlag === 0 &&
          (responseStatus === 0 ? (
            <div>
              {testHeaderObj.map((it, idx) => (
                <div className="resltResponseHeaderContainer" key={idx}>
                  <div className="resultResponseTitleContainer">
                    <span className="resultResponseHeaderTitle">{it[0]} : </span>
                  </div>
                  <div>
                    <span className="resultResponseHeaderContent"> {it[1]}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <p> 400Error...</p>
            </div>
          ))}
        {responseFlag === 1 &&
          (responseStatus === 0 ? (
            <div>
              <p>{start}</p>
              {testObj.map((it, idx) => (
                <div className="resultResponseContainer" key={idx}>
                  <span className="resultResponseBody">"{it[0]}" : </span>
                  {typeof it[1] === "number" ? (
                    <span className="resultResponseBodySubNum"> {it[1]}</span>
                  ) : (
                    <span className="resultResponseBodySub"> "{it[1]}"</span>
                  )}
                </div>
              ))}
              <p>{end}</p>
            </div>
          ) : (
            <div>
              <p>400Error...</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ApiResponse;

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RequestTypeInfo } from "../../pages/CreateApi/ApisType";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { mainApi } from "../../Store/slice/mainApi";
import { getApiRequestInfo, selectTestApi } from "../../Store/slice/testApi";

interface type {
  getInfo: RequestTypeInfo | undefined;
}
const ApiResponse = ({ getInfo }: type) => {
  const info = useSelector(selectTestApi);
  const [responseFlag, setResponseFlag] = useState<number | null>(1);

  const [getStatusInfo, setGetStatusInfo] = useState<number>();
  const [getStatusText, setGetStatusText] = useState<string>();
  const [getStatusData, setGetStatusData] = useState<any>();

  // 값 변경을 위한 flag 변수
  const flag = (e: React.SetStateAction<number | null>) => {
    setResponseFlag(e);
  };

  // Response 정보 갖고 오기.
  useEffect(() => {
    setGetStatusInfo(info.getResponseStatus);
    setGetStatusText(info.getResponseStatusText);
    setGetStatusData(info.getResponseData);
  }, [info]);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [title, setTitle] = useState<string[]>([]);
  const [content, setContent] = useState<string[]>([]);
  const headerInfo = JSON.stringify(info?.getResponseSuccessHeader);

  const [arr, setArr] = useState<[string, string][]>();
  const test = info?.getResponseSuccessHeader;
  useEffect(() => {
    for (let i = 0; i < headerInfo.length; i++) {
      const word = headerInfo.charAt(i);
      if (word === "{") {
        setStart(word);
      }
      if (word === "}") {
        setEnd(word);
      }
    }
    setArr(Object.entries(info.getResponseSuccessHeader));
    arr?.map((it, idx) => {
      setTitle([...title, it[0]]);
      setContent([...content, it[1]]);
    });
  }, [headerInfo]);

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
        <p>Status : {getStatusInfo}</p>
        <p>StatusText : {getStatusText}</p>
      </div>
      <div className="apiResponseResult">
        {responseFlag === 0 &&
          // 헤더값 불러오기
          (getStatusInfo === 200 ? (
            <div>
              <div className="resltResponseHeaderContainer">
                <div>
                  <span className="resultResponseHeaderContent">{headerInfo && headerInfo}</span>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <p>{info.getResponseErroStatusMessage}</p>
            </div>
          ))}
        {responseFlag === 1 &&
          //응답값 불러오기
          (getStatusInfo === 200 ? (
            <div>
              <div className="resltResponseHeaderContainer">
                <div>
                  <span className="resultResponseHeaderContent">{getStatusData && JSON.stringify(getStatusData)}</span>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <p>{info.getResponseErroStatusMessage}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ApiResponse;

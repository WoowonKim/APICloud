import { type } from "os";
import React, { useState } from "react";

const dummy = {
  status: 200,
  message: "ok",
  result: {
    id: "zero",
    email: "zero",
    password: "1q2w3e",
    token: 1234,
  },
};

const ApiResponse = () => {
  const [responseFlag, setResponseFlag] = useState<number | null>(1);
  const flag = (e: React.SetStateAction<number | null>) => {
    setResponseFlag(e);
  };
  const testObj = Object.entries(dummy.result);
  const start = "{";
  const end = "}";
  return (
    <div className="apiResponseContainer">
      <p className="apiHeaderMainTitle">Response</p>
      <span
        onClick={() => {
          flag(0);
        }}
        className={responseFlag == 0 ? "headerClickList" : "headerNoClicklist"}
      >
        Header
      </span>
      <span
        onClick={() => {
          flag(1);
        }}
        className={responseFlag == 1 ? "headerClickList" : "headerNoClicklist"}
      >
        Body
      </span>
      <span
        onClick={() => {
          flag(2);
        }}
        className={responseFlag == 2 ? "headerClickList" : "headerNoClicklist"}
      >
        Cookie
      </span>
      <div className="apiResponseResult">
        <div className="apiResponseResultCommonState">
          <p className="apiResponseResultStatus">Status : {dummy.status}</p>
          <p className="apiResponseResultMessage">Message : {dummy.message}</p>
        </div>
        {responseFlag == 1 ? (
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
          <></>
        )}
      </div>
    </div>
  );
};

export default ApiResponse;

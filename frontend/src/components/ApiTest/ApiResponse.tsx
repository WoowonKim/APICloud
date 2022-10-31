import React, { useState } from "react";

const dummy = {
  userId: "zerojei0423@naver.com",
  pw: "1q2w3e4r",
  token: "1q2w3e4r5t6y7u",
};
const ApiResponse = () => {
  const [responseFlag, setResponseFlag] = useState<number | null>(1);
  const flag = (e: React.SetStateAction<number | null>) => {
    setResponseFlag(e);
  };
  const obj = JSON.stringify(dummy).split(",");
  return (
    <div className="ApiResponseContainer">
      <p>Response</p>
      <span
        onClick={() => {
          flag(0);
        }}
        className={responseFlag == 0 ? "HeaderClickList" : "HeaderMoClicklist"}
      >
        Header
      </span>
      <span
        onClick={() => {
          flag(1);
        }}
        className={responseFlag == 1 ? "HeaderClickList" : "HeaderMoClicklist"}
      >
        Body
      </span>
      <span
        onClick={() => {
          flag(2);
        }}
        className={responseFlag == 2 ? "HeaderClickList" : "HeaderMoClicklist"}
      >
        Cookie
      </span>
      <div className="ApiResponseResult">
        {responseFlag == 1 ? (
          <div>
            {obj.map((string, idx) => {
              return <p key={idx}>{string}</p>;
            })}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default ApiResponse;

import React, { useState } from "react";

const dummy = {
  status: 200,
  message: "ok",
  result: {
    user: {
      id: "zero",
      email: "zero",
      password: "1q2w3e",
    },
  },
};
const ApiResponse = () => {
  const [responseFlag, setResponseFlag] = useState<number | null>(1);
  const flag = (e: React.SetStateAction<number | null>) => {
    setResponseFlag(e);
  };
  const obj = JSON.stringify(dummy).split(",");
  return (
    <div className="apiResponseContainer">
      <p>Response</p>
      <span
        onClick={() => {
          flag(0);
        }}
        className={responseFlag == 0 ? "headerClickList" : "headerMoClicklist"}
      >
        Header
      </span>
      <span
        onClick={() => {
          flag(1);
        }}
        className={responseFlag == 1 ? "headerClickList" : "headerMoClicklist"}
      >
        Body
      </span>
      <span
        onClick={() => {
          flag(2);
        }}
        className={responseFlag == 2 ? "headerClickList" : "headerMoClicklist"}
      >
        Cookie
      </span>
      <div className="apiResponseResult">
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

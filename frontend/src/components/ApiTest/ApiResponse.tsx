import React from "react";

const dummy = {
  userId: "zerojei0423@naver.com",
  pw: "1q2w3e4r",
  token: "1q2w3e4r5t6y7u",
};
const ApiResponse = () => {
  const obj = JSON.stringify(dummy).split(",");
  return (
    <div>
      {obj.map((string, idx) => {
        return <p key={idx}>{string}</p>;
      })}
    </div>
  );
};

export default ApiResponse;

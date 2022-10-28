import React from "react";

const ApiAddress = () => {
  return (
    <div className="ApiSide">
      <div className="sideAddress">
        <p className="sideText">사이트 주소</p>
        <p> https://localhost:8080</p>
      </div>

      <div className="sideUri">
        <p className="sideText">공통 URI</p>
        <p> /ApiCloud</p>
      </div>
    </div>
  );
};

export default ApiAddress;

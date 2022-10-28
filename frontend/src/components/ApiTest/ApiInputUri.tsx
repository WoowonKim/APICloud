import React, { useState } from "react";
import MethodTest from "./MethodTest";

const ApiInputUri = () => {
  return (
    <div className="ApiInputContainer">
      <span className="ApiChoice">
        <MethodTest />
      </span>
      <input className="ApiInput" type="text" placeholder="URI를 입력" />
      <button className="ApiTestBtn">보내기</button>
    </div>
  );
};

export default ApiInputUri;

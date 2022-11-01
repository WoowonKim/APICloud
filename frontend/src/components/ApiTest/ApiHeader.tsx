import React, { useState } from "react";
import Headerheader from "./Headerheader";
import HeaderToken from "./HeaderToken";

const ApiHeader = () => {
  const [headerTokenFlag, setHeaderTokenFlag] = useState<number | null>(0);
  return (
    <div className="apiHeaderContainer">
      <span
        className={headerTokenFlag == 0 ? "headerClickList" : "headerMoClicklist"}
        onClick={() => {
          setHeaderTokenFlag(0);
        }}
      >
        Header
      </span>
      <span
        className={headerTokenFlag == 1 ? "headerClickList" : "headerMoClicklist"}
        onClick={() => {
          setHeaderTokenFlag(1);
        }}
      >
        Token
      </span>
      <div className="headerList">{headerTokenFlag == 0 ? <Headerheader /> : <HeaderToken />}</div>
    </div>
  );
};

export default ApiHeader;

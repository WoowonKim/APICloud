import React, { useState } from "react";
import Headerheader from "./Headerheader";
import HeaderToken from "./HeaderToken";

interface type {
  sideApiList: number;
}

const ApiHeader = ({ sideApiList }: type) => {
  const [headerTokenFlag, setHeaderTokenFlag] = useState<number | null>(0);
  return (
    <div className="apiHeaderContainer">
      <p className="apiHeaderMainTitle">Request</p>
      <span
        className={headerTokenFlag == 0 ? "headerClickList" : "headerNoClicklist"}
        onClick={() => {
          setHeaderTokenFlag(0);
        }}
      >
        Header
      </span>
      <span
        className={headerTokenFlag == 1 ? "headerClickList" : "headerNoClicklist"}
        onClick={() => {
          setHeaderTokenFlag(1);
        }}
      >
        Token
      </span>
      <div className="headerList">{headerTokenFlag == 0 ? <Headerheader sideApiList={sideApiList} /> : <HeaderToken sideApiList={sideApiList} />}</div>
    </div>
  );
};

export default ApiHeader;

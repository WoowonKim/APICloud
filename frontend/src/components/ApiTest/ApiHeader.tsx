import React, { useState } from "react";
import { RequestTypeInfo } from "../../pages/CreateApi/ApisType";
import Headerheader from "./Headerheader";
import HeaderToken from "./HeaderToken";

interface type {
  getInfo: RequestTypeInfo | undefined;
}

const ApiHeader = ({ getInfo }: type) => {
  const [headerTokenFlag, setHeaderTokenFlag] = useState<number | null>(0);
  return (
    <div className="apiHeaderContainer">
      <p className="apiHeaderMainTitle">Request</p>
      <span
        className={headerTokenFlag === 0 ? "headerClickList" : "headerNoClicklist"}
        onClick={() => {
          setHeaderTokenFlag(0);
        }}
      >
        Header
      </span>
      <div className="headerList">{headerTokenFlag === 0 ? <Headerheader getInfo={getInfo} /> : <HeaderToken />}</div>
    </div>
  );
};

export default ApiHeader;

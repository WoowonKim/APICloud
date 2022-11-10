import React, { useState } from "react";
import { RequestTypeInfo } from "../../pages/CreateApi/ApisType";
import ApiBody from "./ApiBody";
import Headerheader from "./Headerheader";
import HeaderToken from "./HeaderToken";

interface type {
  getInfo: RequestTypeInfo | undefined;
}

const ApiHeader = ({ getInfo }: type) => {
  const [headerTokenFlag, setHeaderTokenFlag] = useState<number | null>(0);
  return (
    <div className="apiHeaderContainer">
      <span
        className={headerTokenFlag === 0 ? "headerClickList" : "headerNoClicklist"}
        onClick={() => {
          setHeaderTokenFlag(0);
        }}
      >
        Header
      </span>
      <span
        className={headerTokenFlag === 1 ? "headerClickList" : "headerNoClicklist"}
        onClick={() => {
          setHeaderTokenFlag(1);
        }}
      >
        Token
      </span>
      <div className="">{headerTokenFlag === 0 && <Headerheader getInfo={getInfo} />}</div>
    </div>
  );
};

export default ApiHeader;

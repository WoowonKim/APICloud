import React, { useState } from "react";
import { HeaderType } from "../../pages/TestApi";
import Headerheader from "./Headerheader";
import HeaderToken from "./HeaderToken";

interface Props {
  headerApi: HeaderType;
}

const ApiHeader = ({ headerApi }: Props) => {
  const [headerTokenFlag, setHeaderTokenFlaf] = useState<number | null>(0);
  return (
    <div className="apiHeaderContainer">
      <span
        className={headerTokenFlag == 0 ? "headerClickList" : "headerMoClicklist"}
        onClick={() => {
          setHeaderTokenFlaf(0);
        }}
      >
        Header
      </span>
      <span
        className={headerTokenFlag == 1 ? "headerClickList" : "headerMoClicklist"}
        onClick={() => {
          setHeaderTokenFlaf(1);
        }}
      >
        Token
      </span>
      <div className="headerList">{headerTokenFlag == 0 ? <Headerheader headerApi={headerApi} /> : <HeaderToken headerApi={headerApi} />}</div>
    </div>
  );
};

export default ApiHeader;

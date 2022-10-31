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
    <div className="ApiHeaderContainer">
      <span
        className={headerTokenFlag == 0 ? "HeaderClickList" : "HeaderMoClicklist"}
        onClick={() => {
          setHeaderTokenFlaf(0);
        }}
      >
        Header
      </span>
      <span
        className={headerTokenFlag == 1 ? "HeaderClickList" : "HeaderMoClicklist"}
        onClick={() => {
          setHeaderTokenFlaf(1);
        }}
      >
        Token
      </span>
      <div className="HeaderList">{headerTokenFlag == 0 ? <Headerheader headerApi={headerApi} /> : <HeaderToken headerApi={headerApi} />}</div>
    </div>
  );
};

export default ApiHeader;

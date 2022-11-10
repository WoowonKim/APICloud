import React, { useState } from "react";
import { RequestTypeInfo } from "../../pages/CreateApi/ApisType";
import { NoChoiceText, ChoiceText } from "../main/ApiList";
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
      <ChoiceText
        onClick={() => {
          setHeaderTokenFlag(0);
        }}
      >
        Header
      </ChoiceText>
      {/* {headerTokenFlag === 0 && (
        <>
          <ChoiceText
            onClick={() => {
              setHeaderTokenFlag(0);
            }}
          >
            Header
          </ChoiceText>
          <NoChoiceText
            onClick={() => {
              setHeaderTokenFlag(1);
            }}
          >
            Token
          </NoChoiceText>
        </>
      )}
      {headerTokenFlag === 1 && (
        <>
          <NoChoiceText
            onClick={() => {
              setHeaderTokenFlag(0);
            }}
          >
            Header
          </NoChoiceText>
          <ChoiceText
            onClick={() => {
              setHeaderTokenFlag(1);
            }}
          >
            Token
          </ChoiceText>
        </>
      )} */}
      <div className="">{headerTokenFlag === 0 && <Headerheader getInfo={getInfo} />}</div>
    </div>
  );
};

export default ApiHeader;

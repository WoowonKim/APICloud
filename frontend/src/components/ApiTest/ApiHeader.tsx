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
    <div className="requestInfosetting">
      <div className="requestInfoHeaderSetting">
        {headerTokenFlag === 0 && (
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
            <Headerheader getInfo={getInfo} />
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
            <HeaderToken />
          </>
        )}
      </div>
      <div className="requestInfoBodySetting">
        <ChoiceText>Body</ChoiceText>
        <ApiBody getInfo={getInfo}></ApiBody>
      </div>
    </div>
  );
};

export default ApiHeader;

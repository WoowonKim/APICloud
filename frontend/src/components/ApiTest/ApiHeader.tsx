import React, { Dispatch, SetStateAction, useState } from "react";
import { RequestTypeInfo } from "../../pages/CreateApi/ApisType";
import { reBodyType } from "../../pages/TestApi";
import { NoChoiceText, ChoiceText } from "../main/ApiList";
import ApiBody from "./ApiBody";
// import ApiParams from "./ApiParams";
import Headerheader from "./Headerheader";
import HeaderToken from "./HeaderToken";

interface type {
  getInfo: RequestTypeInfo | undefined;
  setTestbodyInfo: Dispatch<SetStateAction<reBodyType | undefined>>;
  testbodyInfo: reBodyType | undefined;
  setParamsInfo: Dispatch<SetStateAction<reBodyType | undefined>>;
  paramsInfo: reBodyType | undefined;
}

const ApiHeader = ({ getInfo, testbodyInfo, setTestbodyInfo, paramsInfo, setParamsInfo }: type) => {
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
            <NoChoiceText
              onClick={() => {
                setHeaderTokenFlag(2);
              }}
            >
              Params
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
            <NoChoiceText
              onClick={() => {
                setHeaderTokenFlag(2);
              }}
            >
              Params
            </NoChoiceText>
            <HeaderToken />
          </>
        )}
        {headerTokenFlag === 2 && (
          <>
            <NoChoiceText
              onClick={() => {
                setHeaderTokenFlag(0);
              }}
            >
              Header
            </NoChoiceText>
            <NoChoiceText
              onClick={() => {
                setHeaderTokenFlag(1);
              }}
            >
              Token
            </NoChoiceText>
            <ChoiceText
              onClick={() => {
                setHeaderTokenFlag(2);
              }}
            >
              Params
            </ChoiceText>
            {/* <Headerheader getInfo={getInfo} /> */}
            {/* <ApiParams
              getInfo={getInfo}
              paramsInfo={paramsInfo}
              setParamsInfo={setParamsInfo}
            /> */}
          </>
        )}
      </div>
      <div className="requestInfoBodySetting">
        <ChoiceText>Body</ChoiceText>
        <ApiBody getInfo={getInfo} testbodyInfo={testbodyInfo} setTestbodyInfo={setTestbodyInfo}></ApiBody>
      </div>
    </div>
  );
};

export default ApiHeader;

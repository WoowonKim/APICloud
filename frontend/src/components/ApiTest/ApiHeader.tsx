import React, { Dispatch, SetStateAction, useState } from "react";
import { RequestTypeInfo } from "../../pages/CreateApi/ApisType";
import { reBodyType } from "../../pages/TestApi";
import { useAppSelector } from "../../Store/hooks";
import { selectTestApi } from "../../Store/slice/testApi";
import ApiBody from "./ApiBody";
import ApiParams from "./ApiParams";
import Headerheader from "./Headerheader";
import HeaderQueries from "./HeaderQueries";
import styled from "styled-components";

interface type {
  getInfo: RequestTypeInfo | undefined;
  setTestbodyInfo: Dispatch<SetStateAction<reBodyType | undefined>>;
  testbodyInfo: reBodyType | undefined;
  setParamsInfo: Dispatch<SetStateAction<reBodyType | undefined>>;
  paramsInfo: reBodyType | undefined;
  queriesInfo: reBodyType | undefined;
  setQueriesInfo: Dispatch<SetStateAction<reBodyType | undefined>>;
  setBodyObject: Dispatch<SetStateAction<any>>;
}

export const ApiDetail = styled.div`
  margin-left: 14px;
`;

const ApiHeader = ({
  getInfo,
  testbodyInfo,
  setTestbodyInfo,
  paramsInfo,
  setParamsInfo,
  queriesInfo,
  setQueriesInfo,
  setBodyObject,
}: type) => {
  const info = useAppSelector(selectTestApi);
  return (
    <ApiDetail>
      {info.getHeadListNumber === 0 && <Headerheader getInfo={getInfo} />}
      {info.getHeadListNumber === 1 && (
        <ApiBody
          getInfo={getInfo}
          testbodyInfo={testbodyInfo}
          setTestbodyInfo={setTestbodyInfo}
          setBodyObject={setBodyObject}
        />
      )}
      {info.getHeadListNumber === 2 && (
        <HeaderQueries
          getInfo={getInfo}
          queriesInfo={queriesInfo}
          setQueriesInfo={setQueriesInfo}
        />
      )}
      {info.getHeadListNumber === 3 && (
        <ApiParams
          getInfo={getInfo}
          paramsInfo={paramsInfo}
          setParamsInfo={setParamsInfo}
        />
      )}
    </ApiDetail>
  );
};

export default ApiHeader;

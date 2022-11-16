import React, { Dispatch, SetStateAction, useState } from "react";
import { RequestTypeInfo } from "../../pages/CreateApi/ApisType";
import { reBodyType } from "../../pages/TestApi";
import { useAppSelector } from "../../Store/hooks";
import { selectTestApi } from "../../Store/slice/testApi";
import { NoChoiceText, ChoiceText } from "../main/ApiList";
import ApiBody from "./ApiBody";
import ApiParams from "./ApiParams";
import Headerheader from "./Headerheader";
import HeaderQueries from "./HeaderQueries";

interface type {
  getInfo: RequestTypeInfo | undefined;
  setTestbodyInfo: Dispatch<SetStateAction<reBodyType | undefined>>;
  testbodyInfo: reBodyType | undefined;
  setParamsInfo: Dispatch<SetStateAction<reBodyType | undefined>>;
  paramsInfo: reBodyType | undefined;
  queriesInfo: reBodyType | undefined;
  setQueriesInfo: Dispatch<SetStateAction<reBodyType | undefined>>;
}

const ApiHeader = ({ getInfo, testbodyInfo, setTestbodyInfo, paramsInfo, setParamsInfo, queriesInfo, setQueriesInfo }: type) => {
  const [headerTokenFlag, setHeaderTokenFlag] = useState<number | null>(0);
  const info = useAppSelector(selectTestApi);
  return <div className="headerList">TEST</div>;
};

export default ApiHeader;

// <div className="requestInfosetting">
//   <div className="requestInfoHeaderSetting">
//     {headerTokenFlag === 0 && (
//       <>
//         <ChoiceText
//           onClick={() => {
//             setHeaderTokenFlag(0);
//           }}
//         >
//           Header
//         </ChoiceText>
//         <NoChoiceText
//           onClick={() => {
//             setHeaderTokenFlag(1);
//           }}
//         >
//           Queries
//         </NoChoiceText>
//         <NoChoiceText
//           onClick={() => {
//             setHeaderTokenFlag(2);
//           }}
//         >
//           Params
//         </NoChoiceText>
//         <Headerheader getInfo={getInfo} />
//       </>
//     )}
//     {headerTokenFlag === 1 && (
//       <>
//         <NoChoiceText
//           onClick={() => {
//             setHeaderTokenFlag(0);
//           }}
//         >
//           Header
//         </NoChoiceText>
//         <ChoiceText
//           onClick={() => {
//             setHeaderTokenFlag(1);
//           }}
//         >
//           Queries
//         </ChoiceText>
//         <NoChoiceText
//           onClick={() => {
//             setHeaderTokenFlag(2);
//           }}
//         >
//           Params
//         </NoChoiceText>
//         <HeaderQueries getInfo={getInfo} queriesInfo={queriesInfo} setQueriesInfo={setQueriesInfo} />
//       </>
//     )}
//     {headerTokenFlag === 2 && (
//       <>
//         <NoChoiceText
//           onClick={() => {
//             setHeaderTokenFlag(0);
//           }}
//         >
//           Header
//         </NoChoiceText>
//         <NoChoiceText
//           onClick={() => {
//             setHeaderTokenFlag(1);
//           }}
//         >
//           Queries
//         </NoChoiceText>
//         <ChoiceText
//           onClick={() => {
//             setHeaderTokenFlag(2);
//           }}
//         >
//           Params
//         </ChoiceText>
//         <ApiParams getInfo={getInfo} paramsInfo={paramsInfo} setParamsInfo={setParamsInfo} />
//       </>
//     )}
//   </div>
//   <div className="requestInfoBodySetting">
//     <ChoiceText>Body</ChoiceText>
//     <ApiBody getInfo={getInfo} testbodyInfo={testbodyInfo} setTestbodyInfo={setTestbodyInfo}></ApiBody>
//   </div>
// </div>

import React, { SetStateAction, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { HeadersType, RequestTypeInfo } from "../../pages/CreateApi/ApisType";
import testApiSlice, {
  getApiRequestInfo,
  selectTestApi,
} from "../../Store/slice/testApi";

export const HeaderContatinerList = styled.div`
  display: flex;
  width: 100%;
`;
export const HeaderListTitleCon = styled.div`
  width: 20%;
  text-align: center;
`;
export const HeaderListTitle = styled.p`
  font-weight: bold;
  color: ${props => props.theme.color};
  font-size: 13px;
  margin: 13px 0px 20px 5px;
`;

export const HeaderListInput = styled.input`
  width: 300px;
  padding-top: 17px;
  font-weight: bold;
  border: none;
  font-size: 13px;
  border-bottom: 1px solid black;
  background-color: ${props => props.theme.bgColor};
  color: ${props => props.theme.color};
`;
interface type {
  getInfo: RequestTypeInfo | undefined;
}
const Headerheader = ({ getInfo }: type) => {
  const info = useSelector(selectTestApi);
  const [getCollection, setGetCollection] = useState("");
  const [getDtoName, setGetDtoName] = useState("");
  const [getType, setGetType] = useState("");
  const [test, setTest] = useState("");
  useEffect(() => {
    if (getInfo) {
      setGetCollection(
        getInfo?.controllers[info.getControllerInfomation].apis[
          info.getApisInfomation
        ].requestBody.collectionType
      );
      setGetDtoName(
        getInfo?.controllers[info.getControllerInfomation].apis[
          info.getApisInfomation
        ].requestBody.dtoName
      );
      setGetType(
        getInfo?.controllers[info.getControllerInfomation].apis[
          info.getApisInfomation
        ].requestBody.type
      );
    }
  }, [getInfo, info.getControllerInfomation, info.getApisInfomation]);

  return (
    <>
      {getInfo?.controllers[info.getControllerInfomation].apis[
        info.getApisInfomation
      ].headers.map((it, idx) => (
        <>
          <HeaderContatinerList key={idx}>
            <HeaderListTitleCon>
              <HeaderListTitle>{it.key}</HeaderListTitle>
            </HeaderListTitleCon>
            <div className="headerListContent">
              <HeaderListInput
                type="text"
                value={it.value}
                onChange={e => {
                  setGetCollection(e.target.value);
                }}
              />
            </div>
          </HeaderContatinerList>
        </>
      ))}
    </>
  );
};

export default Headerheader;

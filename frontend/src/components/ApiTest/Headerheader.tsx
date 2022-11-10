import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RequestTypeInfo } from "../../pages/CreateApi/ApisType";
import testApiSlice, { getApiRequestInfo, selectTestApi } from "../../Store/slice/testApi";

interface type {
  getInfo: RequestTypeInfo | undefined;
}

export const HeaderContatinerList = styled.div`
  display: flex;
  width: 100%;
`;
export const HeaderListTitleCon = styled.div`
  width: 30%;
  text-align: left;
`;
export const HeaderListTitle = styled.p`
  font-weight: bold;
  color: ${(props) => props.theme.color};
  font-size: 13px;
  margin: 13px 0px 20px 5px;
`;

export const HeaderListInput = styled.input`
  width: 300px;
  border: none;
  font-size: 12px;
  border-bottom: 1px solid black;
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.color};
`;
const Headerheader = ({ getInfo }: type) => {
  const info = useSelector(selectTestApi);
  const [getCollection, setGetCollection] = useState("");
  const [getDtoName, setGetDtoName] = useState("");
  const [getType, setGetType] = useState("");
  useEffect(() => {
    if (getInfo) {
      setGetCollection(getInfo?.controllers[info.getControllerInfomation].apis[info.getApisInfomation].requestBody.collectionType);
      setGetDtoName(getInfo?.controllers[info.getControllerInfomation].apis[info.getApisInfomation].requestBody.dtoName);
      setGetType(getInfo?.controllers[info.getControllerInfomation].apis[info.getApisInfomation].requestBody.type);
    }
  }, [getInfo, info.getControllerInfomation, info.getApisInfomation]);
  return (
    <HeaderContatinerList>
      <HeaderListTitleCon>
        <HeaderListTitle>CollectionType </HeaderListTitle>
        <HeaderListTitle>DtoName </HeaderListTitle>
        <HeaderListTitle>Type </HeaderListTitle>
        <HeaderListTitle>Token </HeaderListTitle>
        <HeaderListTitle>Cookie </HeaderListTitle>
      </HeaderListTitleCon>
      <div className="headerListContent">
        <p>
          <HeaderListInput
            type="text"
            value={getCollection}
            onChange={(e) => {
              setGetCollection(e.target.value);
            }}
          />
        </p>
        <p>
          <HeaderListInput
            type="text"
            value={getDtoName}
            onChange={(e) => {
              setGetDtoName(e.target.value);
            }}
          />
        </p>
        <p>
          <HeaderListInput
            type="text"
            value={getType}
            onChange={(e) => {
              setGetType(e.target.value);
            }}
          />
        </p>
        <p>
          <HeaderListInput
            type="text"
            value={getType}
            onChange={(e) => {
              setGetType(e.target.value);
            }}
          />
        </p>
        <p>
          <HeaderListInput
            type="text"
            value={getType}
            onChange={(e) => {
              setGetType(e.target.value);
            }}
          />
        </p>
      </div>
    </HeaderContatinerList>
  );
};

export default Headerheader;

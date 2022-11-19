import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RequestTypeInfo } from "../../pages/CreateApi/ApisType";
import { useAppDispatch } from "../../Store/hooks";
import testApiSlice, { selectTestApi } from "../../Store/slice/testApi";

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
  color: ${(props) => props.theme.color};
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
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.color};
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
  const [tokenInfo, setTokenInfo] = useState("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (
      getInfo &&
      getInfo?.controllers &&
      getInfo.controllers.length > info.getControllerInfomation &&
      getInfo?.controllers[info.getControllerInfomation]?.apis &&
      getInfo?.controllers[info.getControllerInfomation].apis.length >
        info.getApisInfomation
    ) {
      setGetCollection(
        getInfo.controllers[info.getControllerInfomation].apis[
          info.getApisInfomation
        ]?.requestBody?.collectionType
      );
      setGetDtoName(
        getInfo.controllers[info.getControllerInfomation].apis[
          info.getApisInfomation
        ]?.requestBody?.dtoName
      );
      setGetType(
        getInfo.controllers[info.getControllerInfomation].apis[
          info.getApisInfomation
        ]?.requestBody?.type
      );
      getInfo.controllers[info.getControllerInfomation].apis[
        info.getApisInfomation
      ]?.headers.map((it, idx) => {
        if (it.key === "token") {
          setTokenInfo(it?.value);
        }
      });
    }
  }, [getInfo, info.getControllerInfomation, info.getApisInfomation]);

  return (
    <>
      {getInfo?.controllers[info.getControllerInfomation]?.apis[
        info.getApisInfomation
      ]?.headers.map((it, idx) => (
        <div className="headerListTitleisHeader" key={idx}>
          {it?.key && (
            <div className="apiKeyHeaderTitle">
              <p className="apiHeaderListPtag">{it.key}</p>
            </div>
          )}
          {it?.key && (
            <div className="apiKeyHeaderTitleValue">
              <p className="apiHeaderListPtagInput">
                {it.key !== "token" ? (
                  <input
                    className="apiHeaderListInputTag"
                    type="text"
                    defaultValue={it?.value}
                    onChange={(e) => {}}
                  />
                ) : (
                  <input
                    className="apiHeaderListInputTag"
                    type="text"
                    value={tokenInfo}
                    onChange={(e) => {
                      setTokenInfo(e.target.value);
                      it.value = tokenInfo;
                      dispatch(testApiSlice.actions.getTokenInfo(tokenInfo));
                    }}
                  />
                )}
              </p>
            </div>
          )}
          {it?.key && (
            <div className="apiKeyHeaderTitleCheck">
              <p className="apiHeaderListButtonTag">SAVE</p>
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default Headerheader;

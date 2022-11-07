import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import sideApiSlice, { selectSideApi } from "../../Store/slice/sideApi";
import "./ApiTest.scss";
import styled from "styled-components";
import { mainApi } from "../../Store/slice/mainApi";
import { getApiRequestInfo } from "../../Store/slice/testApi";
import { RequestTypeInfo } from "../../pages/CreateApi/ApisType";

const Item = styled.p`
  border: none;
  border-radius: 10px;
  padding: 0px 10px 0px 10px;
  background-color: ${(props) => props.color};
`;

interface sideApi {
  setSidApiList: Dispatch<SetStateAction<number>>;
}

const ApiSide = ({ setSidApiList }: sideApi) => {
  const dispatch = useAppDispatch();
  const [getRequestInfo, setGetRequestInfo] = useState<RequestTypeInfo>();
  const isTestApiList = useAppSelector(selectSideApi);
  const getDocsId = useAppSelector(mainApi);
  const right = ">";

  useEffect(() => {
    dispatch(getApiRequestInfo({ docId: getDocsId.docId })).then((res: any) => {
      const json = res.payload.detail;
      const obj = JSON.parse(json);
      console.log("obj => ", obj);
      setGetRequestInfo(obj);
    });
  }, [getDocsId.docId]);
  const arrControllers = getRequestInfo?.controllers[0];
  return (
    <div className="">
      <p className="titleSideMenu">{right} API List</p>
      {getRequestInfo?.controllers.map((it, index) => (
        <div key={index}>
          <p>{it.name}</p>
          {it.apis.map((item, idx) => (
            <div key={idx} className="sideMenuList">
              <Item
                color={
                  item.method === "GET"
                    ? "#FDECC8"
                    : item.method === "POST"
                    ? "#F5E0E9"
                    : item.method === "PUT"
                    ? "#F1F0EF"
                    : item.method === "DELETE"
                    ? "#D3E5EF"
                    : item.method === "PATCH"
                    ? "#E8DEEE"
                    : item.method === "OPTIONS"
                    ? "#FFE2DD"
                    : "#EEE0DA"
                }
              >
                {item.method}
              </Item>

              <p>{item.uri}</p>
            </div>
          ))}
        </div>
      ))}
      {/* {arrControllers?.apis.map((it, idx) => (
        <div key={idx} className="sideMenuList">
          <Item
            color={
              it.method === "GET"
                ? "#FDECC8"
                : it.method === "POST"
                ? "#F5E0E9"
                : it.method === "PUT"
                ? "#F1F0EF"
                : it.method === "DELETE"
                ? "#D3E5EF"
                : it.method === "PATCH"
                ? "#E8DEEE"
                : it.method === "OPTIONS"
                ? "#FFE2DD"
                : "#EEE0DA"
            }
          >
            {it.method}
          </Item>
          <p
            onClick={() => {
              setSidApiList(idx);
            }}
          >
            {it.uri}
          </p>
          <p
            onClick={() => {
              dispatch(sideApiSlice.actions.removeMethoUri(idx));
            }}
            className="clearSideMenu"
          >
            {"X"}
          </p>
        </div>
      ))} */}

      {/* {isTestApiList.map((it, idx) => (
        <div key={idx} className="sideMenuList">
          <Item
            color={
              it.infomethod.method === "GET"
                ? "#FDECC8"
                : it.infomethod.method === "POST"
                ? "#F5E0E9"
                : it.infomethod.method === "PUT"
                ? "#F1F0EF"
                : it.infomethod.method === "DELETE"
                ? "#D3E5EF"
                : it.infomethod.method === "PATCH"
                ? "#E8DEEE"
                : it.infomethod.method === "OPTIONS"
                ? "#FFE2DD"
                : "#EEE0DA"
            }
          >
            {it.infomethod.method}
          </Item>
          <p
            onClick={() => {
              setSidApiList(idx);
            }}
          >
            {it.infomethod.userAddress}
          </p>
          <p
            onClick={() => {
              dispatch(sideApiSlice.actions.removeMethoUri(idx));
            }}
            className="clearSideMenu"
          >
            {"X"}
          </p>
        </div>
      ))} */}
    </div>
  );
};

export default ApiSide;

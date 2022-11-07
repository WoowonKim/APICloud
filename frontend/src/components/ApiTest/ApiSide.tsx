import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import sideApiSlice, { selectSideApi } from "../../Store/slice/sideApi";
import "./ApiTest.scss";
import styled from "styled-components";

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
  const isTestApiList = useAppSelector(selectSideApi);
  const right = ">";
  return (
    <div className="">
      <p className="titleSideMenu">{right} API List</p>
      {isTestApiList.map((it, idx) => (
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
      ))}
    </div>
  );
};

export default ApiSide;

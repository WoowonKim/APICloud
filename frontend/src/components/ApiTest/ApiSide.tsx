import React, { useEffect } from "react";
import { useAppDispatch } from "../../Store/hooks";
import "./ApiTest.scss";
import styled from "styled-components";
import testApiSlice from "../../Store/slice/testApi";
import { RequestTypeInfo } from "../../pages/CreateApi/ApisType";
const Item = styled.p`
  border: none;
  border-radius: 10px;
  padding: 0px 10px 0px 10px;
  background-color: ${(props) => props.color};
`;

interface type {
  getInfo: RequestTypeInfo | undefined;
}

const ApiSide = ({ getInfo }: type) => {
  const dispatch = useAppDispatch();
  return (
    <div className="">
      {getInfo?.controllers.map((it, index) => (
        <div key={index}>
          <p>{it.name}</p>
          {it.apis.map((item, idx) => (
            <div
              key={idx}
              className="sideMenuList"
              onClick={() => {
                dispatch(testApiSlice.actions.addController(index));
                dispatch(testApiSlice.actions.addApis(idx));
              }}
            >
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
    </div>
  );
};

export default ApiSide;

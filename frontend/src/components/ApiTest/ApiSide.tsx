import React, { useEffect } from "react";
import { useAppDispatch } from "../../Store/hooks";
import "./ApiTest.scss";
import styled from "styled-components";
import testApiSlice from "../../Store/slice/testApi";
import { RequestTypeInfo } from "../../pages/CreateApi/ApisType";
const Item = styled.p`
  border: none;
  border-radius: 10px;
  padding: 9px 10px 3px 10px;
  background-color: ${props => props.color};
`;
const SideMenuList = styled.div`
  padding: 5px 7px 5px 7px;
  display: flex;
  font-size: 12px;
  font-weight: bold;
  justify-content: space-between;
  cursor: pointer;
`;

const SideContollerName = styled.p`
  padding: 15px 10px;
  width: 80px;
  color: #5d5d5d;
  font-size: 18px;
  font-weight: 600;
  text-color: ${props => props.theme.color};
`;
interface type {
  getInfo: RequestTypeInfo | undefined;
}

const ApiSide = ({ getInfo }: type) => {
  const dispatch = useAppDispatch();
  return (
    <div>
      {getInfo?.controllers.map((it, index) => (
        <div key={index}>
          <SideContollerName>{it.name}</SideContollerName>
          {it?.apis.map((item, idx) => (
            <SideMenuList
              key={idx}
              onClick={() => {
                dispatch(testApiSlice.actions.addController(index));
                dispatch(testApiSlice.actions.addApis(idx));
              }}
            >
              <Item
                color={
                  item?.method === "Get"
                    ? "#FDECC8"
                    : item?.method === "Post"
                    ? "#F5E0E9"
                    : item?.method === "Put"
                    ? "#F1F0EF"
                    : item?.method === "Delete"
                    ? "#D3E5EF"
                    : item?.method === "Patch"
                    ? "#E8DEEE"
                    : item?.method === "Options"
                    ? "#FFE2DD"
                    : "#EEE0DA"
                }
              >
                {item?.method.toUpperCase()}
              </Item>
              <p className="apiSideUriAddress">{item?.uri}</p>
            </SideMenuList>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ApiSide;

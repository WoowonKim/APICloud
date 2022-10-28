import React, { useState } from "react";
import styled from "styled-components";
import "../CreateApi/SelectMethods/SelectMethods.scss";

const Item = styled.div`
  border: none;
  border-radius: 10px;
  padding: 5px 10px;
  margin-top: 5px;
  font-weight: bold;
  background-color: ${(props) => props.color};
`;

const SelectedItem = styled.button`
  border: none;
  border-radius: 10px;
  padding: 5px 10px;
  margin-top: 5px;
  font-weight: bold;
  background-color: ${(props) => props.color};
  width: 100%;
`;

const MethodTest = () => {
  const [visible, setVisible] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState("GET");

  const handleSelect = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const eventTarget = e.target as HTMLElement;
    setSelectedMethod(eventTarget.innerText);
    setVisible(!visible);
  };
  const mainColor = "F4F4F4";
  return (
    <div className="selectBox" onClick={() => setVisible(!visible)}>
      <SelectedItem
        color={
          selectedMethod === "GET"
            ? mainColor
            : selectedMethod === "POST"
            ? mainColor
            : selectedMethod === "PUT"
            ? mainColor
            : selectedMethod === "DELETE"
            ? mainColor
            : selectedMethod === "PATCH"
            ? mainColor
            : selectedMethod === "OPTIONS"
            ? mainColor
            : mainColor
        }
      >
        {selectedMethod}
      </SelectedItem>
      {visible && (
        <div className="selectBoxContainer">
          <ul className="itemList">
            <li className="item" onClick={(e) => handleSelect(e)}>
              <Item color="#fdecc8">GET</Item>
            </li>
            <li className="item" onClick={(e) => handleSelect(e)}>
              <Item color="#F5E0E9">POST</Item>
            </li>
            <li className="item" onClick={(e) => handleSelect(e)}>
              <Item color="#F1F0EF">PUT</Item>
            </li>
            <li className="item" onClick={(e) => handleSelect(e)}>
              <Item color="#D3E5EF">DELETE</Item>
            </li>
            <li className="item" onClick={(e) => handleSelect(e)}>
              <Item color="#E8DEEE">PATCH</Item>
            </li>
            <li className="item" onClick={(e) => handleSelect(e)}>
              <Item color="#FFE2DD">OPTIONS</Item>
            </li>
            <li className="item" onClick={(e) => handleSelect(e)}>
              <Item color="#EEE0DA">HEAD</Item>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default MethodTest;

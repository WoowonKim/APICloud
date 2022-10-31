import React, { useState } from "react";
import styled from "styled-components";
import "./SelectMethods.scss";

const Item = styled.div`
  border: none;
  border-radius: 10px;
  padding: 5px 10px;
  margin-top: 5px;
  font-size: 1.2em;
  background-color: ${(props) => props.color};
`;

export const SelectedItem = styled.button`
  border: none;
  border-radius: 10px;
  padding: 5px 10px;
  margin-top: 5px;
  font-size: 1.2em;
  background-color: ${(props) => props.color};
`;

interface Props {
  onBlur?: (temp?: string) => void;
  setValue?: React.Dispatch<React.SetStateAction<string>>;
}

const SelectMethods = ({ onBlur, setValue }: Props) => {
  const [visible, setVisible] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState("GET");

  const handleSelect = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const eventTarget = e.target as HTMLElement;
    setSelectedMethod(eventTarget.innerText);
    setVisible(!visible);
    // Props에 해당 값이 있을 경우 함수 호출
    if (setValue && onBlur) {
      setValue(eventTarget.innerText);
      onBlur(eventTarget.innerText);
    }
  };

  return (
    <div className="selectBox" onClick={() => setVisible(!visible)}>
      <SelectedItem
        color={
          selectedMethod === "GET"
            ? "#FDECC8"
            : selectedMethod === "POST"
            ? "#F5E0E9"
            : selectedMethod === "PUT"
            ? "#F1F0EF"
            : selectedMethod === "DELETE"
            ? "#D3E5EF"
            : selectedMethod === "PATCH"
            ? "#E8DEEE"
            : selectedMethod === "OPTIONS"
            ? "#FFE2DD"
            : "#EEE0DA"
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

export default SelectMethods;

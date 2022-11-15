import React, { useState } from "react";
import styled from "styled-components";
import "./SelectMethods.scss";

const Item = styled.div`
  border: none;
  border-radius: 10px;
  padding: 3px 5px;
  margin-top: 5px;
  font-size: 0.7em;
  background-color: ${(props) => props.color};
`;

export const SelectedItem = styled.button`
  border: none;
  border-radius: 10px;
  padding: 3px 5px;
  margin-top: 5px;
  font-size: 0.7em;
  background-color: ${(props) => props.color};
`;

interface Props {
  onBlur?: (temp?: string) => void;
  setValue?: React.Dispatch<React.SetStateAction<string>>;
  value?: string;
}

const SelectMethods = ({ onBlur, setValue, value }: Props) => {
  const [visible, setVisible] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState(value ? value : "GET");

  const handleSelect = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const eventTarget = e.target as HTMLElement;
    setSelectedMethod(
      eventTarget.innerText[0] +
        eventTarget.innerText.substring(1).toLocaleLowerCase()
    );
    setVisible(!visible);
    // Props에 해당 값이 있을 경우 함수 호출
    if (setValue && onBlur) {
      setValue(
        eventTarget.innerText[0] +
          eventTarget.innerText.substring(1).toLocaleLowerCase()
      );
      onBlur(
        eventTarget.innerText[0] +
          eventTarget.innerText.substring(1).toLocaleLowerCase()
      );
    }
  };

  return (
    <div className="selectBox" onClick={() => setVisible(!visible)}>
      <SelectedItem
        color={
          selectedMethod === "Get"
            ? "#FDECC8"
            : selectedMethod === "Post"
            ? "#F5E0E9"
            : selectedMethod === "Put"
            ? "#F1F0EF"
            : selectedMethod === "Delete"
            ? "#D3E5EF"
            : selectedMethod === "Patch"
            ? "#E8DEEE"
            : selectedMethod === "Options"
            ? "#FFE2DD"
            : "#EEE0DA"
        }
      >
        {selectedMethod.toUpperCase()}
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

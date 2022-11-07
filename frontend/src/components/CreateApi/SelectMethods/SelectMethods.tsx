import React, { useState } from "react";
import styled from "styled-components";
import "./SelectMethods.scss";

const Item = styled.div`
  border: none;
  border-radius: 10px;
  padding: 5px 10px;
  margin-top: 5px;
  font-size: 1em;
  background-color: ${(props) => props.color};
`;

export const SelectedItem = styled.button`
  border: none;
  border-radius: 10px;
  padding: 5px 10px;
  margin-top: 5px;
  font-size: 1em;
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
          selectedMethod === "get"
            ? "#FDECC8"
            : selectedMethod === "post"
            ? "#F5E0E9"
            : selectedMethod === "put"
            ? "#F1F0EF"
            : selectedMethod === "delete"
            ? "#D3E5EF"
            : selectedMethod === "patch"
            ? "#E8DEEE"
            : selectedMethod === "options"
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
              <Item color="#fdecc8">get</Item>
            </li>
            <li className="item" onClick={(e) => handleSelect(e)}>
              <Item color="#F5E0E9">post</Item>
            </li>
            <li className="item" onClick={(e) => handleSelect(e)}>
              <Item color="#F1F0EF">put</Item>
            </li>
            <li className="item" onClick={(e) => handleSelect(e)}>
              <Item color="#D3E5EF">delete</Item>
            </li>
            <li className="item" onClick={(e) => handleSelect(e)}>
              <Item color="#E8DEEE">patch</Item>
            </li>
            <li className="item" onClick={(e) => handleSelect(e)}>
              <Item color="#FFE2DD">options</Item>
            </li>
            <li className="item" onClick={(e) => handleSelect(e)}>
              <Item color="#EEE0DA">head</Item>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SelectMethods;

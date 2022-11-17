import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAppDispatch } from "../../Store/hooks";
import testApiSlice from "../../Store/slice/testApi";
import "../CreateApi/SelectMethods/SelectMethods.scss";

const Item = styled.div`
  border: none;
  border-radius: 10px;
  padding: 7px 10px;
  margin-top: 5px;
  margin-right: 10px;
  font-weight: bold;
  background-color: ${(props) => props.color};
`;

const SelectedItem = styled.button`
  border: none;
  border-radius: 10px;
  padding: 5px 10px 5px 10px;
  margin-top: 5px;
  font-weight: bold;
  background-color: ${(props) => props.color};
  width: 100%;
  cursor: pointer;
`;
interface word {
  methodApiWord: string | undefined;
}
const MethodTest = ({ methodApiWord }: word) => {
  const [visible, setVisible] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState("GET");
  const handleSelect = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const eventTarget = e.target as HTMLElement;
    setSelectedMethod(eventTarget.innerText);
    setVisible(!visible);
  };
  useEffect(() => {
    if (methodApiWord) {
      setSelectedMethod(methodApiWord);
    }
  }, [methodApiWord]);
  return (
    <div className="selectBoxTESTApi" onClick={() => setVisible(!visible)}>
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
        {selectedMethod}
      </SelectedItem>

      {visible && (
        <div className="selectBoxContainer">
          <ul className="itemList">
            <li className="item" onClick={(e) => handleSelect(e)}>
              <Item color="#fdecc8">Get</Item>
            </li>
            <li className="item" onClick={(e) => handleSelect(e)}>
              <Item color="#F5E0E9">Post</Item>
            </li>
            <li className="item" onClick={(e) => handleSelect(e)}>
              <Item color="#F1F0EF">Put</Item>
            </li>
            <li className="item" onClick={(e) => handleSelect(e)}>
              <Item color="#D3E5EF">Delete</Item>
            </li>
            <li className="item" onClick={(e) => handleSelect(e)}>
              <Item color="#E8DEEE">Patch</Item>
            </li>
            <li className="item" onClick={(e) => handleSelect(e)}>
              <Item color="#FFE2DD">Options</Item>
            </li>
            <li className="item" onClick={(e) => handleSelect(e)}>
              <Item color="#EEE0DA">Head</Item>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default MethodTest;

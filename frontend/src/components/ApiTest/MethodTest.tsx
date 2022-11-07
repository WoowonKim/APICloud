import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAppDispatch } from "../../Store/hooks";
import testApiSlice from "../../Store/slice/testApi";
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
  const dispatch = useAppDispatch();
  const [visible, setVisible] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState("GET");
  const handleSelect = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const eventTarget = e.target as HTMLElement;
    setSelectedMethod(eventTarget.innerText);
    dispatch(testApiSlice.actions.setMethod({ method: eventTarget.innerText }));
    setVisible(!visible);
  };
  useEffect(() => {
    if (methodApiWord) {
      setSelectedMethod(methodApiWord);
      dispatch(testApiSlice.actions.setMethod({ method: methodApiWord }));
    }
  }, [methodApiWord]);
  return (
    <div className="selectBoxTESTApi" onClick={() => setVisible(!visible)}>
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

export default MethodTest;

import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import "./SelectTypes.scss";

interface Props {
  onBlur?: (temp?: string) => void;
  setValue?: React.Dispatch<React.SetStateAction<string>>;
  value?: string;
  handleBasicInfo?: (
    e: React.ChangeEvent<HTMLInputElement> | string,
    type: string,
    depth: number,
    responseType?: string
  ) => void;
  responseType?: string;
  depth?: number;
}

const SelectTypes = ({
  onBlur,
  setValue,
  value,
  handleBasicInfo,
  responseType,
  depth,
}: Props) => {
  const [visible, setVisible] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState(
    value ? value : "String"
  );

  const handleSelect = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const eventTarget = e.target as HTMLElement;
    setSelectedMethod(eventTarget.innerText);
    setVisible(!visible);
    if (handleBasicInfo && depth) {
      handleBasicInfo(eventTarget.innerText, "type", depth, responseType);
    }
    // Props에 해당 값이 있을 경우 함수 호출
    if (setValue && onBlur) {
      setValue(eventTarget.innerText);
      onBlur(eventTarget.innerText);
    }
  };

  // String, List, Map, Byte, Character, Boolean, Integer, Long, Short, Float, Double, Object
  const typeList = [
    "String",
    "Boolean",
    "Integer",
    "Long",
    "List",
    "Object",
    "Byte",
    "Character",
    "Short",
    "Float",
    "Double",
  ];

  return (
    <div className="selectBox" onClick={() => setVisible(!visible)}>
      <div className="selectedItemContainer">
        <div className="selectedItem">{selectedMethod}</div>
        <FontAwesomeIcon icon={faChevronDown} />
      </div>
      {visible && (
        <div className="selectBoxContainer">
          <ul className="itemList">
            {typeList.map((item, index) => (
              <li className="item" onClick={(e) => handleSelect(e)} key={index}>
                <div color="#fdecc8">{item}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SelectTypes;

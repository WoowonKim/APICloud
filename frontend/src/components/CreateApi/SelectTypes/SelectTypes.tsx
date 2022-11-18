import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import "./SelectTypes.scss";

interface Props {
  setValue?: any;
  value?: string;
  handleBasicInfo?: (
    e: React.ChangeEvent<HTMLInputElement> | string,
    type: string,
    depth: number,
    responseType: string
  ) => void;
  responseType?: string;
  depth?: number;
  isCollection?: boolean;
  handelCellValue?: (
    e: React.ChangeEvent<HTMLInputElement> | string,
    header: string,
    index: number
  ) => void;
  index?: number;
  modalDepth?: number;
}

const SelectTypes = ({
  setValue,
  value,
  handleBasicInfo,
  responseType,
  depth,
  isCollection,
  handelCellValue,
  index,
  modalDepth,
}: Props) => {
  const [visible, setVisible] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState(
    value ? value : "String"
  );

  useEffect(() => {
    if (value) {
      setSelectedMethod(value);
    }
  }, [value, selectedMethod, modalDepth]);

  const handleSelect = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const eventTarget = e.target as HTMLElement;
    setSelectedMethod(eventTarget.innerText);
    setVisible(!visible);
    if (handleBasicInfo && depth) {
      const type = responseType ? responseType : "";
      handleBasicInfo(eventTarget.innerText, "type", depth, type);
    }
    // Props에 해당 값이 있을 경우 함수 호출
    if (setValue) {
      setValue(eventTarget.innerText);
    }

    if (handelCellValue && typeof index === "number") {
      handelCellValue(eventTarget.innerText, "type", index);
    }
  };
  // String, List, Map, Byte, Character, Boolean, Integer, Long, Short, Float, Double, Object
  const typeList = isCollection
    ? ["List", "X"]
    : modalDepth && modalDepth > 2
    ? [
        "String",
        "Boolean",
        "Integer",
        "Long",
        "List",
        "Byte",
        "Character",
        "Short",
        "Float",
        "Double",
      ]
    : [
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
        {isCollection ? (
          <div className="selectedItem">List</div>
        ) : (
          <div className="selectedItem">
            {selectedMethod !== "List" ? selectedMethod : "String"}
          </div>
        )}
        <FontAwesomeIcon icon={faChevronDown} className="selectTypeIcon" />
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

import React, { useEffect } from "react";
import { PropertiesType } from "../../../pages/CreateApi/ApisType";
import "../ControllerAddModal/ControllerAddModal.scss";
import { faInfo, faRemove } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SelectTypes from "../SelectTypes/SelectTypes";
import { getDepth } from "../validationCheck";

// ControllerAddModal에서 받아오는 props의 type 설정
interface Props {
  setPropertiesIndexList: React.Dispatch<React.SetStateAction<number[]>>;
  propertiesIndexList: number[];
  setModalDepth: React.Dispatch<React.SetStateAction<number>>;
  final: PropertiesType | undefined;
  modalDepth: number;
}
const DtoModalTable = ({
  setPropertiesIndexList,
  propertiesIndexList,
  setModalDepth,
  final,
  modalDepth,
}: Props) => {
  const headers = ["name", "type", "required"];

  const handelCellValue = (
    e: React.ChangeEvent<HTMLInputElement> | string,
    header: string,
    index: number
  ) => {
    if (final && final.properties.length > index) {
      if (header === "required" && typeof e !== "string") {
        final.properties[index][header] = e.target.checked;
      } else if (header === "type" && typeof e === "string") {
        if (e === "List") {
          final.properties[index].collectionType = "List";
          final.properties[index][header] = "String";
        } else if (e === "X") {
          final.properties[index].collectionType = "";
          final.properties[index][header] = "String";
        } else {
          final.properties[index][header] = e;
        }
      } else if (header === "name" && typeof e !== "string") {
        final.properties[index][header] = e.target.value;
      }
    }
  };
  const handleTableCell = (item: any, index: number) => {
    const rows = [];
    rows.push(
      <td key={`${index}-1`} className="apiTableBodyItem">
        <input
          type="text"
          value={item.name !== null ? item.name : ""}
          onChange={(e) => handelCellValue(e, "name", index)}
          className="tableInput"
        />
      </td>
    );
    rows.push(
      <td key={`${index}-2`} className="apiTableBodyItem">
        <div className="typeInfoContainer">
          {item.collectionType === "List" && (
            <SelectTypes
              value={item.type}
              handelCellValue={handelCellValue}
              index={index}
              isCollection={true}
            />
          )}
          <SelectTypes
            value={item.type}
            handelCellValue={handelCellValue}
            index={index}
            isCollection={false}
            modalDepth={modalDepth}
          />
          {item.type === "Object" && (
            <FontAwesomeIcon
              icon={faInfo}
              className="infoIcon"
              onClick={() => {
                setModalDepth(3);
                let properties = [...propertiesIndexList];
                properties[1] = index;
                setPropertiesIndexList(properties);
                getDepth(index, item, true, true, false, final?.properties);
              }}
            />
          )}
        </div>
      </td>
    );
    rows.push(
      <td key={`${index}-3`} className="apiTableBodyItem">
        <input
          type="checkbox"
          checked={
            item.required !== null
              ? item.required === true
                ? true
                : false
              : false
          }
          onChange={(e) => handelCellValue(e, "required", index)}
          className="apiTableCheckbox"
        />
      </td>
    );
    rows.push(
      <td key={`${index}-4`} className="apiTableDeleteItem">
        <FontAwesomeIcon
          icon={faRemove}
          className="removeIcon"
          onClick={() =>
            getDepth(index, item, false, false, true, final?.properties)
          }
        />
      </td>
    );
    return rows;
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            {headers.map((item, index) => (
              <th key={index} className="apiTableHeaderItem">
                {item}
              </th>
            ))}
            <th className="apiTableDeleteItem"></th>
          </tr>
        </thead>
        <tbody>
          {final &&
            final.properties.length > 0 &&
            final.properties.map((item, index) => (
              <tr key={index}>{handleTableCell(item, index)}</tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default DtoModalTable;

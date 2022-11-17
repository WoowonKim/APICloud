import React from "react";
import { ApisType, ControllerType } from "../../../pages/CreateApi/ApisType";
import SelectMethods from "../SelectMethods/SelectMethods";
import "../ControllerAddModal/ControllerAddModal.scss";
import { MappedTypeDescription } from "@syncedstore/core/types/doc";
import { faRemove } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// ControllerAddModal에서 받아오는 props의 type 설정
interface Props {
  data: ApisType[];
  state: MappedTypeDescription<{
    data: ControllerType[];
  }>;
  editControllerIndex: number;
  addedControllerIndex: number;
}
const ModalTable = ({
  data,
  state,
  editControllerIndex,
  addedControllerIndex,
}: Props) => {
  const headers = ["uri", "name", "method"];

  const deleteApi = (index: number) => {
    state.data[
      editControllerIndex > -1 ? editControllerIndex : addedControllerIndex
    ].apis.splice(index, 1);
  };

  const handelCellValue = (e: any, header: string, index: number) => {
    let path =
      state.data[
        editControllerIndex > -1 ? editControllerIndex : addedControllerIndex
      ].apis;
    const key =
      header === "uri" ? "uri" : header === "name" ? "name" : "method";
    if (state.data && path && path.length > 0) {
      path[index][key] = e;
    }
  };
  const handleTableCell = (item: any, index: number) => {
    const rows = [];
    rows.push(
      <td key={`${index}-1`} className="apiTableBodyItem">
        <input
          type="text"
          value={item.uri !== null ? item.uri : ""}
          onChange={(e) => handelCellValue(e.target.value, "uri", index)}
          className="tableInput"
          placeholder="/api"
        />
      </td>
    );
    rows.push(
      <td key={`${index}-2`} className="apiTableBodyItem">
        <input
          type="text"
          value={item.name !== null ? item.name : ""}
          onChange={(e) => handelCellValue(e.target.value, "name", index)}
          className="tableInput"
          placeholder="getApi"
        />
      </td>
    );
    rows.push(
      <td key={`${index}-3`} className="apiTableBodyItem">
        <div className="typeInfoContainer">
          <SelectMethods
            value={item.method}
            handelCellValue={handelCellValue}
            index={index}
          />
        </div>
      </td>
    );
    rows.push(
      <td
        key={`${index}-4`}
        className="apiTableDeleteItem"
        onClick={() => {
          deleteApi(index);
        }}
      >
        <FontAwesomeIcon icon={faRemove} className="removeIcon" />
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
          {state.data &&
            state.data[
              editControllerIndex > -1
                ? editControllerIndex
                : addedControllerIndex
            ].apis?.length > 0 &&
            state.data[
              editControllerIndex > -1
                ? editControllerIndex
                : addedControllerIndex
            ].apis.map((item, index) => (
              <tr key={index}>{handleTableCell(item, index)}</tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ModalTable;

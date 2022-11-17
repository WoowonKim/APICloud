import { faInfo, faRemove } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSyncedStore } from "@syncedstore/react";
import React, { useEffect, useState } from "react";
import { PropertiesType } from "../../../pages/CreateApi/ApisType";
import DtoInputModal from "../DtoInputModal/DtoInputModal";
import SelectTypes from "../SelectTypes/SelectTypes";
import { store } from "../store";
import TableInfo from "../Table/TableInfo";
import { checkDtoNameValidation, getDepth } from "../validationCheck";

interface Props {
  activeTab: number;
  selectedController: number;
  selectedApi: number;
  responseType: string;
}

const ApiTable = ({
  activeTab,
  selectedController,
  selectedApi,
  responseType,
}: Props) => {
  const state = useSyncedStore(store);
  const headers =
    activeTab === 1 ? ["key", "value"] : ["name", "type", "required"];

  const rootPath =
    activeTab === 5 && (responseType === "fail" || responseType === "success")
      ? state.data[selectedController].apis[selectedApi].responses?.[
          responseType
        ]?.responseBody?.properties
      : activeTab === 4
      ? state.data[selectedController].apis[selectedApi].requestBody?.properties
      : activeTab === 3
      ? state.data[selectedController].apis[selectedApi].queries
      : activeTab === 2
      ? state.data[selectedController].apis[selectedApi].parameters
      : state.data[selectedController].apis[selectedApi].headers;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [propertiesIndex, setPropertiesIndex] = useState(-1);
  const [final, setFinal] = useState<PropertiesType>();
  const [propertiesIndexList, setPropertiesIndexList] = useState<number[]>([
    -1, -1, -1, -1, -1,
  ]);
  const [nameList, setNameList] = useState<string[]>(["", "", "", "", ""]);
  const [dtoData, setDtoData] = useState();
  const [currentDtoData, setCurrentDtoData] = useState();
  const [dtoExists, setDtoExists] = useState(false);
  const [modalDepth, setModalDepth] = useState(2);

  const handelCellValue = (
    e: React.ChangeEvent<HTMLInputElement> | string,
    header: string,
    index: number
  ) => {
    let path = state.data[selectedController].apis[selectedApi];
    if (
      activeTab === 1 &&
      (header === "key" || header === "value") &&
      typeof e !== "string"
    ) {
      path.headers[index][header] = e.target.value;
    } else if (activeTab === 2 || activeTab === 3) {
      const tab = activeTab === 2 ? "parameters" : "queries";
      if (header === "required" && typeof e !== "string") {
        path[tab][index][header] = e.target.checked;
      } else if (header === "type" && typeof e === "string") {
        if (e === "List") {
          path[tab][index].collectionType = "List";
          path[tab][index][header] = "String";
        } else if (e === "X") {
          path[tab][index].collectionType = "";
          path[tab][index][header] = "String";
        } else {
          path[tab][index][header] = e;
        }
      } else if (header === "name" && typeof e !== "string") {
        path[tab][index][header] = e.target.value;
      }
    } else if (activeTab === 4) {
      if (header === "required" && typeof e !== "string") {
        path.requestBody.properties[index][header] = e.target.checked;
      } else if (header === "type" && typeof e === "string") {
        if (e === "List") {
          path.requestBody.properties[index].collectionType = "List";
          path.requestBody.properties[index][header] = "String";
        } else if (e === "X") {
          path.requestBody.properties[index].collectionType = "";
          path.requestBody.properties[index][header] = "String";
        } else {
          path.requestBody.properties[index][header] = e;
        }
      } else if (header === "name" && typeof e !== "string") {
        path.requestBody.properties[index][header] = e.target.value;
      }
    } else if (
      activeTab === 5 &&
      (responseType === "fail" || responseType === "success")
    ) {
      if (header === "required" && typeof e !== "string") {
        path.responses[responseType].responseBody.properties[index][header] =
          e.target.checked;
      } else if (header === "type" && typeof e === "string") {
        if (e === "List") {
          path.responses[responseType].responseBody.properties[
            index
          ].collectionType = "List";
          path.responses[responseType].responseBody.properties[index][header] =
            "String";
        } else if (e === "X") {
          path.responses[responseType].responseBody.properties[
            index
          ].collectionType = "";
          path.responses[responseType].responseBody.properties[index][header] =
            "String";
        } else {
          path.responses[responseType].responseBody.properties[index][header] =
            e;
        }
      } else if (header === "name" && typeof e !== "string") {
        path.responses[responseType].responseBody.properties[index][header] =
          e.target.value;
      }
    }
  };

  const handleTableCell = (item: any, index: number) => {
    const rows = [];
    if (activeTab === 1) {
      rows.push(
        <td key={`${index}-1`} className="apiTableBodyItem">
          <input
            type="text"
            value={item.key !== null ? item.key : ""}
            onChange={(e) => handelCellValue(e, "key", index)}
            className="tableInput"
          />
        </td>
      );
      rows.push(
        <td key={`${index}-2`} className="apiTableBodyItem">
          <input
            type="text"
            value={item.value !== null ? item.value : ""}
            onChange={(e) => handelCellValue(e, "value", index)}
            className="tableInput"
          />
        </td>
      );
    } else {
      rows.push(
        <td key={`${index}-3`} className="apiTableBodyItem">
          <input
            type="text"
            value={item.name !== null ? item.name : ""}
            onChange={(e) => handelCellValue(e, "name", index)}
            className="tableInput"
          />
        </td>
      );
      rows.push(
        <td key={`${index}-4`} className="apiTableBodyItem">
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
            />
            {item.type === "Object" && (
              <FontAwesomeIcon
                icon={faInfo}
                className="infoIcon"
                onClick={() => {
                  let properties = [...propertiesIndexList];
                  properties[0] = index;
                  setPropertiesIndexList(properties);
                  getDepth(index, item, true, true, false, rootPath);
                  setPropertiesIndex(index);
                  setIsModalVisible(!isModalVisible);
                }}
              />
            )}
          </div>
        </td>
      );
      rows.push(
        <td key={`${index}-5`} className="apiTableBodyItem">
          <input
            type="checkbox"
            className="apiTableCheckbox"
            checked={item.required !== null ? item.required : ""}
            onChange={(e) => handelCellValue(e, "required", index)}
          />
        </td>
      );
    }
    rows.push(
      <td key={`${index}-6`} className="apiTableDeleteItem">
        <FontAwesomeIcon
          icon={faRemove}
          className="removeIcon"
          onClick={() => getDepth(index, item, false, false, true, rootPath)}
        />
      </td>
    );
    return rows;
  };

  const handleBasicInfo = (
    e: string | React.ChangeEvent<HTMLInputElement>,
    type: string,
    depth: number,
    responseType: string
  ) => {
    const index = propertiesIndexList[0] !== -1 ? propertiesIndexList[0] : 0;
    const path = state.data[selectedController].apis[selectedApi];
    let infoPath =
      depth === 1
        ? activeTab === 5 &&
          (responseType === "fail" || responseType === "success")
          ? path.responses[responseType].responseBody
          : path.requestBody
        : activeTab === 5 &&
          (responseType === "fail" || responseType === "success")
        ? path.responses[responseType].responseBody.properties[index]
        : activeTab === 4
        ? path.requestBody.properties[index]
        : activeTab === 3
        ? path.queries[index]
        : path.parameters[index];

    for (let i = 1; i < depth - 1; i++) {
      if (propertiesIndexList[i] !== -1) {
        infoPath = infoPath.properties[propertiesIndexList[i]];
      }
    }

    let checkDto;
    if (depth === 1) {
      if (type === "required" && typeof e !== "string") {
        infoPath[type] = e.target.checked;
      } else if (type === "name" && typeof e !== "string") {
        infoPath[type] = e.target.value;
      } else if (type === "dtoName" && typeof e !== "string") {
        infoPath[type] = e.target.value;
        checkDto = checkDtoNameValidation(
          e.target.value,
          state.data[selectedController].apis,
          state.data[selectedController].apis.length,
          infoPath,
          false
        );
      } else if (type === "type" && typeof e === "string") {
        if (e === "List") {
          infoPath.collectionType = "List";
          infoPath[type] = "String";
        } else if (e === "X") {
          infoPath.collectionType = "";
        } else {
          infoPath[type] = e;
        }
      }
    } else {
      if (type === "dtoName" && typeof e !== "string") {
        infoPath[type] = e.target.value;
        checkDto = checkDtoNameValidation(
          e.target.value,
          state.data[selectedController].apis,
          state.data[selectedController].apis.length,
          infoPath,
          false
        );
      }
    }

    if (checkDto && typeof checkDto !== "boolean" && checkDto[1]) {
      setDtoData(checkDto[1]);
      setDtoExists(true);
      setCurrentDtoData(checkDto[0]);
    } else {
      setDtoExists(false);
    }
  };

  useEffect(() => {
    setModalDepth(2);
  }, []);

  return (
    <div>
      {isModalVisible && (
        <DtoInputModal
          setIsModalVisible={setIsModalVisible}
          activeTab={activeTab}
          selectedController={selectedController}
          selectedApi={selectedApi}
          propertiesIndex={propertiesIndex}
          responseType={responseType}
          handleBasicInfo={handleBasicInfo}
          setPropertiesIndexList={setPropertiesIndexList}
          propertiesIndexList={propertiesIndexList}
          getDepth={getDepth}
          setNameList={setNameList}
          nameList={nameList}
          dtoData={dtoData}
          dtoExists={dtoExists}
          currentDtoData={currentDtoData}
          setFinal={setFinal}
          final={final}
          setModalDepth={setModalDepth}
          modalDepth={modalDepth}
        />
      )}
      <TableInfo
        activeTab={activeTab}
        handleBasicInfo={handleBasicInfo}
        selectedController={selectedController}
        selectedApi={selectedApi}
        responseType={responseType}
        dtoData={dtoData}
        dtoExists={dtoExists}
      />
      <table>
        <thead>
          <tr>
            {headers.map((item, index) => (
              <th
                key={index}
                style={{
                  width:
                    item === "delete" || item === "required"
                      ? "100px"
                      : "250px",
                }}
                className="apiTableHeaderItem"
              >
                {item}
              </th>
            ))}
            <th className="apiTableDeleteItem"></th>
          </tr>
        </thead>
        <tbody>
          {rootPath &&
            rootPath.length > 0 &&
            rootPath.map((item, index) => (
              <tr key={index}>{handleTableCell(item, index)}</tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApiTable;

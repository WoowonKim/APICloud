import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MappedTypeDescription } from "@syncedstore/core/types/doc";
import React, { useEffect, useState } from "react";
import {
  ControllerType,
  PropertiesType,
} from "../../../pages/CreateApi/ApisType";
import DtoModalTable from "../DtoModalTable/DtoModalTable";
import "./DtoInputModal.scss";

interface Props {
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  activeTab: number;
  state: MappedTypeDescription<{
    data: ControllerType[];
  }>;
  selectedController: number;
  selectedApi: number;
  propertiesIndex: number;
  responseType?: string;
  handleBasicInfo: (
    e: React.ChangeEvent<HTMLInputElement> | string,
    type: string,
    depth: number,
    responseType?: string
  ) => void;
  addProperties: (index: number, flag?: boolean, depth1?: number) => void;
  deleteRow: (index: number, depth: number, propIndex?: number) => void;
  setPropertiesIndexList: React.Dispatch<React.SetStateAction<number[]>>;
  propertiesIndexList: number[];
  setDepth: React.Dispatch<React.SetStateAction<number>>;
  depth: number;
  setPropertiesIndex: React.Dispatch<React.SetStateAction<number>>;
  modalPath?: PropertiesType;
}
const DtoInputModal = ({
  setIsModalVisible,
  activeTab,
  state,
  selectedApi,
  selectedController,
  propertiesIndex,
  responseType,
  handleBasicInfo,
  addProperties,
  deleteRow,
  setPropertiesIndexList,
  propertiesIndexList,
  setDepth,
  depth,
  setPropertiesIndex,
  modalPath,
}: Props) => {
  const rootPath = state.data[selectedController].apis[selectedApi];
  const [path1, setPath] = useState<PropertiesType>();
  const [test, setTest] = useState(2);
  const [nameList, setNameList] = useState<string[]>([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const index =
    propertiesIndexList[0] !== -1 ? propertiesIndexList[0] : propertiesIndex;
  let path =
    activeTab === 2
      ? rootPath.parameters[index]
      : activeTab === 3
      ? rootPath.queries[index]
      : activeTab === 4
      ? rootPath.requestBody.properties[index]
      : activeTab === 5 &&
        (responseType === "fail" || responseType === "success")
      ? rootPath.responses[responseType].responseBody.properties[index]
      : rootPath.parameters[index];
  let depth1 = 2;
  useEffect(() => {
    let i = 2;
    while (path?.properties.length > 0 && i < 11) {
      setNameList((old) => {
        let copy = [...old];
        copy[propertiesIndexList[i - 2]] = path?.name;
        return copy;
      });
      i++;
      depth1 += 1;
      setTest(depth1);
      path = path?.properties[propertiesIndexList[i - 2]];
    }
    console.log(depth, depth1, test, "depth", nameList, propertiesIndexList);
  }, [activeTab, test, path]);

  useEffect(() => {
    console.log("modalPath", JSON.parse(JSON.stringify(modalPath)));
  }, [modalPath]);
  console.log(
    "==================================",
    path && JSON.parse(JSON.stringify(path)),
    depth1,
    test,
    propertiesIndex,
    nameList,
    JSON.parse(JSON.stringify(modalPath))
  );

  return (
    <div className="dtoInputModal">
      <div className="dtoModalContainer">
        <div className="dtoModalTitleContainer">
          <div>
            {nameList.length > 0 &&
              nameList.map((name, index) => <span key={index}>{name}/</span>)}
          </div>
          <input
            type="text"
            id="dtoModalDtoName"
            placeholder="DtoName"
            onChange={(e) => handleBasicInfo(e, "dtoName", depth)}
            autoFocus
            value={modalPath ? modalPath?.dtoName : path?.dtoName}
          />
        </div>
        {(!!modalPath ? modalPath?.properties : path?.properties) && (
          <div className="dtoModalTableContainer">
            <button
              className="apiPlusButton"
              onClick={() => addProperties(propertiesIndex, true, test)}
            >
              <FontAwesomeIcon icon={faPlus} className="plusIcon" />
            </button>

            <DtoModalTable
              data={JSON.parse(
                JSON.stringify(
                  modalPath ? modalPath?.properties : path?.properties
                )
              )}
              state={state}
              selectedController={selectedController}
              selectedApi={selectedApi}
              propertiesIndex={propertiesIndex}
              activeTab={activeTab}
              deleteRow={deleteRow}
              setPropertiesIndexList={setPropertiesIndexList}
              propertiesIndexList={propertiesIndexList}
              setDepth={setDepth}
              depth={depth}
              addProperties={addProperties}
              setPropertiesIndex={setPropertiesIndex}
              depth1={test}
            />
          </div>
        )}
      </div>
      <button
        className="dtoInputModalCloseButton"
        onClick={() => setIsModalVisible((curr) => !curr)}
      ></button>
    </div>
  );
};

export default DtoInputModal;

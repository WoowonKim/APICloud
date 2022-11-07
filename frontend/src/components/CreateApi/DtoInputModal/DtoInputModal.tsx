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
  addProperties: (index: number, flag?: boolean) => void;
  deleteRow: (index: number, depth: number, propIndex?: number) => void;
  setPropertiesIndexList: React.Dispatch<React.SetStateAction<number[]>>;
  propertiesIndexList: number[];
  setDepth: React.Dispatch<React.SetStateAction<number>>;
  depth: number;
  setPropertiesIndex: React.Dispatch<React.SetStateAction<number>>;
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
}: Props) => {
  const rootPath = state.data[selectedController].apis[selectedApi];
  const [path1, setPath] = useState<PropertiesType>();
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
  console.log(propertiesIndexList);
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
  useEffect(() => {
    for (let i = 2; i < depth + 2; i++) {
      if (propertiesIndexList[i - 2] !== -1) {
        setNameList((old) => {
          let copy = [...old];
          copy[propertiesIndexList[i - 2]] = path?.name;
          return copy;
        });
        path = path?.properties[propertiesIndexList[i - 2]];
      }
    }
    setPath(path);
    console.log(depth, "depth", nameList, propertiesIndexList[depth - 2]);
  }, [activeTab]);
  console.log(
    "==================================",
    path && JSON.parse(JSON.stringify(path))
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
            value={path?.dtoName}
          />
        </div>
        {path?.properties && (
          <div className="dtoModalTableContainer">
            <button
              className="apiPlusButton"
              onClick={() =>
                addProperties(propertiesIndexList[depth - 2], true)
              }
            >
              <FontAwesomeIcon icon={faPlus} className="plusIcon" />
            </button>

            <DtoModalTable
              data={JSON.parse(JSON.stringify(path?.properties))}
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

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
  getDepth: (idx: number, datas: PropertiesType) => number;
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
  getDepth,
}: Props) => {
  const rootPath = state.data[selectedController].apis[selectedApi];
  const [modalDepth, setModalDepth] = useState(2);
  const [test, setTest] = useState(2);
  const [final, setFinal] = useState<PropertiesType>();
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

  useEffect(() => {
    console.log(modalDepth);
    if (modalDepth > 3 || modalDepth === 3) {
      for (let i = 0; i < modalDepth - 2; i++) {
        if (propertiesIndexList[i] > -1) {
          path = path.properties[propertiesIndexList[i]];
        }
        console.log(i, JSON.parse(JSON.stringify(path)));
      }
    }
    setFinal(path);
  }, [modalDepth, path, final]);
  console.log(
    modalDepth,
    final && JSON.parse(JSON.stringify(final)),
    propertiesIndexList
  );

  return (
    <div className="dtoInputModal">
      <div className="dtoModalContainer">
        <div className="dtoModalTitleContainer">
          <div>
            {nameList.length > 0 &&
              nameList.map((name, index) => <span key={index}>{name}/</span>)}
          </div>
          {final && (
            <input
              type="text"
              id="dtoModalDtoName"
              placeholder="DtoName"
              onChange={(e) => handleBasicInfo(e, "dtoName", modalDepth)}
              autoFocus
              value={final?.dtoName}
            />
          )}
        </div>
        {final?.properties && (
          <div className="dtoModalTableContainer">
            <button
              className="apiPlusButton"
              onClick={() => addProperties(propertiesIndex, true, modalDepth)}
            >
              <FontAwesomeIcon icon={faPlus} className="plusIcon" />
            </button>

            <DtoModalTable
              data={JSON.parse(JSON.stringify(final.properties))}
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
              getDepth={getDepth}
              setModalDepth={setModalDepth}
              modalDepth={modalDepth}
            />
          </div>
        )}
      </div>
      <button
        className="dtoInputModalCloseButton"
        onClick={() => setIsModalVisible(false)}
      ></button>
    </div>
  );
};

export default DtoInputModal;

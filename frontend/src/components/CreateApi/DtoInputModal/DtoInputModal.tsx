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
  setNameList: React.Dispatch<React.SetStateAction<string[]>>;
  nameList: string[];
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
  setNameList,
  nameList,
}: Props) => {
  const rootPath = state.data[selectedController].apis[selectedApi];
  const [modalDepth, setModalDepth] = useState(2);
  const [test, setTest] = useState(2);
  const [final, setFinal] = useState<PropertiesType>();

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
    let copy = path;
    if (modalDepth > 3 || modalDepth === 3) {
      for (let i = 1; i < modalDepth - 1; i++) {
        if (propertiesIndexList[i] !== -1) {
          setNameList((old) => {
            let newNameList = [...old];
            newNameList[i] = copy.name;
            return newNameList;
          });
          copy = copy.properties[propertiesIndexList[i]];
        }
        console.log(modalDepth, i, JSON.parse(JSON.stringify(copy)));
      }
    }
    setFinal(copy);
  }, [modalDepth, path, final]);

  useEffect(() => {
    console.log("change final");
  }, [final]);
  console.log(
    "=====0=0=0=======",
    modalDepth,
    final && JSON.parse(JSON.stringify(final)),
    propertiesIndexList
  );
  useEffect(() => {}, [modalDepth]);
  return (
    <div className="dtoInputModal">
      <div className="dtoModalContainer">
        <div className="dtoModalTitleContainer">
          <div>
            {nameList.length > 0 &&
              nameList.map(
                (name, index) => !!name && <span key={index}>{name}/</span>
              )}
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
              onClick={() =>
                addProperties(
                  propertiesIndexList[modalDepth - 2],
                  true,
                  modalDepth
                )
              }
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
              path={path}
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

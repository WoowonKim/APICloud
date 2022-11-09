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
    responseType: string
  ) => void;
  setPropertiesIndexList: React.Dispatch<React.SetStateAction<number[]>>;
  propertiesIndexList: number[];
  setFinal: React.Dispatch<React.SetStateAction<PropertiesType | undefined>>;
  final: PropertiesType | undefined;
  getDepth: (
    idx: number,
    datas: PropertiesType[],
    isAdd: boolean,
    isNew: boolean,
    isDelete: boolean
  ) => number;
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
  setPropertiesIndexList,
  propertiesIndexList,
  setFinal,
  final,
  getDepth,
  setNameList,
  nameList,
}: Props) => {
  const rootPath = state.data[selectedController].apis[selectedApi];
  const [modalDepth, setModalDepth] = useState(2);

  const index =
    propertiesIndexList[0] !== -1 ? propertiesIndexList[0] : propertiesIndex;
  let path =
    activeTab === 5 && (responseType === "fail" || responseType === "success")
      ? rootPath.responses[responseType].responseBody
      : activeTab === 3
      ? rootPath.queries[index]
      : activeTab === 4
      ? rootPath.requestBody
      : rootPath.parameters[index];

  useEffect(() => {
    let copy = path;
    if (modalDepth > 3 || modalDepth === 3) {
      let i = activeTab === 2 || activeTab === 3 ? 1 : 0;
      for (i; i < modalDepth - 1; i++) {
        if (propertiesIndexList[i] !== -1) {
          setNameList((old) => {
            let newNameList = [...old];
            newNameList[i] = copy.dtoName;
            return newNameList;
          });
          copy = copy.properties[propertiesIndexList[i]];
        }
      }
    } else if (activeTab === 4 || activeTab === 5) {
      copy = copy.properties[propertiesIndex];
    }
    setFinal(copy);
  }, [modalDepth, path, final]);

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
              onChange={(e) => {
                const type = responseType ? responseType : "";
                handleBasicInfo(e, "dtoName", 0, type);
              }}
              autoFocus
              value={final?.dtoName}
            />
          )}
        </div>
        {final?.properties && (
          <div className="dtoModalTableContainer">
            <button
              className="apiPlusButton"
              onClick={() => getDepth(0, final.properties, true, false, false)}
            >
              <FontAwesomeIcon icon={faPlus} className="plusIcon" />
            </button>
            <DtoModalTable
              data={JSON.parse(JSON.stringify(final.properties))}
              propertiesIndex={propertiesIndex}
              activeTab={activeTab}
              setPropertiesIndexList={setPropertiesIndexList}
              propertiesIndexList={propertiesIndexList}
              getDepth={getDepth}
              setModalDepth={setModalDepth}
              modalDepth={modalDepth}
              path={path}
              final={final}
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

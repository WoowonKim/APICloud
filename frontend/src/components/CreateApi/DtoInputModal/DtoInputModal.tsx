import { faCheck, faClose, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MappedTypeDescription } from "@syncedstore/core/types/doc";
import React, { useEffect, useState } from "react";
import {
  ControllerType,
  PropertiesType,
} from "../../../pages/CreateApi/ApisType";
import DtoModalTable from "../DtoModalTable/DtoModalTable";
import { handleDtoProperties } from "../validationCheck";
import "./DtoInputModal.scss";

interface Props {
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  activeTab: number;
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
  getDepth(
    idx: number,
    datas: any,
    isAdd: boolean,
    isNew: boolean,
    isDelete: boolean,
    path: any
  ): number;
  setNameList: React.Dispatch<React.SetStateAction<string[]>>;
  nameList: string[];
  dtoData: any;
  dtoExists: boolean;
  currentDtoData: any;
  setModalDepth: React.Dispatch<React.SetStateAction<number>>;
  modalDepth: number;
  state: MappedTypeDescription<{
    data: ControllerType[];
  }>;
}
const DtoInputModal = ({
  setIsModalVisible,
  activeTab,
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
  dtoData,
  dtoExists,
  currentDtoData,
  setModalDepth,
  modalDepth,
  state,
}: Props) => {
  const rootPath = state.data[selectedController].apis[selectedApi];
  const [visible, setVisible] = useState(false);

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
    if (modalDepth >= 3) {
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

    if (copy.properties === null) {
      copy.properties = [];
    }
    setFinal(copy);
  }, [modalDepth, path, final]);

  return (
    <div className="dtoInputModal">
      <div className="dtoModalContainer">
        <div className="dtoModalTitleContainer">
          {final && (
            <div className="dtoModalInputGroup">
              <input
                type="text"
                id="dtoModalDtoName"
                placeholder="DtoName"
                onChange={(e) => {
                  const type = responseType ? responseType : "";
                  handleBasicInfo(e, "dtoName", modalDepth, type);
                }}
                autoFocus
                value={final?.dtoName || ""}
              />
              {dtoExists && dtoData && dtoData.dtoName === final.dtoName && (
                <FontAwesomeIcon
                  icon={faCheck}
                  className="dtoCheckIcon"
                  onClick={() => setVisible(!visible)}
                />
              )}
            </div>
          )}
          {visible && dtoExists && dtoData && (
            <div className="dtoModalDtoContainer">
              <div className="dtoModalCloseGroup">
                <p className="dtoModalDtoUseInfoTitle">{dtoData.dtoName}</p>
                <button
                  className="dtoModalDtoCloseButton"
                  onClick={() => setVisible(!visible)}
                >
                  <FontAwesomeIcon icon={faClose} />
                </button>
              </div>
              {dtoData.properties.length > 0 &&
                dtoData.properties.map((item: any, index: number) => (
                  <div key={index} className="dtoModalDtoPropertiesContainer">
                    <span className="dtoModalDtoUseInfoText">{item.name}</span>
                    {item.collectionType === "List" ? (
                      <span className="dtoModalDtoUseInfoText">{`<List>${item.type}`}</span>
                    ) : (
                      <span className="dtoModalDtoUseInfoText">
                        {item.type}
                      </span>
                    )}
                    <span className="dtoModalDtoUseInfoText">
                      {item.required}
                    </span>
                  </div>
                ))}
              {final && (
                <button
                  className="dtoModalUseCurrentDtoButton"
                  onClick={() => {
                    handleDtoProperties(currentDtoData);
                  }}
                >
                  {dtoData.dtoName} 사용하기
                </button>
              )}
            </div>
          )}
        </div>
        {final?.properties && (
          <div className="dtoModalTableContainer">
            <button
              className="apiPlusButton"
              onClick={() =>
                getDepth(
                  0,
                  final.properties[final.properties.length - 1],
                  true,
                  false,
                  false,
                  final
                )
              }
            >
              <FontAwesomeIcon icon={faPlus} className="plusIcon" />
            </button>
            <DtoModalTable
              setPropertiesIndexList={setPropertiesIndexList}
              propertiesIndexList={propertiesIndexList}
              setModalDepth={setModalDepth}
              final={final}
              modalDepth={modalDepth}
            />
          </div>
        )}
      </div>
      <button
        className="dtoInputModalCloseButton"
        onClick={() => {
          setModalDepth(2);
          setIsModalVisible(false);
          setPropertiesIndexList([-1, -1, -1, -1]);
        }}
      ></button>
    </div>
  );
};

export default DtoInputModal;

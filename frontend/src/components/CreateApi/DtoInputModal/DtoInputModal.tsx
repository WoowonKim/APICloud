import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MappedTypeDescription } from "@syncedstore/core/types/doc";
import { useSyncedStore } from "@syncedstore/react";
import React from "react";
import { ControllerType } from "../../../pages/CreateApi/ApisType";
import DtoModalTable from "../DtoModalTable/DtoModalTable";
import { store } from "../store";
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
    responseType?: string
  ) => void;
  addProperties: (index: number, flag?: boolean) => void;
  deleteRow: (index: number, depth: number, propIndex?: number) => void;
}
const DtoInputModal = ({
  setIsModalVisible,
  activeTab,
  selectedApi,
  selectedController,
  propertiesIndex,
  responseType,
  handleBasicInfo,
  addProperties,
  deleteRow,
}: Props) => {
  const state = useSyncedStore(store);
  const rootPath = state.data[selectedController].apis[selectedApi];
  return (
    <div className="dtoInputModal">
      <div className="dtoModalContainer">
        <div className="dtoModalTitleContainer">
          <input
            type="text"
            id="dtoModalDtoName"
            placeholder="DtoName"
            onChange={(e) => handleBasicInfo(e, "dtoName", 2)}
            autoFocus
            value={
              activeTab === 2
                ? rootPath.parameters[propertiesIndex].dtoName
                : activeTab === 4
                ? rootPath.requestBody.properties[propertiesIndex].dtoName
                : activeTab === 5 &&
                  (responseType === "fail" || responseType === "success")
                ? rootPath.responses[responseType].responseBody.properties[
                    propertiesIndex
                  ].dtoName
                : ""
            }
          />
        </div>
        <div className="dtoModalTableContainer">
          <button
            className="apiPlusButton"
            onClick={() => addProperties(propertiesIndex, true)}
          >
            <FontAwesomeIcon icon={faPlus} className="plusIcon" />
          </button>
          <DtoModalTable
            data={
              activeTab === 2
                ? JSON.parse(
                    JSON.stringify(
                      rootPath.parameters[propertiesIndex]?.properties
                    )
                  )
                : activeTab === 3
                ? JSON.parse(
                    JSON.stringify(
                      rootPath.queries[propertiesIndex]?.properties
                    )
                  )
                : activeTab === 4
                ? JSON.parse(
                    JSON.stringify(
                      rootPath.requestBody.properties[propertiesIndex]
                        ?.properties
                    )
                  )
                : activeTab === 5 &&
                  (responseType === "fail" || responseType === "success")
                ? JSON.parse(
                    JSON.stringify(
                      rootPath.responses[responseType].responseBody.properties[
                        propertiesIndex
                      ]?.properties
                    )
                  )
                : []
            }
            state={state}
            selectedController={selectedController}
            selectedApi={selectedApi}
            propertiesIndex={propertiesIndex}
            activeTab={activeTab}
            deleteRow={deleteRow}
          />
        </div>
      </div>
      <button
        className="dtoInputModalCloseButton"
        onClick={() => setIsModalVisible((curr) => !curr)}
      ></button>
    </div>
  );
};

export default DtoInputModal;

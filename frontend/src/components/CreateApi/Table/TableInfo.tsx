import { MappedTypeDescription } from "@syncedstore/core/types/doc";
import React from "react";
import { ControllerType } from "../../../pages/CreateApi/ApisType";
import "./Table.scss";

interface Props {
  activeTab: number;
  handleBasicInfo: (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string,
    responseType?: string
  ) => void;
  selectedController: number;
  selectedApi: number;
  state: MappedTypeDescription<{
    data: ControllerType[];
  }>;
  responseType?: string;
}

const TableInfo = ({
  activeTab,
  handleBasicInfo,
  selectedApi,
  selectedController,
  state,
  responseType,
}: Props) => {
  console.log(activeTab);

  return (
    <div>
      {activeTab === 3 || activeTab === 4 ? (
        <div className="tableInfoInputGroup">
          <label htmlFor={`dtoName${activeTab}`} className="tableInfoLabel">
            dtoName
          </label>
          <input
            className="tableInfoInput"
            type="text"
            id={`dtoName${activeTab}`}
            onChange={(e) => handleBasicInfo(e, "dtoName")}
            value={
              activeTab === 3
                ? state.data[selectedController].apis[selectedApi].query.dtoName
                : state.data[selectedController].apis[selectedApi].requestBody
                    .dtoName
            }
          />
          <label htmlFor={`name${activeTab}`} className="tableInfoLabel">
            name
          </label>
          <input
            className="tableInfoInput"
            type="text"
            id={`name${activeTab}`}
            onChange={(e) => handleBasicInfo(e, "name")}
            value={
              activeTab === 3
                ? state.data[selectedController].apis[selectedApi].query.name
                : state.data[selectedController].apis[selectedApi].requestBody
                    .name
            }
          />
          <label htmlFor={`type${activeTab}`} className="tableInfoLabel">
            type
          </label>
          <input
            className="tableInfoInput"
            type="text"
            id={`type${activeTab}`}
            onChange={(e) => handleBasicInfo(e, "type")}
            value={
              activeTab === 3 && state.data
                ? state.data[selectedController].apis[selectedApi].query.type
                : state.data[selectedController].apis[selectedApi].requestBody
                    .type
            }
          />
          <label htmlFor={`required${activeTab}`} className="tableInfoLabel">
            required
          </label>
          <input
            className="tableInfoInput"
            type="checkbox"
            id={`required${activeTab}`}
            onChange={(e) => handleBasicInfo(e, "required")}
            checked={
              activeTab === 3 && state.data
                ? state.data[selectedController].apis[selectedApi].query
                    .required
                  ? true
                  : false
                : state.data[selectedController].apis[selectedApi].requestBody
                    .required
                ? true
                : false
            }
          />
        </div>
      ) : activeTab === 5 &&
        (responseType === "fail" || responseType === "success") ? (
        <div className="tableInfoInputGroup">
          <div>
            <p className="responseTypeLabel">{responseType}</p>
            <label htmlFor="successName" className="tableInfoLabel">
              status
            </label>
            <input
              className="tableInfoInput"
              type="text"
              id="successName"
              onChange={(e) => handleBasicInfo(e, "status", responseType)}
              value={
                state.data[selectedController].apis[selectedApi].responses[
                  responseType
                ].status
              }
            />
            <label htmlFor="successType" className="tableInfoLabel">
              type
            </label>
            <input
              className="tableInfoInput"
              type="text"
              id="successType"
              onChange={(e) => handleBasicInfo(e, "type", responseType)}
              value={
                state.data[selectedController].apis[selectedApi].responses[
                  responseType
                ].type
              }
            />
            <label htmlFor="successRequired" className="tableInfoLabel">
              required
            </label>
            <input
              type="checkbox"
              id="successRequired"
              onChange={(e) => handleBasicInfo(e, "required", responseType)}
              checked={
                state.data[selectedController].apis[selectedApi].responses[
                  responseType
                ].required
                  ? true
                  : false
              }
            />
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default TableInfo;

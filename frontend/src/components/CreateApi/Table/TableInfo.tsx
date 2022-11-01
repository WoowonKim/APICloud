import React from "react";
import { DataType } from "../../../pages/CreateApi/ApisType";
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
  wholeData: DataType;
}

const TableInfo = ({
  activeTab,
  handleBasicInfo,
  selectedApi,
  selectedController,
  wholeData,
}: Props) => {
  return (
    <div>
      {activeTab === 3 || activeTab === 4 ? (
        <div className="tableInfoInputGroup">
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
                ? wholeData.controller[selectedController].apis[selectedApi]
                    .query.name
                : wholeData.controller[selectedController].apis[selectedApi]
                    .requestBody.name
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
              activeTab === 3
                ? wholeData.controller[selectedController].apis[selectedApi]
                    .query.type
                : wholeData.controller[selectedController].apis[selectedApi]
                    .requestBody.type
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
              activeTab === 3
                ? wholeData.controller[selectedController].apis[selectedApi]
                    .query.required
                  ? true
                  : false
                : wholeData.controller[selectedController].apis[selectedApi]
                    .requestBody.required
                ? true
                : false
            }
          />
        </div>
      ) : activeTab === 5 ? (
        <div className="tableInfoInputGroup">
          <div>
            <p className="responseTypeLabel">Success</p>
            <label htmlFor="successName" className="tableInfoLabel">
              name
            </label>
            <input
              className="tableInfoInput"
              type="text"
              id="successName"
              onChange={(e) => handleBasicInfo(e, "name", "success")}
              value={
                wholeData.controller[selectedController].apis[selectedApi]
                  .responses.success.status
              }
            />
            <label htmlFor="successType" className="tableInfoLabel">
              type
            </label>
            <input
              className="tableInfoInput"
              type="text"
              id="successType"
              onChange={(e) => handleBasicInfo(e, "type", "success")}
              value={
                wholeData.controller[selectedController].apis[selectedApi]
                  .responses.success.type
              }
            />
            <label htmlFor="successRequired" className="tableInfoLabel">
              required
            </label>
            <input
              type="checkbox"
              id="successRequired"
              onChange={(e) => handleBasicInfo(e, "required", "success")}
              checked={
                wholeData.controller[selectedController].apis[selectedApi]
                  .responses.success.required
                  ? true
                  : false
              }
            />
          </div>
          <div>
            <p className="responseTypeLabel">Fail</p>
            <label htmlFor="failName" className="tableInfoLabel">
              name
            </label>
            <input
              className="tableInfoInput"
              type="text"
              id="failName"
              onChange={(e) => handleBasicInfo(e, "name", "fail")}
              value={
                wholeData.controller[selectedController].apis[selectedApi]
                  .responses.success.status
              }
            />
            <label htmlFor="failType" className="tableInfoLabel">
              type
            </label>
            <input
              className="tableInfoInput"
              type="text"
              id="failType"
              onChange={(e) => handleBasicInfo(e, "type", "fail")}
              value={
                wholeData.controller[selectedController].apis[selectedApi]
                  .responses.success.type
              }
            />
            <label htmlFor="failRequired" className="tableInfoLabel">
              required
            </label>
            <input
              className="tableInfoInput"
              type="checkbox"
              id="failRequired"
              onChange={(e) => handleBasicInfo(e, "required", "fail")}
              checked={
                wholeData.controller[selectedController].apis[selectedApi]
                  .responses.fail.required
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

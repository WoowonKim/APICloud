import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface Props {
  syncData: any;
  setSyncData: React.Dispatch<any>;
  saveChangeData: () => void;
}
const SynchroinizeData = ({ syncData, setSyncData, saveChangeData }: Props) => {
  return (
    <>
      <div className="createApiSynchronizeTitle">
        <div className="createApiSynchronizeDataTitle">변경 사항 확인하기</div>
        <button
          className="createApiCloseButton"
          onClick={() => setSyncData(undefined)}
        >
          <FontAwesomeIcon icon={faClose} />
        </button>
      </div>
      <div className="createApiSynchronizeDataContainer">
        {syncData.map((item: any, index: number) => (
          <div key={index} className="createApiSynchronizeData">
            <p className="createApiSynchronizeRootText">{item.root}</p>
            <div className="createApiSynchronizeTextContainer">
              <p className="createApiSynchronizeKeyText">{item.value.key}</p>
              <p className="createApiSynchronizeValueText">
                {JSON.stringify(item.value.value)}
              </p>
            </div>
          </div>
        ))}
      </div>
      <button
        className="createApiSynchronizeDataSaveButton"
        onClick={saveChangeData}
      >
        변경 사항 저장하기
      </button>
    </>
  );
};

export default SynchroinizeData;

import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import CodeBlock from "../WarningModal/CodeBlock";

interface Props {
  changeCode: any;
  selectedChangeCode: number;
  setSelectedChangeCode: React.Dispatch<React.SetStateAction<number>>;
  setChangeCode: React.Dispatch<any>;
}
const SynchronizeCode = ({
  changeCode,
  selectedChangeCode,
  setSelectedChangeCode,
  setChangeCode,
}: Props) => {
  return (
    <>
      <div className="createApiSynchronizeTitle">
        <div className="createApiTabContainer">
          {changeCode.map((item: any, index: number) => (
            <div
              key={index}
              className={
                selectedChangeCode === index
                  ? "createApiTabItem selectedTabItem"
                  : "createApiTabItem"
              }
              onClick={() => setSelectedChangeCode(index)}
            >
              {item.name}
            </div>
          ))}
        </div>
        <button
          className="createApiCloseButton"
          onClick={() => setChangeCode(undefined)}
        >
          <FontAwesomeIcon icon={faClose} />
        </button>
      </div>
      <div className="createApiCodeBlockContainer">
        <CodeBlock data={changeCode[selectedChangeCode].code} />
      </div>
    </>
  );
};

export default SynchronizeCode;

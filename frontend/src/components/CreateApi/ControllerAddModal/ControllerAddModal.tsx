import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { DataType } from "../../../pages/CreateApi/ApisType";
import ModalTable from "../ModalTable/ModalTable";
import "./ControllerAddModal.scss";

interface Props {
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  addApi: (index: number) => void;
  setData: React.Dispatch<React.SetStateAction<DataType>>;
  data: DataType;
  editControllerIndex: number;
}
const ControllerAddModal = ({
  setIsModalVisible,
  addApi,
  setData,
  data,
  editControllerIndex,
}: Props) => {
  // controller의 정보를 입력받아 저장할 state
  const [controllerName, setControllerName] = useState("");
  const [controllerUri, setControllerUri] = useState("");

  // controller의 추가 여부를 확인할 flag
  const [isControllerAdd, setIsControllerAdd] = useState(false);

  // modal이 렌더링될 때 기본값 초기화
  useEffect(() => {
    setIsControllerAdd(false);
    setControllerName("");
    setControllerUri("");
  }, []);
  return (
    <div className="sidebarModalContainer">
      <div className="modalInnerContainer">
        <div className="modalTitleGroup">
          <p className="modalTitleText">Controller 추가</p>
          <div className="highlightText"></div>
        </div>
        <div className="controllerInfoGroup">
          <div className="controllerInfoItem">
            <label htmlFor="controllerUri" className="controllerLabel">
              Controller Uri:
            </label>
            <input
              type="text"
              id="controllerUri"
              onChange={(e) => {
                setControllerUri(e.target.value);
              }}
              className="controllerInput1"
              placeholder="/test"
              defaultValue={
                editControllerIndex > -1
                  ? data.controller[editControllerIndex].commonUri
                  : ""
              }
            />
          </div>
          <div className="controllerInfoItem">
            <label htmlFor="controllerUri" className="controllerLabel">
              Controller Name:
            </label>
            <input
              type="text"
              id="controllerName"
              onChange={(e) => {
                setControllerName(e.target.value);
              }}
              className="controllerInput1"
              placeholder="TestController"
              defaultValue={
                editControllerIndex > -1
                  ? data.controller[editControllerIndex].name
                  : ""
              }
            />
          </div>
          <button
            className="modalCotrollerAddButton"
            onClick={() => {
              setData((old: DataType) => {
                let copy = JSON.parse(JSON.stringify(old));
                let length =
                  editControllerIndex > -1
                    ? editControllerIndex
                    : copy.controller.length;
                copy.controller[length - 1].name = controllerName;
                copy.controller[length - 1].commonUri = controllerUri;
                return copy;
              });
              setIsControllerAdd(true);
            }}
          >
            {isControllerAdd ? "Controller 수정" : "Controller 추가"}
          </button>
        </div>
        <div className="apiInfoGroup">
          <div className="apiTitleGroup">
            <p className="apiTitleText">Api 추가하기</p>
            <button
              className="apiPlusButton"
              onClick={() => {
                addApi(
                  editControllerIndex > -1
                    ? editControllerIndex
                    : data.controller.length - 1
                );
              }}
              disabled={!isControllerAdd}
            >
              <FontAwesomeIcon icon={faPlus} className="apiPlusButtonIcon" />
            </button>
          </div>
          <p className="controllerInfoText">
            Controller 정보를 모두 입력 후 Api를 추가해주세요
          </p>
          <div className="modalTableContainer">
            <ModalTable
              data={data.controller[data.controller.length - 1].apis}
              setData={setData}
            />
          </div>
        </div>
        <button
          className="controllerModalCloseButton"
          disabled={!isControllerAdd}
          onClick={() => setIsModalVisible((curr) => !curr)}
        >
          Controller 추가 완료하기
        </button>
      </div>
      <div
        className="modalCloseButton"
        onClick={() => {
          if (!isControllerAdd && editControllerIndex === -1) {
            setData((old: DataType) => {
              let copy = JSON.parse(JSON.stringify(old));
              copy.controller.pop();
              return copy;
            });
          }
          setIsModalVisible((curr) => !curr);
        }}
      ></div>
    </div>
  );
};

export default ControllerAddModal;

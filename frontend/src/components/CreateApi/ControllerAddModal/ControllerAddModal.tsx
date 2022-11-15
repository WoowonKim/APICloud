import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MappedTypeDescription } from "@syncedstore/core/types/doc";
import React, { useEffect, useState } from "react";
import { ControllerType } from "../../../pages/CreateApi/ApisType";
import ModalTable from "../ModalTable/ModalTable";
import { checkControllerApiValidation } from "../validationCheck";
import "./ControllerAddModal.scss";

interface Props {
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  addApi: (index: number) => void;
  state: MappedTypeDescription<{
    data: ControllerType[];
  }>;
  editControllerIndex: number;
  setEditControllerIndex: React.Dispatch<React.SetStateAction<number>>;
  addedControllerIndex: number;
}
const ControllerAddModal = ({
  setIsModalVisible,
  addApi,
  state,
  editControllerIndex,
  setEditControllerIndex,
  addedControllerIndex,
}: Props) => {
  // controller의 정보를 입력받아 저장할 state
  const [controllerName, setControllerName] = useState(
    editControllerIndex > -1 ? state.data?.[editControllerIndex].name : ""
  );
  const [controllerUri, setControllerUri] = useState(
    editControllerIndex > -1 ? state.data?.[editControllerIndex].commonUri : ""
  );

  // controller의 추가 여부를 확인할 flag
  const [isControllerAdd, setIsControllerAdd] = useState(
    editControllerIndex > -1 ? true : false
  );

  // controller 유효성 검사 확인 flag
  const [isControllerAddPossible, setIsControllerAddPossible] = useState(
    editControllerIndex > -1 ? true : false
  );
  // api 유효성 검사 확인 flag
  const [isApiAddPossible, setIsApiAddPossible] = useState(
    editControllerIndex > -1 ? true : false
  );

  const [controllerValidation, setControllerValidation] = useState([-1, -1]);
  const [apiValidation, setApiValidation] = useState([-1, -1]);

  const checkControllerValidation = (value: any, type: string) => {
    if (type === "uri") {
      setIsControllerAddPossible(!isControllerAdd);
      let checkController = checkControllerApiValidation(
        state.data,
        [controllerName, value],
        "controller"
      );
      setControllerValidation(checkController);
    } else {
      setIsControllerAddPossible(!isControllerAdd);
      let checkController = checkControllerApiValidation(
        state.data,
        [value, controllerUri],
        "controller"
      );
      setControllerValidation(checkController);
    }
  };

  const checkApiValidation = () => {
    for (let item of state.data[
      editControllerIndex > -1 ? editControllerIndex : addedControllerIndex
    ].apis) {
      if (!item["name"].trim() || !item["uri"].trim()) {
        setIsApiAddPossible(false);
        return;
      }
    }
    setIsApiAddPossible(true);
    setIsModalVisible((curr) => !curr);
  };

  useEffect(() => {
    setControllerValidation([-1, -1]);
    setApiValidation([-1, -1]);
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
                checkControllerValidation(e.target.value, "uri");
              }}
              className="controllerInput1"
              placeholder="/test"
              defaultValue={
                editControllerIndex > -1
                  ? state.data[editControllerIndex].commonUri
                  : ""
              }
            />
            {controllerValidation[1] === 1 && (
              <p className="controllerInfoText">
                동일한 컨트롤러 URI가 있습니다.
              </p>
            )}
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
                checkControllerValidation(e.target.value, "name");
              }}
              className="controllerInput1"
              placeholder="TestController"
              defaultValue={
                editControllerIndex > -1
                  ? state.data[editControllerIndex].name
                  : ""
              }
            />
            {controllerValidation[0] === 1 && (
              <p className="controllerInfoText">
                동일한 컨트롤러 이름이 있습니다.
              </p>
            )}
          </div>
          <button
            className="modalCotrollerAddButton"
            onClick={() => {
              if (state.data && state.data.length > 0) {
                let length =
                  editControllerIndex > -1
                    ? editControllerIndex
                    : state.data.length - 1;
                state.data[length].name = controllerName;
                state.data[length].commonUri = controllerUri;
              }
              setIsControllerAdd(true);
            }}
            disabled={
              (controllerValidation[0] === 1 &&
                controllerValidation[1] === 1) ||
              !controllerName.trim() ||
              !controllerUri.trim()
            }
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
                if (state.data && state.data.length > 0) {
                  addApi(
                    editControllerIndex > -1
                      ? editControllerIndex
                      : state.data.length - 1
                  );
                }
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
              data={JSON.parse(
                JSON.stringify(
                  state.data[
                    editControllerIndex > -1
                      ? editControllerIndex
                      : state.data.length - 1
                  ].apis
                )
              )}
              state={state}
              editControllerIndex={editControllerIndex}
              addedControllerIndex={addedControllerIndex}
            />
          </div>
        </div>
        {!isApiAddPossible && (
          <p className="controllerInfoText">Api 정보를 모두 입력해주세요</p>
        )}
        {apiValidation[0] === 1 && (
          <p className="controllerInfoText">api 이름이 중복되었습니다</p>
        )}
        {apiValidation[1] === 1 && (
          <p className="controllerInfoText">api uri가 중복되었습니다</p>
        )}
        <button
          className="controllerModalCloseButton"
          disabled={
            !isControllerAdd &&
            (apiValidation[0] === 1 || apiValidation[1] === 1)
          }
          onClick={() => {
            let checkApi = checkControllerApiValidation(
              state.data[
                editControllerIndex > -1
                  ? editControllerIndex
                  : addedControllerIndex
              ].apis,
              [],
              "api"
            );
            setApiValidation(checkApi);
            if (checkApi[0] === -1 && checkApi[1] === -1) {
              checkApiValidation();
            }
          }}
        >
          Controller 추가 완료하기
        </button>
      </div>
      <div
        className="modalCloseButton"
        onClick={() => {
          if (
            !isControllerAdd &&
            editControllerIndex === -1 &&
            state.data.length > 0
          ) {
            state.data.splice(state.data.length - 1, 1);
          }
          setEditControllerIndex(-1);
          setIsModalVisible((curr) => !curr);
        }}
      ></div>
    </div>
  );
};

export default ControllerAddModal;

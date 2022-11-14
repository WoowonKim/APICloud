import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSyncedStore } from "@syncedstore/react";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useAppDispatch } from "../../../Store/hooks";
import { getSynchronizeFile } from "../../../Store/slice/apiDocsApi";
import {
  Backdrop,
  DialogBox,
  ModalContainer,
} from "../ExtractModal/ExtractModal";
import { store } from "../store";
import "./SynchronizeModal.scss";

interface Props {
  setIsSynchronizeModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const SynchronizeModal = ({ setIsSynchronizeModal }: Props) => {
  const state = useSyncedStore(store);
  const [isFileInputModal, setIsFileInputModal] = useState(false);
  const [selectedControllerName, setSelectedControllerName] = useState("");
  const [selectedControllerIndex, setSelectedControllerIndex] = useState(-1);
  const [fileInfo, setFileInfo] = useState<any>();

  const dispatch = useAppDispatch();
  const location = useLocation();
  const synchronizeFile = () => {
    const formData = new FormData();

    const synchronizeRequest = {
      controllerId: selectedControllerIndex,
      name: selectedControllerName,
    };
    const json = JSON.stringify(synchronizeRequest);
    const blob = new Blob([json], {
      type: "application/json",
    });
    formData.append("synchronizeRequest", blob);
    if (fileInfo) {
      formData.append("file", fileInfo);
    }
    dispatch(
      getSynchronizeFile({ formData, docId: location.state?.data.docId })
    ).then((res: any) => {
      if (res.meta.requestStatus === "fulfilled") {
        console.log("fulfilled");
      }
    });
  };
  return (
    <ModalContainer>
      {!isFileInputModal ? (
        <DialogBox>
          <div>
            <div className="synchronizeModalTitle">
              동기화를 진행할 컨트롤러 선택
            </div>
            <div className="synchronizeModalButtonGroup">
              <div className="synchronizeModalButton green">
                <div>문서 to 코드</div>
                <FontAwesomeIcon icon={faCircle} color={"#6FC7D1"} />
              </div>
              <div className="synchronizeModalButton blue">
                <div>코드 to 문서</div>
                <FontAwesomeIcon icon={faCircle} color={"#277FC3"} />
              </div>
            </div>
          </div>
          <ul className="synchronizeModalList">
            {state.data.length > 0 &&
              state.data.map((controller, index) => (
                <li key={index} className="synchronizeModalListItem">
                  <div className="synchronizeModalControllerName">
                    {controller.name}
                  </div>
                  <div className="synchronizeModalButtonGroup">
                    <FontAwesomeIcon
                      icon={faCircle}
                      color={"#6FC7D1"}
                      className="synchronizeModalIcon"
                    />
                    <FontAwesomeIcon
                      icon={faCircle}
                      color={"#277FC3"}
                      className="synchronizeModalIcon"
                      onClick={() => {
                        setIsFileInputModal(!isFileInputModal);
                        setSelectedControllerIndex(index);
                        setSelectedControllerName(controller.name);
                      }}
                    />
                  </div>
                </li>
              ))}
          </ul>
        </DialogBox>
      ) : (
        <DialogBox>
          <div className="synchronizeModalTitle">{selectedControllerName}</div>
          <div>
            <div className="synchronizeModalFile">
              {fileInfo ? fileInfo?.name : "파일을 업로드해주세요"}
            </div>
            <label
              htmlFor="fileInput"
              className="synchronizeModalFileInputLabel"
            >
              파일 업로드(.zip)
            </label>
            <input
              className="synchronizeModalFileInput"
              type="file"
              id="fileInput"
              accept=".zip"
              onChange={(e) => {
                if (e.target.files) {
                  setFileInfo(e.target.files[0]);
                }
              }}
            />
          </div>
          <button onClick={synchronizeFile}>파일 동기화</button>
        </DialogBox>
      )}
      <Backdrop
        onClick={() => {
          setIsSynchronizeModal(false);
        }}
      />
    </ModalContainer>
  );
};

export default SynchronizeModal;

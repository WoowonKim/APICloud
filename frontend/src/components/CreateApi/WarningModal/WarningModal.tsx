import { faCloud } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import CodeBlock from "./CodeBlock";
import "./WarningModal.scss";

interface Props {
  setIsWarningModal: React.Dispatch<React.SetStateAction<boolean>>;
  validationResult: any;
  synchronizeApiDoc: () => void;
  changeCode?: any;
}

const WarningModal = ({
  setIsWarningModal,
  validationResult,
  synchronizeApiDoc,
  changeCode,
}: Props) => {
  useEffect(() => {
    if (!validationResult) {
      return;
    }
  }, [validationResult, changeCode]);

  console.log(changeCode);

  return (
    <div className="warningModalContainer">
      <div className="warningModalInnerContainer">
        {!changeCode ? (
          <>
            <p className="warningModalTitle">Controller 유효성 검사 결과</p>
            <p className="warningModalText">계속 진행하시겠습니까?</p>
            <div className="warningModalValidationResultContainer">
              <div className="warningModalValidationResultGroup">
                <div className="warningModalInfoDropdown">
                  <div className="warningModalValidationResultText1">
                    <FontAwesomeIcon
                      icon={faCloud}
                      className="warningModalCloudIcon"
                    />
                    <p>properties 필수값 부족</p>
                  </div>
                  <p className="warningModalInfoText">
                    properties의 name, type, required 는 필수값입니다
                  </p>
                </div>
                <div className="warningModalInfoDropdown">
                  <div className="warningModalValidationResultText1">
                    <FontAwesomeIcon
                      icon={faCloud}
                      className="warningModalCloudIcon"
                    />
                    <p>필수값 부족</p>
                  </div>
                  <p className="warningModalInfoText">name은 필수값입니다</p>
                </div>
                <div className="warningModalInfoDropdown">
                  <div className="warningModalValidationResultText1">
                    <FontAwesomeIcon
                      icon={faCloud}
                      className="warningModalCloudIcon"
                    />
                    <p>타입 설정 오류</p>
                  </div>
                  <p className="warningModalInfoText">
                    type, dtoName, properties를 정확히 설정해주세요
                  </p>
                </div>
                <div className="warningModalInfoDropdown">
                  <div className="warningModalValidationResultText1">
                    <FontAwesomeIcon
                      icon={faCloud}
                      className="warningModalCloudIcon"
                    />
                    <p>중복된 이름</p>
                  </div>
                  <p className="warningModalInfoText">
                    properties 내부와 상위의 name이 중복되었습니다.
                  </p>
                </div>
              </div>
              {validationResult && validationResult.length === 4 && (
                <div>
                  <p className="warningModalValidationResultText2">
                    {validationResult[0]}
                  </p>
                  <p className="warningModalValidationResultText2">
                    {validationResult[1]}
                  </p>
                  <p className="warningModalValidationResultText2">
                    {validationResult[2]}
                  </p>
                  <p className="warningModalValidationResultText2">
                    {validationResult[3]}
                  </p>
                </div>
              )}
            </div>
            <div className="warningModalButtonGroup">
              <div className="warningModalButton" onClick={synchronizeApiDoc}>
                동기화
              </div>
              <div
                className="warningModalButton1"
                onClick={() => {
                  setIsWarningModal((curr) => !curr);
                }}
              >
                닫기
              </div>
            </div>
          </>
        ) : (
          <>
            <div>{changeCode[0].name}</div>
            <div>{changeCode[0].importPackage}</div>
            <CodeBlock data={changeCode[0].code} />
          </>
        )}
      </div>
      <div
        className="warningModalCloseButton"
        onClick={() => {
          setIsWarningModal((curr) => !curr);
        }}
      />
    </div>
  );
};

export default WarningModal;

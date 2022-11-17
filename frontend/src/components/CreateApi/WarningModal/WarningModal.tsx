import { faCloud } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSyncedStore } from "@syncedstore/react";
import React, { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import styled from "styled-components";
import { store } from "../store";
import "./WarningModal.scss";

interface Props {
  setIsWarningModal: React.Dispatch<React.SetStateAction<boolean>>;
  validationResult: any;
  synchronizeApiDoc?: () => void;
  synchronizeFile?: any;
  prepareExtraction?: (extract: () => void) => void;
  extractSpringBoot?: () => void;
  errorMessage?: string;
  setErrorMessage?: React.Dispatch<React.SetStateAction<string>>;
  isPending?: boolean;
}

const WarningModal = ({
  setIsWarningModal,
  validationResult,
  synchronizeApiDoc,
  synchronizeFile,
  prepareExtraction,
  extractSpringBoot,
  errorMessage,
  setErrorMessage,
  isPending,
}: Props) => {
  const state = useSyncedStore(store);
  const [isLoading, setIsLoading] = useState(false);
  const [isControllerNameValidation, setIsControllerNameValidation] =
    useState(true);

  useEffect(() => {
    if (!validationResult) {
      return;
    }
  }, [validationResult]);

  const handleStart = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const checkControllerNameValidation = () => {
    const checkNameList = [];
    let cnt = 0;
    if (state.data && state.data.length > 0) {
      for (let item of state.data) {
        if (item.name !== null && item.name.trim()) {
          checkNameList.push(item.name);
        }
      }
      const result =
        checkNameList &&
        checkNameList.reduce((accu: any, curr) => {
          accu[curr] = (accu[curr] || 0) + 1;
          return accu;
        }, {});

      for (let item in result) {
        if (result[item] > 1) {
          cnt += result[item] - 1;
        }
      }
    }

    return cnt;
  };

  useEffect(() => {
    if (checkControllerNameValidation()) {
      setIsControllerNameValidation(false);
    } else {
      setIsControllerNameValidation(true);
    }
  }, []);
  return (
    <div className="warningModalContainer">
      <div className="warningModalInnerContainer">
        <p className="warningModalTitle">Controller 유효성 검사 결과</p>
        <p className="warningModalText">계속 진행하시겠습니까?</p>
        <div className="warningModalValidationResultContainer">
          <div className="warningModalValidationResultGroup">
            <div className="warningModalInfoDropdown">
              <div className="warningModalValidationResultText1">
                <CloudIcon color={synchronizeFile ? "#277fc3" : "#6fc7d1"}>
                  <FontAwesomeIcon icon={faCloud} />
                </CloudIcon>
                <p>properties 필수값 부족</p>
              </div>
              <p className="warningModalInfoText">
                properties의 name, type, required 는 필수값입니다
              </p>
            </div>
            <div className="warningModalInfoDropdown">
              <div className="warningModalValidationResultText1">
                <CloudIcon color={synchronizeFile ? "#277fc3" : "#6fc7d1"}>
                  <FontAwesomeIcon icon={faCloud} />
                </CloudIcon>
                <p>필수값 부족</p>
              </div>
              <p className="warningModalInfoText">name은 필수값입니다</p>
            </div>
            <div className="warningModalInfoDropdown">
              <div className="warningModalValidationResultText1">
                <CloudIcon color={synchronizeFile ? "#277fc3" : "#6fc7d1"}>
                  <FontAwesomeIcon icon={faCloud} />
                </CloudIcon>
                <p>타입 설정 오류</p>
              </div>
              <p className="warningModalInfoText">
                type, dtoName, properties를 정확히 설정해주세요
              </p>
            </div>
            <div className="warningModalInfoDropdown">
              <div className="warningModalValidationResultText1">
                <CloudIcon color={synchronizeFile ? "#277fc3" : "#6fc7d1"}>
                  <FontAwesomeIcon icon={faCloud} />
                </CloudIcon>
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
        {extractSpringBoot && prepareExtraction && (
          <p className="warningModalExtractText">
            Type이 Object의 경우 DtoName이 없으면 프로젝트를 추출할 수 없습니다.
          </p>
        )}
        {errorMessage && (
          <p className="warningModalExtractText">{errorMessage}</p>
        )}
        {!isControllerNameValidation && (
          <p className="warningModalExtractText">
            Controller Name이 중복되었습니다.
          </p>
        )}
        <div className="warningModalButtonGroup">
          <WarningModalButton
            disabled={!isControllerNameValidation}
            color={synchronizeFile ? "#277fc3" : "#6fc7d1"}
            className="warningModalButton"
            onClick={() => {
              if (synchronizeFile) {
                synchronizeFile();
                handleStart();
              } else if (synchronizeApiDoc) {
                synchronizeApiDoc();
              } else if (extractSpringBoot && prepareExtraction) {
                prepareExtraction(extractSpringBoot);
              }
            }}
          >
            {synchronizeFile || synchronizeApiDoc ? (
              isPending && isLoading ? (
                <div className="warningModalLoading">
                  <ThreeDots
                    height="20"
                    width="50"
                    radius="9"
                    color="#fff"
                    ariaLabel="three-dots-loading"
                    visible={true}
                  />
                </div>
              ) : (
                "동기화"
              )
            ) : (
              "추출"
            )}
          </WarningModalButton>
          <WarningModalCloseButton
            color={synchronizeFile ? "#277fc3" : "#6fc7d1"}
            className="warningModalButton"
            onClick={() => {
              setIsWarningModal((curr) => !curr);
              if (setErrorMessage) {
                setErrorMessage("");
              }
            }}
          >
            닫기
          </WarningModalCloseButton>
        </div>
      </div>
      <div
        className="warningModalCloseButton"
        onClick={() => {
          setIsWarningModal((curr) => !curr);
          if (setErrorMessage) {
            setErrorMessage("");
          }
        }}
      />
    </div>
  );
};

const CloudIcon = styled.div`
  margin: 0 10px 0 0;
  color: ${(props) => props.color};
`;

const WarningModalButton = styled.button`
  background-color: ${(props) => props.color};
  color: white;
  width: 45%;
  text-align: center;
  padding: 10px;
  border-radius: 20px;
  border: none;
  outline: none;
`;

const WarningModalCloseButton = styled.div`
  border: 1px solid ${(props) => props.color};
  color: ${(props) => props.color};
  width: 45%;
  text-align: center;
  padding: 10px;
  border-radius: 20px;
`;
export default WarningModal;

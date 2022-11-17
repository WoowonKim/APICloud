import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import {
  ControllerType,
  ServerInfoType,
} from "../../../pages/CreateApi/ApisType";
import apiDocsApiSlice, {
  getCsv,
  getNotion,
  getSpringBoot,
  setApiDetail,
} from "../../../Store/slice/apiDocsApi";
import { RootState } from "../../../Store/store";
import { checkDataValidation } from "../validationCheck";
import WarningModal from "../WarningModal/WarningModal";
import DependencyModal from "./DependencyModal";
import "./ExtractModal.scss";

type ExtractModalProps = {
  controllers: ControllerType[];
  setIsWarningModal: React.Dispatch<React.SetStateAction<boolean>>;
  isWarningModal: boolean;
};

type DetailType = {
  server: ServerInfoType;
  controllers: ControllerType[];
};

export type DependencyType = {
  id: string;
  name: string;
  fixed: boolean;
};

const web = {
  id: "web",
  name: "Spring Web",
  fixed: true,
} as DependencyType;

const ExtractModal = ({
  controllers,
  setIsWarningModal,
  isWarningModal,
}: ExtractModalProps) => {
  const isOpenExtractModal = useSelector(
    (state: RootState) => state.apiDocsApi.isOpenExtractModal
  );
  const { encryptedUrl } = useParams();

  const dispatch = useDispatch();

  const [openIdx, setOpenIdx] = useState(0);
  const [notionDBId, setNotionDBId] = useState("");
  const [notionToken, setNotionToken] = useState("");
  const [dependencies, setDependencies] = useState<DependencyType[]>([]);
  const [validationResult, setValidationResult] = useState<any>();

  const isOpenDependencyModal = useSelector(
    (state: RootState) => state.apiDocsApi.isOpenDependencyModal
  );

  useEffect(() => {
    const stringDependencies = localStorage.getItem(
      `${encryptedUrl}_dependencies`
    );
    const localDependencies: DependencyType[] = [];
    if (stringDependencies !== null) {
      JSON.parse(stringDependencies).forEach((dependency: DependencyType) => {
        localDependencies.push(dependency);
      });
    }
    if (localDependencies.every((dep: DependencyType) => dep.id !== web.id)) {
      localDependencies.push(web);
    }
    setDependencies(localDependencies);
  }, []);

  useEffect(() => {
    const localNotionToken = localStorage.getItem(`${encryptedUrl}_notion`);
    if (localNotionToken !== null) {
      setNotionToken(localNotionToken);
    }
    const localNotionPageId = localStorage.getItem(
      `${encryptedUrl}_notionPageId`
    );
    if (localNotionPageId !== null) {
      setNotionDBId(localNotionPageId);
    }
  }, [localStorage]);

  const connectNotion = () => {
    if (encryptedUrl === undefined) {
      console.log("잘못된 접근입니다.");
      return;
    }
    const notionUrl = process.env.REACT_APP_NOTION_OAUTH2 + encryptedUrl;
    window.location.replace(notionUrl);
  };

  const prepareExtraction = (extract: () => void) => {
    const detail = {} as DetailType;
    detail.controllers = controllers;
    dispatch(
      setApiDetail({
        encryptedUrl: encryptedUrl,
        detailRequest: { detail: JSON.stringify(detail) },
      })
    ).then((res: any) => {
      if (res.meta.requestStatus !== "fulfilled") {
        alert("추출에 실패하였습니다.");
        return;
      }
      extract();
    });
  };

  const extractCsv = () => {
    dispatch(getCsv({ encryptedUrl: encryptedUrl })).then((res: any) => {
      if (res.meta.requestStatus !== "fulfilled") {
        alert("추출에 실패하였습니다");
        return;
      }
      downloadFile(res.payload);
    });
  };

  const extractSpringBoot = () => {
    const listDependencies = Array.from(
      dependencies,
      (v: DependencyType) => v.id
    );
    dispatch(
      getSpringBoot({
        encryptedUrl: encryptedUrl,
        springExtractRequest: { dependencies: listDependencies },
      })
    ).then((res: any) => {
      if (res.meta.requestStatus !== "fulfilled") {
        alert("추출에 실패하였습니다.");
        return;
      }
      downloadFile(res.payload);
    });
  };

  const extractNotion = () => {
    dispatch(
      getNotion({
        encryptedUrl: encryptedUrl,
        notionRequest: {
          token: notionToken,
          databaseId: notionDBId,
        },
      })
    ).then((res: any) => {
      window.open(res.payload.notionUrl);
    });
  };

  const downloadFile = (res: any) => {
    const href = URL.createObjectURL(res.data);

    const link = document.createElement("a");
    link.href = href;
    link.download = extractDownloadFilename(res);
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  };

  const extractDownloadFilename = (res: any) => {
    const disposition = res.headers["content-disposition"];
    const fileName = decodeURI(
      disposition
        .match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/)[1]
        .replace(/['"]/g, "")
    );
    return fileName;
  };

  return (
    <>
      <ModalContainer>
        <DialogBox>
          <div className="modalContainer">
            <div className="modalMain">
              <ul className="extractModal-extractList">
                <li
                  onClick={() => setOpenIdx(1)}
                  className={openIdx === 1 ? "selected" : ""}
                >
                  <div>Spring boot</div>
                </li>
                <div className={openIdx === 1 ? "open" : ""}>
                  <div>
                    <button
                      onClick={() => {
                        dispatch(
                          apiDocsApiSlice.actions.setIsOpenDependencyModal({
                            isOpenDependencyModal: true,
                          })
                        );
                      }}
                    >
                      dependency 추가
                    </button>
                    <button
                      onClick={() => {
                        setValidationResult(checkDataValidation(controllers));
                        setOpenIdx(0);
                        setIsWarningModal(!isWarningModal);
                      }}
                    >
                      추출
                    </button>
                  </div>
                </div>
                <li
                  onClick={() => setOpenIdx(2)}
                  className={openIdx === 2 ? "selected" : ""}
                >
                  <div>Notion</div>
                </li>
                <div className={openIdx === 2 ? "open" : ""}>
                  <div>
                    <button type="button" onClick={() => connectNotion()}>
                      연동
                    </button>
                    <button
                      onClick={
                        notionToken
                          ? () => {
                              prepareExtraction(extractNotion);
                              setOpenIdx(0);
                            }
                          : () => {
                              alert(
                                "노션 연동이 되지 않았습니다. 연동 후 추출해주세요."
                              );
                            }
                      }
                    >
                      추출
                    </button>
                  </div>
                </div>
                <li
                  onClick={() => {
                    prepareExtraction(extractCsv);
                    setOpenIdx(3);
                  }}
                  className={openIdx === 3 ? "selected" : ""}
                >
                  <p>CSV</p>
                </li>
              </ul>
            </div>
          </div>
        </DialogBox>
        <Backdrop
          onClick={(e: React.MouseEvent) => {
            e.preventDefault();
            if (isOpenExtractModal) {
              dispatch(
                apiDocsApiSlice.actions.setIsOpenExtractModal({
                  isOpenExtractModal: false,
                })
              );
            }
            setOpenIdx(0);
          }}
        />
      </ModalContainer>
      {isOpenDependencyModal && (
        <DependencyModal
          dependencies={dependencies}
          setDependencies={setDependencies}
        ></DependencyModal>
      )}
      {isWarningModal && (
        <div className="synchronizeModalWarningModal">
          <WarningModal
            setIsWarningModal={setIsWarningModal}
            validationResult={validationResult}
            prepareExtraction={prepareExtraction}
            extractSpringBoot={extractSpringBoot}
          />
        </div>
      )}
    </>
  );
};

export default ExtractModal;

export const ModalContainer = styled.div`
  width: 100%;
  position: relative;
  top: 1rem;
  right: 0px;
`;

export const DialogBox = styled.dialog`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  border-radius: 20px;
  box-shadow: 0 0 30px rgba(30, 30, 30, 0.1);
  box-sizing: border-box;
  background-color: white;
  z-index: 10000;
`;

export const Backdrop = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
`;

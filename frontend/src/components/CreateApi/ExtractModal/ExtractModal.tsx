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
import DependencyModal from "./DependencyModal";
import "./ExtractModal.scss";

type ExtractModalProps = {
  controllers: ControllerType[];
};

type DetailType = {
  server: ServerInfoType;
  controllers: ControllerType[];
};

const ExtractModal = ({ controllers }: ExtractModalProps) => {
  const NOTION_URL =
    "https://great-haircut-17f.notion.site/APICloud-notion-template-24e0ac07d6e241f692aaaac2912b6732";
  const isOpenExtractModal = useSelector(
    (state: RootState) => state.apiDocsApi.isOpenExtractModal
  );
  const { encryptedUrl } = useParams();

  const dispatch = useDispatch();

  const [openIdx, setOpenIdx] = useState(0);
  const [notionDBId, setNotionDBId] = useState("");
  const [notionToken, setNotionToken] = useState("");
  const [dependencies, setDependencies] = useState<string[]>([]);

  const isOpenDependencyModal = useSelector(
    (state: RootState) => state.apiDocsApi.isOpenDependencyModal
  );

  useEffect(() => {
    const stringDependencies = localStorage.getItem("dependencies");
    if (stringDependencies !== null) {
      const localDependencies = JSON.parse(stringDependencies);
      setDependencies(localDependencies);
    }
  }, []);

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
    dispatch(
      getSpringBoot({
        encryptedUrl: encryptedUrl,
        springExtractRequest: { dependencies: dependencies },
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
                  <div>{dependencies}</div>
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
                        prepareExtraction(extractSpringBoot);
                        setOpenIdx(0);
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
                    <div>
                      1. template 복제
                      <button onClick={() => window.open(NOTION_URL)}>
                        template 복제
                      </button>
                    </div>
                    <div>
                      {/* TODO: 페이지 링크를 받아서 데이터베이스 찾아주기 */}
                      {/* TODO: local storage에 저장 */}
                      2. 데이터베이스 id
                      <input
                        type="text"
                        value={notionDBId}
                        onChange={(e) => setNotionDBId(e.target.value)}
                      ></input>
                    </div>
                    <div>
                      {/* TODO: secret key oauth로 받기 */}
                      3. token
                      <input
                        type="text"
                        value={notionToken}
                        onChange={(e) => setNotionToken(e.target.value)}
                      ></input>
                    </div>
                  </div>
                  <button>도움말</button>
                  <button
                    onClick={() => {
                      prepareExtraction(extractNotion);
                      setOpenIdx(0);
                    }}
                  >
                    추출
                  </button>
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

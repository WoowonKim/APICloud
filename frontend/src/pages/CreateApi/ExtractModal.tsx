import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import apiDocsApiSlice, {
  getCsv,
  getNotion,
  getSpringBoot,
} from "../../Store/slice/apiDocsApi";
import { RootState } from "../../Store/store";
import DependencyModal from "./DependencyModal";
import "./ExtractModal.scss";

const ExtractModal = () => {
  const NOTION_URL =
    "https://great-haircut-17f.notion.site/APICloud-notion-template-24e0ac07d6e241f692aaaac2912b6732";
  const isOpenExtractModal = useSelector(
    (state: RootState) => state.apiDocsApi.isOpenExtractModal
  );

  const dispatch = useDispatch();

  const [openIdx, setOpenIdx] = useState(0);
  const [notionDBId, setNotionDBId] = useState("");
  const [notionToken, setNotionToken] = useState("");
  const [dependencies, setDependencies] = useState<string[]>([]);

  const isOpenDependencyModal = useSelector(
    (state: RootState) => state.apiDocsApi.isOpenDependencyModal
  );

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
                    {/* TODO: dependency 추가 기능 구현 */}
                    {/* TODO: dependency local storage에 저장 */}
                    <button
                      onClick={() => {
                        console.log("dependency 추가 clicked");
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
                        // FIXME: docId 현재 encrypted docId로 수정
                        dispatch(getSpringBoot({ docId: 1 })).then(
                          (res: any) => {
                            downloadFile(res.payload);
                          }
                        );
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
                      // FIXME: docId 현재 encrypted docId로 수정
                      dispatch(
                        getNotion({
                          docId: 1,
                          notionRequest: {
                            token: notionToken,
                            databaseId: notionDBId,
                          },
                        })
                      ).then((res: any) => {
                        console.log(res.payload);
                      });
                      setOpenIdx(0);
                    }}
                  >
                    추출
                  </button>
                </div>
                <li
                  onClick={() => {
                    // FIXME: docId 현재 encrypted docId로 수정
                    dispatch(getCsv({ docId: 1 })).then((res: any) => {
                      downloadFile(res.payload);
                    });
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

const ModalContainer = styled.div`
  width: 100%;
  position: relative;
  top: 1rem;
  right: 0px;
`;

const DialogBox = styled.dialog`
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

const Backdrop = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
`;

import { faBars, faCircleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../components/ApiDocs/Sidebar";
import "../components/ApiDocs/ApiDocs.scss";
import ServerInform from "../components/ApiDocs/ServerInform";
import MakeToPDF from "../components/ApiDocs/MakeToPDF";
import DetailInform from "../components/ApiDocs/DetailInform";
import { useDispatch } from "react-redux";
import { getApiDoc } from "../Store/slice/mainApi";
import { getApiDetail } from "../Store/slice/apiDocsApi";
import { DocInformationType } from "../components/main/CreateModal";
import styled from "styled-components";
import { faFilePdf } from "@fortawesome/free-regular-svg-icons";

const ApiDocs = () => {
  const [docInform, setDocInform] = useState<DocInformationType>(); // Doc 기본 정보
  const [detail, setDetail] = useState(); // Doc Detail 정보
  const [docInformArray, setDocInformArray] =
    useState<[string, string | number][]>(); // docInform object를 array로 바꾸고 저장할 state
  const [isOpen, setIsOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0); // 스크롤된 위치 확인
  const dispatch = useDispatch();
  const localStorageDocId = localStorage.getItem("docId");
  const menuRef = useRef<HTMLDivElement[]>(null);
  const serverInformRef = useRef<HTMLDivElement>(null);

  const toggleSide = () => {
    setIsOpen(true);
  };

  // PDF로 변환하기
  const converToPDF = async (e: any) => {
    e.preventDefault();
    await MakeToPDF();
  };

  // DOC 기본 정보 가져오기
  const dispatchGetApiDoc: any = () => {
    dispatch(getApiDoc({ docId: localStorageDocId })).then((res: any) => {
      if (res.meta.requestStatus === "fulfilled") {
        setDocInform(res.payload);
      }
    });
  };

  // DOC Detail 정보 가져오기
  const dispatchGetApiDetail: any = () => {
    dispatch(getApiDetail({ docId: localStorageDocId })).then((res: any) => {
      if (res.meta.requestStatus === "fulfilled") {
        setDetail(JSON.parse(res.payload.detail));
      }
    });
  };

  // 최상단으로 scroll
  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  };

  // Scroll 위치 Update
  const updateScroll = () => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  };

  useEffect(() => {
    dispatchGetApiDetail();
    dispatchGetApiDoc();
    window.addEventListener("scroll", updateScroll);
  }, []);

  useEffect(() => {
    if (docInform) {
      delete docInform.detail;
      setDocInformArray(Object.entries(docInform));
    }
  }, [docInform]);

  useEffect(() => {}, [docInformArray, detail]);

  return (
    <div className="apiDocContainer">
      <FontAwesomeIcon
        icon={faCircleUp}
        className="circleUpIcon"
        size="3x"
        onClick={scrollUp}
      />
      {docInformArray && detail && (
        <SidebarDocWrapper>
          <div className="sidebarBox">
            <div onClick={toggleSide} className="sidebarButton">
              <FontAwesomeIcon icon={faBars} size="2x" />
            </div>
            <Sidebar
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              detail={detail}
              scrollUp={scrollUp}
              ref={menuRef}
            />
          </div>
          <div className="pdfButton" onClick={(e) => converToPDF(e)}>
            <FontAwesomeIcon icon={faFilePdf} className="pdfIcon" size="2x" />
          </div>
          <DocBox>
            <div className="pdfDocArea">
              <Doc1>
                <div className="docTitleWrapper">
                  <h1 className="docTitle" ref={serverInformRef}>
                    {docInform?.docsName} 문서
                  </h1>
                </div>
                <h2 className="serverInformTitle">Server 정보</h2>
                <ServerInform docInformArray={docInformArray} />
              </Doc1>
              <Doc2>
                <DetailInform
                  detail={detail}
                  scrollPosition={scrollPosition}
                  ref={menuRef}
                />
              </Doc2>
            </div>
          </DocBox>
        </SidebarDocWrapper>
      )}
    </div>
  );
};

export default ApiDocs;

const SidebarDocWrapper = styled.div`
  background-color: ${(props) => props.theme.docBgColor};
`;

const DocBox = styled.div`
  margin: auto;
  background-color: ${(props) => props.theme.docBgColor};
  width: 800px;
  padding-top: 10vh;
`;

const Doc1 = styled.div`
  padding: 0px;
  width: 800px;
  background-color: white;
  word-break: break-all;
  color: black;
`;

const Doc2 = styled.div`
  display: flex;
  justify-content: center;
  padding: 50px;
  width: 800px;
  background-color: white;
  word-break: break-all;
  color: black;
`;

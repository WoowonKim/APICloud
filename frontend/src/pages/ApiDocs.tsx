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
    return () => {
      localStorage.removeItem("docId");
    };
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", updateScroll);
  }, [])

  useEffect(() => {
    if (docInform) {
      delete docInform.detail;
      setDocInformArray(Object.entries(docInform));
    }
  }, [docInform]);

  return (
    <div className="apiDocContainer">
      <FontAwesomeIcon
        icon={faCircleUp}
        className="circleUpIcon"
        size="3x"
        onClick={scrollUp}
      />
      <div className="sidebarDocWrapper">
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
        <div className="docBox">
          <div className="pdfDocArea">
            <div className="doc1">
              <div className="docTitleWrapper">
                <h1 className="docTitle" ref={serverInformRef}>
                  {docInform?.docsName} 문서
                </h1>
              </div>
              <h2 className='serverInformTitle'>Server 정보</h2>
              <ServerInform docInformArray={docInformArray} />
            </div>
            <div className="doc2">
              <DetailInform
                detail={detail}
                scrollPosition={scrollPosition}
                ref={menuRef}
              />
            </div>
          </div>
          <button onClick={(e) => converToPDF(e)}>pdf로 변환</button>
        </div>
      </div>
    </div>
  );
};

export default ApiDocs;

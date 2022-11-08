import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import Sidebar from "../components/ApiDocs/Sidebar";
import "../components/ApiDocs/ApiDocs.scss";
import ApiDocPaper from "../components/ApiDocs/ApiDocPaper";
import MakeToPDF from "../components/ApiDocs/MakeToPDF";
import ApiDocPaper2 from "../components/ApiDocs/ApiDocPaper2";
import { useDispatch } from "react-redux";
import { getApiDoc } from "../Store/slice/mainApi";
import { getApiDetail } from "../Store/slice/apiDocsApi";
import { DocInformationType } from "../components/main/CreateModal";

const ApiDocs = () => {
  const [docInform, setDocInform] = useState<DocInformationType>(); // Doc 기본 정보
  const [detail, setDetail] = useState(); // Doc Detail 정보
  const [docInformArray, setDocInformArray] =
    useState<[string, string | number][]>(); // docInform object를 array로 바꾸고 저장할 state
  const [detailArray, setDetailArray] = useState<[string, [string, never]][]>(); // detail object를 array로 바꾸고 저장할 state
  const localStorageDocId = localStorage.getItem("docId");
  const [isOpen, setIsOpen] = useState(false);
  const toggleSide = () => {
    setIsOpen(true);
  };

  const dispatch = useDispatch();

  // PDF로 변환하기
  const pdf = MakeToPDF();

  const onClick = async (e: any) => {
    e.preventDefault();
    await pdf.viewWithPdf();
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

  useEffect(() => {
    dispatchGetApiDetail();
    dispatchGetApiDoc();
  }, []);

  useEffect(() => {
    if (docInform) {
      delete docInform.detail;
      setDocInformArray(Object.entries(docInform));
    }
  }, [docInform]);

  useEffect(() => {
    if (detail) {
      setDetailArray(Object.entries(detail));
    }
  }, [detail]);

  useEffect(() => {
    return () => {
      localStorage.removeItem("docId");
    };
  }, []);

  return (
    <div className="apiDocContainer">
      <div className="sidebarDocWrapper">
        <div className="sidebarBox">
          <div onClick={toggleSide} className="sidebarButton">
            <FontAwesomeIcon icon={faBars} size="2x" />
          </div>
          <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
        <div className="docBox">
          <div className="title">API DOC 페이지</div>
          <div className="doc">
            <div className="docTitleWrapper">
              <h1 className="docTitle">Server정보</h1>
            </div>
            <ApiDocPaper docInformArray={docInformArray} />
          </div>
          <br></br>
          <div className="doc">
            <ApiDocPaper2 detailArray={detailArray} />
          </div>
          <button onClick={onClick}>pdf로 변환</button>
        </div>
      </div>
    </div>
  );
};

export default ApiDocs;

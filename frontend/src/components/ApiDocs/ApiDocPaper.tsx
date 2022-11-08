import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getApiDetail } from "../../Store/slice/apiDocsApi";
import { getApiDoc } from "../../Store/slice/mainApi";
import { RootState } from "../../Store/store";
import { DocInformationType } from "../main/UpdateModal";
import "./ApiDocPaper.scss";

const ApiDocPaper = () => {
  const [docInform, setDocInform] = useState<DocInformationType>(); // Doc 기본 정보
  const [detailJson, setDetailJson] = useState(); // Doc Detail 정보
  const [docInformKeys, setDocInformKeys] = useState<string[]>();
  const [docInformValues, setDocInformValues] = useState<(string | number)[]>();
  const [detailKeys, setDetailKeys] = useState<string[]>();
  const [detailValues, setDetailValues] = useState<(string | number)[]>();

  const dispatch = useDispatch();
  const docId = useSelector((state: RootState) => state.mainApi.docId);

  // DOC 기본 정보 가져오기
  const dispatchGetApiDoc: any = (docId: number) => {
    dispatch(getApiDoc({ docId: docId })).then((res: any) => {
      if (res.meta.requestStatus === "fulfilled") {
        setDocInform(res.payload);
      }
    });
  };

  // DOC Detail 정보 가져오기
  const dispatchGetApiDetail: any = (docId: number) => {
    dispatch(getApiDetail({ docId: docId })).then((res: any) => {
      if (res.meta.requestStatus === "fulfilled") {
        setDetailJson(JSON.parse(res.payload));
      }
    });
  };

  useEffect(() => {
    dispatchGetApiDetail(docId);
    dispatchGetApiDoc(docId);
  }, []);

  useEffect(() => {
    if (docInform) {
      setDocInformKeys(Object.keys(docInform));
      setDocInformValues(Object.values(docInform));
    }
  }, [docInform]);

  useEffect(() => {
    if (detailJson) {
      setDetailKeys(Object.keys(detailJson));
      setDetailValues(Object.values(detailJson));
    }
  }, [detailJson]);

  return (
    <div className="apiDocTableWrapper">
      {docInform && (
        <>
          <h1 className="title">{docInform.docsName}</h1>
          <div className="innerWrapper1">
            <div className="tableColumn1">
              {docInformKeys &&
                docInformKeys.map((key, idx) => (
                  <div key={idx} className="tableRow1">
                    {key}
                  </div>
                ))}
            </div>
            <div className="tableColumn1">
              {docInformValues &&
                docInformValues.map((value, idx) => (
                  <div key={idx} className="tableRowContent1">
                    {value}
                  </div>
                ))}
            </div>
          </div>
        </>
      )}
      {detailJson && (
        <>
          <div className="innerWrapper2">
            <div className="tableColumn2">
              {detailKeys &&
                detailKeys.map((key, idx) => (
                  <div key={idx} className="tableRow2">
                    {key}
                  </div>
                ))}
            </div>
            <div className="tableColumn2">
              {detailValues &&
                detailValues.map((value, idx) => (
                  <div key={idx} className="tableRowContent2"></div>
                ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ApiDocPaper;

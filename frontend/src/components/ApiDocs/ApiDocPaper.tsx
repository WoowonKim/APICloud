import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ApiDocsDummy } from "../../pages/ApiDocs";
import { getApiDetail } from "../../Store/slice/apiDocsApi";
import "./ApiDocPaper.scss";

interface Props {
  ApiDocsDummy1: ApiDocsDummy[];
  ApiDocsDummy2: ApiDocsDummy[];
}

const ApiDocPaper = ({ ApiDocsDummy1, ApiDocsDummy2 }: Props) => {
  const dispatch = useDispatch();

  const dispatchGetApiDetail: any = (docId: number) => {
    dispatch(getApiDetail({ docId: docId })).then((res: any) => {
      if (res.payload?.status === 200) {
        console.log(res.payload);
      }
    });
  };

	useEffect(() => {
		dispatchGetApiDetail(1);
	}, [])

  return (
    <div className="apiDocTableWrapper">
      <h1 className="title">Eco2 API DOC</h1>
      {ApiDocsDummy1.map((column) => (
        <div className="innerWrapper1">
          <div key={column.id} className="tableColumn1">
            <div className="tableRow1">{column.category}</div>
          </div>
          <div key={column.id} className="tableColumn1">
            <div className="tableRowContent1">{column.content}</div>
          </div>
        </div>
      ))}
      {ApiDocsDummy2.map((column) => (
        <div className="innerWrapper2">
          <div key={column.id} className="tableColumn2">
            <div className="tableRow2">{column.category}</div>
          </div>
          <div key={column.id} className="tableColumn2">
            <div className="tableRowContent2">{column.content}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ApiDocPaper;

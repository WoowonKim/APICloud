import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../Store";
import { RootState } from "../../Store/rootReducer";
import testApiSlice from "../../Store/slice/testApi";
interface type {
  sideApiList: number;
}
const Headerheader = ({ sideApiList }: type) => {
  const isHeaderApi = useSelector((state: RootState) => state.testApi.header);
  const listInfo = useSelector((state: RootState) => state.sideApi);
  const [acceptValue, setAcceptValue] = useState(listInfo[sideApiList].header.Accept);
  const [acceptEncodingValue, setAcceptEncdingValue] = useState(listInfo[sideApiList].header.AcceptEncoding);
  const [connectionValue, setConnectionValue] = useState(listInfo[sideApiList].header.Connection);
  const [hostValue, setHostValue] = useState(listInfo[sideApiList].header.Host);
  const [contentLengthValue, setContentLengthValue] = useState(listInfo[sideApiList].header.contentLength);
  const [contentTypeValue, setContentTypeValue] = useState(listInfo[sideApiList].header.contentType);
  useEffect(() => {
    setAcceptValue(listInfo[sideApiList].header.Accept);
    setAcceptEncdingValue(listInfo[sideApiList].header.AcceptEncoding);
    setConnectionValue(listInfo[sideApiList].header.Connection);
    setHostValue(listInfo[sideApiList].header.Host);
    setContentLengthValue(listInfo[sideApiList].header.contentLength);
    setContentTypeValue(listInfo[sideApiList].header.contentType);
  }, [sideApiList]);
  const dispatch = useAppDispatch();
  return (
    <>
      <div className="headerListTitle">
        <p>Accept :</p>
        <p>Accept-Encoding :</p>
        <p>Connection :</p>
        <p>Host :</p>
        <p>Content-Length :</p>
        <p>Content-Type :</p>
      </div>
      {sideApiList === 0 ? (
        <div className="headerListContent">
          <p>
            <input
              type="text"
              defaultValue={isHeaderApi.Accept}
              onChange={(e) => {
                dispatch(testApiSlice.actions.setAccept({ Accept: e.target.value }));
              }}
            />
          </p>
          <p>
            <input
              type="text"
              defaultValue={isHeaderApi.AcceptEncoding}
              onChange={(e) => {
                dispatch(testApiSlice.actions.setAcceptEncodng({ AcceptEncoding: e.target.value }));
              }}
            />
          </p>
          <p>
            <input
              type="text"
              defaultValue={isHeaderApi.Connection}
              onChange={(e) => {
                dispatch(testApiSlice.actions.setConnection({ Connection: e.target.value }));
              }}
            />
          </p>
          <p>
            <input
              type="text"
              defaultValue={isHeaderApi.Host}
              onChange={(e) => {
                dispatch(testApiSlice.actions.setHost({ Host: e.target.value }));
              }}
            />
          </p>
          <p>
            <input
              type="text"
              defaultValue={isHeaderApi.contentLength}
              onChange={(e) => {
                dispatch(testApiSlice.actions.setContentLength({ contentLength: e.target.value }));
              }}
            />
          </p>
          <p>
            <input
              type="text"
              defaultValue={isHeaderApi.contentType}
              onChange={(e) => {
                dispatch(testApiSlice.actions.setContentType({ contentType: e.target.value }));
              }}
            />
          </p>
        </div>
      ) : (
        <div className="headerListContent">
          <p>
            <input
              type="text"
              value={acceptValue}
              onChange={(e) => {
                dispatch(testApiSlice.actions.setAccept({ Accept: e.target.value }));
                setAcceptValue(e.target.value);
              }}
            />
          </p>
          <p>
            <input
              type="text"
              value={acceptEncodingValue}
              onChange={(e) => {
                dispatch(testApiSlice.actions.setAcceptEncodng({ AcceptEncoding: e.target.value }));
                setAcceptEncdingValue(e.target.value);
              }}
            />
          </p>
          <p>
            <input
              type="text"
              value={connectionValue}
              onChange={(e) => {
                dispatch(testApiSlice.actions.setConnection({ Connection: e.target.value }));
                setConnectionValue(e.target.value);
              }}
            />
          </p>
          <p>
            <input
              type="text"
              value={hostValue}
              onChange={(e) => {
                dispatch(testApiSlice.actions.setHost({ Host: e.target.value }));
                setHostValue(e.target.value);
              }}
            />
          </p>
          <p>
            <input
              type="text"
              value={contentLengthValue}
              onChange={(e) => {
                dispatch(testApiSlice.actions.setContentLength({ contentLength: e.target.value }));
                setContentLengthValue(e.target.value);
              }}
            />
          </p>
          <p>
            <input
              type="text"
              value={contentTypeValue}
              onChange={(e) => {
                dispatch(testApiSlice.actions.setContentType({ contentType: e.target.value }));
                setContentTypeValue(e.target.value);
              }}
            />
          </p>
        </div>
      )}
    </>
  );
};

export default Headerheader;

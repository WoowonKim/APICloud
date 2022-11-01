import React from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../Store";
import { RootState } from "../../Store/rootReducer";
import testApiSlice from "../../Store/slice/testApi";

const Headerheader = () => {
  const isHeaderApi = useSelector((state: RootState) => state.testApi.header);
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
    </>
  );
};

export default Headerheader;

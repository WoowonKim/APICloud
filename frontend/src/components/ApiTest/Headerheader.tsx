import React from "react";
import { HeaderType } from "../../pages/TestApi";
interface Props {
  headerApi: HeaderType;
}
const Headerheader = ({ headerApi }: Props) => {
  return (
    <>
      <div className="headerListTitle">
        <p>Content-Type :</p>
        <p>Content-Length :</p>
        <p>Host :</p>
        <p>Accept :</p>
        <p>Accept-Encoding :</p>
        <p>Connection :</p>
      </div>
      <div className="headerListContent">
        <p>{headerApi.contentType}</p>
        <p>{headerApi.contentLength}</p>
        <p>{headerApi.Host}</p>
        <p>{headerApi.Accept}</p>
        <p>{headerApi.AcceptEncoding}</p>
        <p>{headerApi.Connection}</p>
      </div>
    </>
  );
};

export default Headerheader;

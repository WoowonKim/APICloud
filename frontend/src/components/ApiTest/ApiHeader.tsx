import React from "react";

const ApiHeader = () => {
  return (
    <div className="ApiHeaderContainer">
      <p>Header</p>
      <div className="HeaderList">
        <div className="HeaderListTitle">
          <p>Content-Type :</p>
          <p>Content-Length :</p>
          <p>Host :</p>
          <p>Accept :</p>
          <p>Accept-Encoding :</p>
          <p>Connection :</p>
        </div>
        <div className="HeaderListContent">
          <p> application/json</p>
          <p> calculated when request is sent</p>
          <p> calculated when request is sent</p>
          <p> */* </p>
          <p> gzip, deflate, br</p>
          <p> keep-alive </p>
        </div>
      </div>
    </div>
  );
};

export default ApiHeader;

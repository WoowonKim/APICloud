import React from "react";
import ApiListDetail from "./ApiListDetail";

const ApiList = () => {
  return (
    <div className="ApiList">
      <div className="ApiListTitle">
        <span>관리자로 진행중인 API</span>
        <span>참여자로 진행중인 API</span>
      </div>
      <div className="ApiListContent">
        <ApiListDetail />
      </div>
    </div>
  );
};

export default ApiList;

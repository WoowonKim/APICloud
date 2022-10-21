import React, { useState } from "react";
import ApiListDetail from "./ApiListDetail";
import ApiListDetailGuest from "./ApiListDetailGuest";
import { ManagerDummy, GuestDummy } from "./ListDummy";

export type ManagerDummy = {
  id: string;
  apiTitle: string;
  apiContent: string;
  member: number;
};
export type GuestDummy = {
  id: string;
  apiTitle: string;
  apiContent: string;
  member: number;
};
const ApiList = () => {
  const [ApiList, setApiList] = useState(0);
  return (
    <div className="ApiList">
      <div className="ApiListTitle">
        <span
          onClick={() => {
            setApiList(0);
          }}
        >
          관리자로 진행중인 API
        </span>
        <span
          onClick={() => {
            setApiList(1);
          }}
        >
          참여자로 진행중인 API
        </span>
      </div>
      <div className="ApiListContent">{ApiList == 0 ? <ApiListDetail ManagerDummy={ManagerDummy} /> : <ApiListDetailGuest GuestDummy={GuestDummy} />}</div>
    </div>
  );
};

export default ApiList;

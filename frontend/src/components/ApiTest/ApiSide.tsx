import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../Store/hooks";
import sideApiSlice from "../../Store/slice/sideApi";
import { RootState } from "../../Store/store";
import "./ApiTest.scss";

interface sideApi {
  setSidApiList: Dispatch<SetStateAction<number>>;
}

const ApiSide = ({ setSidApiList }: sideApi) => {
  const dispatch = useAppDispatch();
  const isTestApiList = useSelector((state: RootState) => state.sideApi);

  return (
    <div className="">
      {isTestApiList.map((it, idx) => (
        <div key={idx}>
          <p>{it.infomethod.method}</p>
          <p
            onClick={() => {
              setSidApiList(idx);
            }}
          >
            {it.infomethod.userAddress}
          </p>
          <p
            onClick={() => {
              dispatch(sideApiSlice.actions.removeMethoUri(idx));
            }}
          >
            {"삭제"}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ApiSide;

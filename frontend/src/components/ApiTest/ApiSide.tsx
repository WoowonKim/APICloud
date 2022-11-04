import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import sideApiSlice, { selectSideApi } from "../../Store/slice/sideApi";
import { RootState } from "../../Store/store";
import "./ApiTest.scss";

interface sideApi {
  setSidApiList: Dispatch<SetStateAction<number>>;
}

const ApiSide = ({ setSidApiList }: sideApi) => {
  const dispatch = useAppDispatch();
  const isTestApiList = useAppSelector(selectSideApi);

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

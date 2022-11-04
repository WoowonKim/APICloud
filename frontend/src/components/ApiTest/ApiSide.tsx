import React, { Dispatch, SetStateAction } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Store/store";
import "./ApiTest.scss";

interface sideApi {
  setSidApiList: Dispatch<SetStateAction<number>>;
}

const ApiSide = ({ setSidApiList }: sideApi) => {
  const isTestApiList = useSelector((state: RootState) => state.sideApi);
  return (
    <div className="">
      {isTestApiList.map((it, idx) => (
        <div
          key={idx}
          onClick={() => {
            setSidApiList(idx);
          }}
        >
          <p>{it.infomethod.method}</p>
          <p>{it.infomethod.userAddress}</p>
        </div>
      ))}
    </div>
  );
};

export default ApiSide;

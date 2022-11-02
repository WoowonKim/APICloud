import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Store/rootReducer";
import "./ApiTest.scss";

const ApiSide = () => {
  const isTestApiList = useSelector((state: RootState) => state.sideApi);
  return (
    <div className="">
      {isTestApiList.map((it, idx) => (
        <div key={idx}>
          <p>{it.infomethod.method}</p>
          <p>{it.infomethod.userAddress}</p>
        </div>
      ))}
    </div>
  );
};

export default ApiSide;

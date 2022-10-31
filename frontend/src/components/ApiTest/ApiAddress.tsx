import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Store/rootReducer";

const ApiAddress = () => {
  const isAddress = useSelector((state: RootState) => state.testApi.infomethod);
  return (
    <div className="apiSide">
      <p className="sideText">사이트 주소 : {isAddress.fixAddress}</p>
      <p className="sideText">공통 URI : {isAddress.commonUri}</p>
    </div>
  );
};

export default ApiAddress;

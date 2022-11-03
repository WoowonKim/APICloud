import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Store/store";

const ApiAddress = () => {
  const isAddress = useSelector((state: RootState) => state.testApi.infomethod);
  return (
    <div>
      <p className="apiSideAddress">{isAddress.userAddress}</p>
    </div>
  );
};

export default ApiAddress;

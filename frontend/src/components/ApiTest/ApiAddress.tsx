import React from "react";
import { SiteAddressType } from "../../pages/TestApi";

interface Props {
  siteAddress: SiteAddressType;
}
const ApiAddress = ({ siteAddress }: Props) => {
  return (
    <div className="apiSide">
      <p className="sideText">사이트 주소 : {siteAddress.Address}</p>
      <p className="sideText">공통 URI : {siteAddress.commonUri}</p>
    </div>
  );
};

export default ApiAddress;

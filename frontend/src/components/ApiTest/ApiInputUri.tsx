import React, { Dispatch, SetStateAction, useState } from "react";
import { SiteAddressType, subMethod } from "../../pages/TestApi";
import MethodTest from "./MethodTest";
interface Props {
  siteAddress: SiteAddressType;
  setSubmitMethod: Dispatch<SetStateAction<subMethod | null>>;
}
const ApiInputUri = ({ siteAddress, setSubmitMethod }: Props) => {
  const [getMethod, setGetMethod] = useState<string>("GET");
  const [uriAddress, setUriAddress] = useState<string>("");
  const Link = {
    method: getMethod,
    uri: uriAddress,
  };
  const subMitWord = () => {
    setSubmitMethod(Link);
  };
  return (
    <div className="apiInputContainer">
      <span className="apiChoice">
        <MethodTest setGetMethod={setGetMethod} />
      </span>
      <input
        className="apiInput"
        type="text"
        placeholder="URI를 입력"
        defaultValue={siteAddress.Address + siteAddress.commonUri + "/"}
        onChange={(e) => {
          setUriAddress(e.target.value);
        }}
      />
      <button className="apiTestBtn" onClick={subMitWord}>
        보내기
      </button>
    </div>
  );
};

export default ApiInputUri;

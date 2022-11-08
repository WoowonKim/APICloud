import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RequestTypeInfo } from "../../pages/CreateApi/ApisType";
import testApiSlice, { getApiRequestInfo, selectTestApi } from "../../Store/slice/testApi";

interface type {
  getInfo: RequestTypeInfo | undefined;
}
const Headerheader = ({ getInfo }: type) => {
  const info = useSelector(selectTestApi);
  const [getCollection, setGetCollection] = useState("");
  const [getDtoName, setGetDtoName] = useState("");
  const [getType, setGetType] = useState("");
  useEffect(() => {
    if (getInfo) {
      setGetCollection(getInfo?.controllers[info.getControllerInfomation].apis[info.getApisInfomation].requestBody.collectionType);
      setGetDtoName(getInfo?.controllers[info.getControllerInfomation].apis[info.getApisInfomation].requestBody.dtoName);
      setGetType(getInfo?.controllers[info.getControllerInfomation].apis[info.getApisInfomation].requestBody.type);
    }
  }, [getInfo, info.getControllerInfomation, info.getApisInfomation]);
  return (
    <>
      <div className="headerListTitle">
        <p>CollectionType :</p>
        <p>DtoName :</p>
        <p>Type :</p>
        <p>Token :</p>
        <p>Cookie :</p>
      </div>
      <div className="headerListContent">
        <p>
          <input
            type="text"
            value={getCollection}
            onChange={(e) => {
              setGetCollection(e.target.value);
            }}
          />
        </p>
        <p>
          <input
            type="text"
            value={getDtoName}
            onChange={(e) => {
              setGetDtoName(e.target.value);
            }}
          />
        </p>
        <p>
          <input
            type="text"
            value={getType}
            onChange={(e) => {
              setGetType(e.target.value);
            }}
          />
        </p>
      </div>
    </>
  );
};

export default Headerheader;

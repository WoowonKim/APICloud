import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  PropertiesType,
  RequestTypeInfo,
} from "../../pages/CreateApi/ApisType";
import { useAppDispatch } from "../../Store/hooks";
import testApiSlice, { selectTestApi } from "../../Store/slice/testApi";
interface type {
  getInfo: RequestTypeInfo | undefined;
}
const ApiParams = ({ getInfo }: type) => {
  const [infoParams, setInfoParams] = useState<PropertiesType[]>();

  const info = useSelector(selectTestApi);
  const dispatch = useAppDispatch();

  // PATH 경로 불러오기
  useEffect(() => {
    if (getInfo) {
      setInfoParams(
        getInfo?.controllers[info.getControllerInfomation].apis[
          info.getApisInfomation
        ].parameters
      );
    }
  }, [getInfo, info.getControllerInfomation, info.getApisInfomation]);

  useEffect(() => {
    if (infoParams) {
      infoParams?.map((it, idx) => {
        dispatch(testApiSlice.actions.getParamsID(it.name));
      });
    }
  }, [getInfo, info.getControllerInfomation, info.getApisInfomation]);

  return (
    <>
      {infoParams?.map((it, idx) => (
        <div className="headerListTitleisHeader" key={idx}>
          {it.name && (
            <div className="apiKeyHeaderTitle">
              <p className="apiHeaderListPtag">{it.name}</p>
            </div>
          )}
          {it.name && (
            <div className="apiKeyHeaderTitleValueSubmit">
              <p className="apiHeaderListPtagInput">
                <input
                  className="apiHeaderListInputTag"
                  type="text"
                  value={"URI창에 Path를 입력해주세요."}
                />
              </p>
            </div>
          )}
          {it.name && (
            <div className="apiKeyHeaderTitleCheck">
              <p className="apiHeaderListButtonTag">SAVE</p>
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default ApiParams;

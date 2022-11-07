import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ApisType, ControllerType, RequestTypeInfo } from "../../pages/CreateApi/ApisType";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import mainApiSlice, { getApiDoc, mainApi } from "../../Store/slice/mainApi";
import sideApiSlice, { selectSideApi, SideApiProps } from "../../Store/slice/sideApi";
import testApiSlice, { getApiRequestInfo, selectTestApi } from "../../Store/slice/testApi";
import testApiTestSlice, { selectTestApiTest } from "../../Store/slice/testApiTest";
import { RootState } from "../../Store/store";
import MethodTest from "./MethodTest";

interface list {
  sideApiList: number;
}

const ApiInputUri = ({ sideApiList }: list) => {
  const dispatch = useAppDispatch();

  const isInfo = useAppSelector(selectTestApi);
  const listInfo = useAppSelector(selectSideApi);
  const getDocsId = useAppSelector(mainApi);

  const [value, setValue] = useState(listInfo[sideApiList]?.infomethod.userAddress);
  const [getUri, setUri] = useState("");
  const [defaultFlag, setDefaltFlag] = useState(false);
  const [getRequestInfo, setGetRequestInfo] = useState<RequestTypeInfo>();

  useEffect(() => {
    setValue(listInfo[sideApiList]?.infomethod.userAddress);
    if (!defaultFlag) {
      dispatch(sideApiSlice.actions.addMethodUri(isInfo));
      setDefaltFlag(true);
    }
  }, [sideApiList]);

  useEffect(() => {
    dispatch(getApiDoc({ docId: getDocsId.docId })).then((res: any) => {
      if (res.payload?.status === 200) {
        // setUri(res.payload?.docInformation.contextUri);
      }
    });
  }, [getDocsId.docId]);

  useEffect(() => {
    dispatch(getApiRequestInfo({ docId: getDocsId.docId })).then((res: any) => {
      const json = res.payload.detail;
      const obj = JSON.parse(json);
      console.log("obj => ", obj);
      setGetRequestInfo(obj);
    });
  }, [getDocsId.docId]);

  useEffect(() => {
    if (getRequestInfo) {
      console.log("GetRequestInfoTest => ", getRequestInfo.controllers[0].apis[0].method);
      setUri(getRequestInfo.controllers[0].apis[0].uri);
    }
  }, [getRequestInfo]);

  const testFunction = () => {
    console.log("isInfo ====> ", isInfo);
  };

  // const wordApi = listInfo[sideApiList]?.infomethod.method;
  const wordApi = getRequestInfo?.controllers[0].apis[0].method;
  // console.log("WordAPI ===> ", wordApie);

  const pushInfoUri = (e: SideApiProps) => {
    dispatch(sideApiSlice.actions.checkMethod(e));
  };
  return (
    <div className="apiInputContainer">
      <span className="apiChoice">
        <MethodTest methodApiWord={wordApi} />
      </span>
      <input className="apiInput" type="text" defaultValue={getUri} />
      {/* {sideApiList === 0 ? (
        <input
          className="apiInput"
          type="text"
          defaultValue={getUri}
          onChange={(e) => {
            dispatch(testApiSlice.actions.setUserAddress({ userAddress: e.target.value }));
          }}
        />
      ) : (
        <input
          className="apiInput"
          type="text"
          value={value || ""}
          onChange={(e) => {
            dispatch(testApiSlice.actions.setUserAddress({ userAddress: e.target.value }));
            setValue(e.target.value);
          }}
        />
      )} */}
      <button
        className="apiTestBtn"
        onClick={() => {
          testFunction();
        }}
      >
        보내기
      </button>
      <button
        className="apiTestBtn"
        onClick={() => {
          pushInfoUri(isInfo);
        }}
      >
        저장하기
      </button>
    </div>
  );
};

export default ApiInputUri;

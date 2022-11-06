import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../Store/hooks";
import sideApiSlice, { SideApiProps } from "../../Store/slice/sideApi";
import testApiSlice from "../../Store/slice/testApi";
import { RootState } from "../../Store/store";
import MethodTest from "./MethodTest";

interface list {
  sideApiList: number;
}

const ApiInputUri = ({ sideApiList }: list) => {
  const isInfo = useSelector((state: RootState) => state.testApi);
  const listInfo = useSelector((state: RootState) => state.sideApi);
  const dispatch = useAppDispatch();
  const [value, setValue] = useState(listInfo[sideApiList]?.infomethod.userAddress);
  const [defaultFlag, setDefaltFlag] = useState(false);
  useEffect(() => {
    setValue(listInfo[sideApiList]?.infomethod.userAddress);
    if (!defaultFlag) {
      dispatch(sideApiSlice.actions.addMethodUri(isInfo));
      setDefaltFlag(true);
    }
  }, [sideApiList]);
  const testFunction = () => {
    // 보내기 클릭 시 전송해야하는 객체이므로 임시로 log처리 추후 변경 예정
    console.log("isInfo ====> ", isInfo);
  };

  const wordApi = listInfo[sideApiList]?.infomethod.method;
  const pushInfoUri = (e: SideApiProps) => {
    dispatch(sideApiSlice.actions.checkMethod(e));
  };
  return (
    <div className="apiInputContainer">
      <span className="apiChoice">
        <MethodTest methodApiWord={wordApi} />
      </span>
      {sideApiList === 0 ? (
        <input
          className="apiInput"
          type="text"
          defaultValue={isInfo.infomethod.userAddress}
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
      )}
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

import React from "react";
import { useSelector } from "react-redux";

import { useAppDispatch } from "../../Store";
import { RootState } from "../../Store/rootReducer";
import testApiSlice from "../../Store/slice/testApi";
import MethodTest from "./MethodTest";

const ApiInputUri = () => {
  const isInfo = useSelector((state: RootState) => state.testApi);
  const dispatch = useAppDispatch();
  const testFunction = () => {
    // 보내기 클릭 시 전송해야하는 객체이므로 임시로 log처리 추후 변경 예정
    console.log("isInfo ====> ", isInfo);
  };

  return (
    <div className="apiInputContainer">
      <span className="apiChoice">
        <MethodTest />
      </span>
      <input
        className="apiInput"
        type="text"
        defaultValue={isInfo.infomethod.userAddress}
        onChange={(e) => {
          dispatch(testApiSlice.actions.setUserAddress({ userAddress: e.target.value }));
        }}
      />
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
          testFunction();
        }}
      >
        저장하기
      </button>
    </div>
  );
};

export default ApiInputUri;

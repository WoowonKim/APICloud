import React from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../Store";
import { RootState } from "../../Store/rootReducer";
import sideApiSlice from "../../Store/slice/sideApi";
import testApiSlice from "../../Store/slice/testApi";
import MethodTest from "./MethodTest";

export type Props = {
  header: {
    contentType: string;
    contentLength: string;
    Host: string;
    Accept: string;
    AcceptEncoding: string;
    Connection: string;
    Token: string;
    Cookie: string;
  };
  infomethod: {
    address: string;
    commonUri: string;
    userAddress: string;
    method: string;
  };
  body: string;
};

const ApiInputUri = () => {
  const isInfo = useSelector((state: RootState) => state.testApi);
  const isInfoHeader = useSelector((state: RootState) => state.testApi.header);
  const isInfoBody = useSelector((state: RootState) => state.testApi.body);
  const dispatch = useAppDispatch();
  const testFunction = () => {
    // 보내기 클릭 시 전송해야하는 객체이므로 임시로 log처리 추후 변경 예정
    console.log("isInfo ====> ", isInfo);
  };
  const submitFolder = (e: Props) => {
    dispatch(sideApiSlice.actions.addMethodUri(e));
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
          submitFolder(isInfo);
        }}
      >
        저장하기
      </button>
    </div>
  );
};

export default ApiInputUri;

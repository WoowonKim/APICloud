import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../Store/hooks";

import testApiSlice from "../../Store/slice/testApi";
import { RootState } from "../../Store/store";
interface type {
  sideApiList: number;
}
const ApiBody = ({ sideApiList }: type) => {
  const [textValue, setTextValue] = useState("");
  const listInfo = useSelector((state: RootState) => state.sideApi);
  const [bodyValue, setBodyValue] = useState(listInfo[sideApiList]?.body);
  const dispatch = useAppDispatch();
  useEffect(() => {
    setBodyValue(listInfo[sideApiList]?.body);
  }, [sideApiList]);
  const handleSetValue = (e: { target: { value: React.SetStateAction<string> } }) => {
    setTextValue(e.target.value);
  };

  const handleSetTab = (e: { keyCode?: any; preventDefault?: any; target: any }) => {
    if (e.keyCode === 9) {
      e.preventDefault();
      let val = e.target.value;
      let start = e.target.selectionStart;
      let end = e.target.selectionEnd;
      e.target.value = val.substring(0, start) + "\t" + val.substring(end);
      e.target.selectionStart = e.target.selectionEnd = start + 1;
      handleSetValue(e);
      return false; //  prevent focus
    }
  };
  return (
    <div className="apiBodyContainer">
      <span>Body</span>
      {sideApiList === 0 ? (
        <textarea
          className="bodyArea"
          placeholder="값을 입력해 주세요"
          value={textValue || ""}
          onChange={(e) => {
            handleSetValue(e);
          }}
          onKeyDown={(e) => handleSetTab(e)}
        ></textarea>
      ) : (
        <textarea
          className="bodyArea"
          placeholder="값을 입력해 주세요"
          value={bodyValue || ""}
          onChange={(e) => {
            handleSetValue(e);
            setBodyValue(e.target.value);
          }}
          onKeyDown={(e) => handleSetTab(e)}
        ></textarea>
      )}
    </div>
  );
};

export default ApiBody;

import React from "react";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import testApiSlice, { selectTestApi } from "../../Store/slice/testApi";

const ApiResList = () => {
  const info = useAppSelector(selectTestApi);
  const dispatch = useAppDispatch();
  const onClickBtn = (e: number) => {
    dispatch(testApiSlice.actions.getResNum(e));
  };
  return (
    <div>
      {info.getResponseListNumber === 0 && (
        <>
          <span className="testListNum" onClick={() => onClickBtn(0)}>
            Header
          </span>
          <span className="testListNumsmall" onClick={() => onClickBtn(1)}>
            Body
          </span>
        </>
      )}
      {info.getResponseListNumber === 1 && (
        <>
          <span className="testListNumsmall" onClick={() => onClickBtn(0)}>
            Header
          </span>
          <span className="testListNum" onClick={() => onClickBtn(1)}>
            Body
          </span>
        </>
      )}
      {info.getResponseListNumber === 2}
    </div>
  );
};

export default ApiResList;

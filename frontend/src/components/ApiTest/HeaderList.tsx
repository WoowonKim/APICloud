import React from "react";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import testApiSlice, { selectTestApi } from "../../Store/slice/testApi";

const HeaderList = () => {
  const info = useAppSelector(selectTestApi);
  const dispatch = useAppDispatch();
  const onClickBtn = (e: number) => {
    dispatch(testApiSlice.actions.getHeadNum(e));
  };

  return (
    <div>
      {info.getHeadListNumber === 0 && (
        <>
          <span className="testListNum" onClick={() => onClickBtn(0)}>
            Headers
          </span>
          <span className="testListNumsmall" onClick={() => onClickBtn(1)}>
            Body
          </span>
          <span className="testListNumsmall" onClick={() => onClickBtn(2)}>
            Queries
          </span>
          <span className="testListNumsmall" onClick={() => onClickBtn(3)}>
            Params
          </span>
        </>
      )}
      {info.getHeadListNumber === 1 && (
        <>
          <span className="testListNumsmall" onClick={() => onClickBtn(0)}>
            Headers
          </span>
          <span className="testListNum" onClick={() => onClickBtn(1)}>
            Body
          </span>
          <span className="testListNumsmall" onClick={() => onClickBtn(2)}>
            Queries
          </span>
          <span className="testListNumsmall" onClick={() => onClickBtn(3)}>
            Params
          </span>
        </>
      )}
      {info.getHeadListNumber === 2 && (
        <>
          <span className="testListNumsmall" onClick={() => onClickBtn(0)}>
            Headers
          </span>
          <span className="testListNumsmall" onClick={() => onClickBtn(1)}>
            Body
          </span>
          <span className="testListNum" onClick={() => onClickBtn(2)}>
            Queries
          </span>
          <span className="testListNumsmall" onClick={() => onClickBtn(3)}>
            Params
          </span>
        </>
      )}
      {info.getHeadListNumber === 3 && (
        <>
          <span className="testListNumsmall" onClick={() => onClickBtn(0)}>
            Headers
          </span>
          <span className="testListNumsmall" onClick={() => onClickBtn(1)}>
            Body
          </span>
          <span className="testListNumsmall" onClick={() => onClickBtn(2)}>
            Queries
          </span>
          <span className="testListNum" onClick={() => onClickBtn(3)}>
            Params
          </span>
        </>
      )}
    </div>
  );
};

export default HeaderList;

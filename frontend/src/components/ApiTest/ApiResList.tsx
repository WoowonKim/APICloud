import React from "react";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import testApiSlice, { selectTestApi } from "../../Store/slice/testApi";
import styled from "styled-components";

const ApiResList = () => {
  const info = useAppSelector(selectTestApi);
  const dispatch = useAppDispatch();
  const onClickBtn = (e: number) => {
    dispatch(testApiSlice.actions.getResNum(e));
  };

  const TestListNum = styled.div`
    padding-left: 10px;
  `;
  return (
    <div>
      {info.getResponseListNumber === 0 && (
        <TestListNum>
          <span className="testListNum" onClick={() => onClickBtn(0)}>
            Header
          </span>
          <span className="testListNumsmall" onClick={() => onClickBtn(1)}>
            Body
          </span>
        </TestListNum>
      )}
      {info.getResponseListNumber === 1 && (
        <TestListNum>
          <span className="testListNumsmall" onClick={() => onClickBtn(0)}>
            Header
          </span>
          <span className="testListNum" onClick={() => onClickBtn(1)}>
            Body
          </span>
        </TestListNum>
      )}
      {info.getResponseListNumber === 2}
    </div>
  );
};

export default ApiResList;

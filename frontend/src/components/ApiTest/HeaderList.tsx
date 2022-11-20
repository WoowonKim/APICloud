import React from "react";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import testApiSlice, { selectTestApi } from "../../Store/slice/testApi";
import styled from "styled-components";

const HeaderList = () => {
  const info = useAppSelector(selectTestApi);
  const dispatch = useAppDispatch();
  const onClickBtn = (e: number) => {
    dispatch(testApiSlice.actions.getHeadNum(e));
  };
  const TestListNum = styled.div`
    padding-left: 10px;
  `;
  return (
    <div>
      {info.getHeadListNumber === 0 && (
        <TestListNum>
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
        </TestListNum>
      )}
      {info.getHeadListNumber === 1 && (
        <TestListNum>
          <span className="testListNumsmall" onClick={() => onClickBtn(0)}>
            Headers
          </span>
          <span className="testListNum" onClick={() => onClickBtn(1)}>
            Body
          </span>
          <span className="testListNumsmall" onClick={() => onClickBtn(2)}>
            Query
          </span>
          <span className="testListNumsmall" onClick={() => onClickBtn(3)}>
            Path
          </span>
        </TestListNum>
      )}
      {info.getHeadListNumber === 2 && (
        <TestListNum>
          <span className="testListNumsmall" onClick={() => onClickBtn(0)}>
            Headers
          </span>
          <span className="testListNumsmall" onClick={() => onClickBtn(1)}>
            Body
          </span>
          <span className="testListNum" onClick={() => onClickBtn(2)}>
            Query
          </span>
          <span className="testListNumsmall" onClick={() => onClickBtn(3)}>
            Path
          </span>
        </TestListNum>
      )}
      {info.getHeadListNumber === 3 && (
        <TestListNum>
          <span className="testListNumsmall" onClick={() => onClickBtn(0)}>
            Headers
          </span>
          <span className="testListNumsmall" onClick={() => onClickBtn(1)}>
            Body
          </span>
          <span className="testListNumsmall" onClick={() => onClickBtn(2)}>
            Query
          </span>
          <span className="testListNum" onClick={() => onClickBtn(3)}>
            Path
          </span>
        </TestListNum>
      )}
    </div>
  );
};

export default HeaderList;

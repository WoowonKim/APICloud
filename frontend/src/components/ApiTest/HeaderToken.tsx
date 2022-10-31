import React from "react";
import { useSelector } from "react-redux";

import { useAppDispatch } from "../../Store";
import { RootState } from "../../Store/rootReducer";
import testApiSlice from "../../Store/slice/testApi";

const HeaderToken = () => {
  const isApi = useSelector((state: RootState) => state.testApi.header);
  const dispatch = useAppDispatch();
  return (
    <>
      <div className="headerListTitle">
        <p>Token :</p>
      </div>
      <div className="headerListContent">
        <>
          {isApi.Token.length == 0 ? (
            <input
              className="tokenInput"
              type="text"
              onChange={(e) => {
                dispatch(testApiSlice.actions.setToken({ Token: e.target.value }));
              }}
              defaultValue={isApi.Token}
            />
          ) : (
            <input
              className="tokenInput"
              type="text"
              onChange={(e) => {
                dispatch(testApiSlice.actions.setToken({ Token: e.target.value }));
              }}
              defaultValue={isApi.Token}
            />
          )}
        </>
      </div>
    </>
  );
};

export default HeaderToken;

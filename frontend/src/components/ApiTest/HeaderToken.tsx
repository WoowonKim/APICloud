import React from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../Store/hooks";
import testApiSlice from "../../Store/slice/testApi";
import { RootState } from "../../Store/store";

const HeaderToken = () => {
  const isApi = useSelector((state: RootState) => state.testApi.header);
  const dispatch = useAppDispatch();
  return (
    <>
      <div className="headerListTitle">
        <p>Token :</p>
        <p>Cookie :</p>
      </div>
      {isApi.Token.length == 0 ? (
        <div className="headerListContent">
          <p>
            <input
              type="text"
              onChange={(e) => {
                dispatch(
                  testApiSlice.actions.setToken({ Token: e.target.value })
                );
              }}
              defaultValue={isApi.Token}
            />
          </p>
          <p>
            <input
              type="text"
              onChange={(e) => {
                dispatch(
                  testApiSlice.actions.setCookie({ Cookie: e.target.value })
                );
              }}
              defaultValue={isApi.Cookie}
            />
          </p>
        </div>
      ) : (
        <div className="headerListContent">
          <p>
            <input
              type="text"
              onChange={(e) => {
                dispatch(
                  testApiSlice.actions.setToken({ Token: e.target.value })
                );
              }}
              defaultValue={isApi.Token}
            />
          </p>
          <p>
            <input
              type="text"
              onChange={(e) => {
                dispatch(
                  testApiSlice.actions.setCookie({ Cookie: e.target.value })
                );
              }}
              defaultValue={isApi.Cookie}
            />
          </p>
        </div>
      )}
    </>
  );
};

export default HeaderToken;

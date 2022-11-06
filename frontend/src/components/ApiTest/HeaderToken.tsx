import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Store/store";
import testApiSlice from "../../Store/slice/testApi";
import { useAppDispatch } from "../../Store/hooks";
interface type {
  sideApiList: number;
}
const HeaderToken = ({ sideApiList }: type) => {
  const isApi = useSelector((state: RootState) => state.testApi.header);
  const listInfo = useSelector((state: RootState) => state.sideApi);
  const [tokenValue, setTokenValue] = useState(listInfo[sideApiList].header.Token);
  const [cookieValue, setCookieValue] = useState(listInfo[sideApiList].header.Cookie);
  useEffect(() => {
    setTokenValue(listInfo[sideApiList].header.Token);
    setCookieValue(listInfo[sideApiList].header.Cookie);
  }, [sideApiList]);
  const dispatch = useAppDispatch();
  return (
    <>
      <div className="headerListTitle">
        <p>Token :</p>
        <p>Cookie :</p>
      </div>
      {sideApiList === 0 ? (
        <div className="headerListContent">
          <p>
            <input
              type="text"
              onChange={(e) => {
                dispatch(testApiSlice.actions.setToken({ Token: e.target.value }));
              }}
              defaultValue={isApi.Token}
            />
          </p>
          <p>
            <input
              type="text"
              onChange={(e) => {
                dispatch(testApiSlice.actions.setCookie({ Cookie: e.target.value }));
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
              value={tokenValue || ""}
              onChange={(e) => {
                dispatch(testApiSlice.actions.setToken({ Token: e.target.value }));
                setTokenValue(e.target.value);
              }}
            />
          </p>
          <p>
            <input
              type="text"
              value={cookieValue || ""}
              onChange={(e) => {
                dispatch(testApiSlice.actions.setCookie({ Cookie: e.target.value }));
                setCookieValue(e.target.value);
              }}
            />
          </p>
        </div>
      )}
    </>
  );
};

export default HeaderToken;

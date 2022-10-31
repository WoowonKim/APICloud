import React, { useState } from "react";
import { HeaderType } from "../../pages/TestApi";
interface Props {
  headerApi: HeaderType;
}
const HeaderToken = ({ headerApi }: Props) => {
  const [changeToken, setChangeToken] = useState<String | null>("");

  return (
    <>
      <div className="headerListTitle">
        <p>Token :</p>
      </div>
      <div className="headerListContent">
        <>
          {headerApi.Token.length == 0 ? (
            <input
              className="tokenInput"
              type="text"
              onChange={(e) => {
                setChangeToken(e.target.value);
              }}
              placeholder="로그인 하여 Token값을 받으세요."
            />
          ) : (
            <input
              className="tokenInput"
              type="text"
              onChange={(e) => {
                setChangeToken(e.target.value);
              }}
              defaultValue={headerApi.Token}
            />
          )}
        </>
      </div>
    </>
  );
};

export default HeaderToken;

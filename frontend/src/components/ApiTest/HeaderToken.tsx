import React, { useEffect, useState } from "react";
interface type {
  sideApiList: number;
}
const HeaderToken = ({ sideApiList }: type) => {
  return (
    <>
      <div className="headerListTitle">
        <p>Token :</p>
        <p>Cookie :</p>
      </div>
    </>
  );
};

export default HeaderToken;

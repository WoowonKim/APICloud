import React from "react";
import { useAppSelector } from "../../Store/hooks";
import { selectTestApi } from "../../Store/slice/testApi";

const ApiHeaderTitle = () => {
  const info = useAppSelector(selectTestApi);
  return (
    <>
      {info.getHeadListNumber !== 1 && (
        <>
          <div className="headerList">
            <div className="apiKeyHeaderTitle">
              <p className="apiHeaderListSpan">KEY</p>
            </div>
            <div className="apiKeyHeaderTitleValue">
              <p className="apiHeaderListSpan">VALUE</p>
            </div>
            <div className="apiKeyHeaderTitleCheck">
              <p className="apiHeaderListSpan">CHECK</p>
            </div>
          </div>
        </>
      )}
      {info.getHeadListNumber === 1 && (
        <>
          <div className="headerListBody"></div>
        </>
      )}
    </>
  );
};

export default ApiHeaderTitle;

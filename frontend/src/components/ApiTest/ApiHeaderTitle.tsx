import React from "react";

const ApiHeaderTitle = () => {
  return (
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
  );
};

export default ApiHeaderTitle;

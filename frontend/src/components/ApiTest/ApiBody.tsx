import React, { useState } from "react";

const ApiBody = () => {
  const [textValue, setTextValue] = useState("");

  const handleSetValue = (e: { target: { value: React.SetStateAction<string> } }) => {
    setTextValue(e.target.value);
  };

  const handleSetTab = (e: { keyCode?: any; preventDefault?: any; target: any }) => {
    console.log(e.keyCode);
    if (e.keyCode === 9) {
      e.preventDefault();
      let val = e.target.value;
      let start = e.target.selectionStart;
      let end = e.target.selectionEnd;
      e.target.value = val.substring(0, start) + "\t" + val.substring(end);
      e.target.selectionStart = e.target.selectionEnd = start + 1;
      handleSetValue(e);
      return false; //  prevent focus
    }
  };
  return (
    <div className="ApiBodyContainer">
      <p>Body</p>
      <textarea
        className="bodyArea"
        placeholder="값을 입력해 주세요"
        value={textValue}
        onChange={(e) => handleSetValue(e)}
        onKeyDown={(e) => handleSetTab(e)}
      ></textarea>
    </div>
  );
};

export default ApiBody;

import React, { useEffect, useState } from "react";
import { CopyBlock, atomOneDark } from "react-code-blocks";

interface Props {
  data: any;
}

const CodeBlock = ({ data }: Props) => {
  const [code, setCode] = useState("");
  useEffect(() => {
    if (!data) {
      return;
    }
    let setData = "";
    for (let item of data) {
      setData += item;
      setData += `\n`;
    }
    setCode(setData);
  }, [data]);
  return (
    <CopyBlock
      language="java"
      text={code}
      showLineNumbers={true}
      theme={atomOneDark}
      wrapLines={true}
      codeBlock
    />
  );
};

export default CodeBlock;

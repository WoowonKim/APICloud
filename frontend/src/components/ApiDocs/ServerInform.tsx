import React from "react";
import "./ServerInform.scss";

interface Props {
  docInformArray: [string, string | number][] | undefined
}

const ServerInform = ({docInformArray}: Props) => {
  return (
    <div className="apiDocTableWrapper">
      <table className="apiDocTable">
        <thead className="apiDocHead">
          <tr className="apiDocHeadRow">
            <th className="apiDocHeadTitle">제목</th>
            <th className="apiDocHeadContent">내용</th>
          </tr>
        </thead>
        <tbody className="apiDocBody">
          {docInformArray &&
            docInformArray.map((row, idx) => (
              <tr key={idx} className="apiDocBodyRow">
                <td className="apiDocBodyTitle">{row[0]}</td>
                <td className="apiDocBodyContent">{row[1]}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ServerInform;

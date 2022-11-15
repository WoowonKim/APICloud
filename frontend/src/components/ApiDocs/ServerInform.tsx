import React, { useEffect } from "react";
import { useAppDispatch } from "../../Store/hooks";
import testApiSlice from "../../Store/slice/testApi";
import "./ServerInform.scss";

interface Props {
  docInformArray: [string, string | number][] | undefined;
}

const ServerInform = ({ docInformArray }: Props) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (docInformArray) {
      docInformArray?.map((it, idx) => {
        if (it[0] === "serverUrl") {
          console.log("it[1]=>", it[1]);

          dispatch(testApiSlice.actions.getURL({ url: it[1] }));
        }
        if (it[0] === "contextUri") {
          dispatch(testApiSlice.actions.getContext({ context: it[1] }));
        }
      });
    }
  }, [docInformArray]);
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

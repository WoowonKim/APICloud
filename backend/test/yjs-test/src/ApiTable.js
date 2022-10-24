import { forwardRef } from "react";

const ApiTable = ({ index, apis, sharedApi, sharedArray }) => {
  const handleOnChange = (e, key) => {
    console.log(e.target.name);
    // let copy = [...apis];
    // copy[index].details[key][e.target.name] = e.target.value;
    apis[index].details[key][e.target.name] = e.tartget.value;
    // sharedArray.current.delete(0, sharedApi.length);
    // sharedArray.current.insert(0, [...copy]);
  };
  const handleApiAdd = () => {
    // let copy = [...apis];
    // copy[index].details.push({
    //   detailUrl: "",
    //   summary: "",
    //   method: "",
    //   param: "",
    //   requestBody: "",
    //   responseBody: "",
    // });
    apis[index].details.push({
      detailUrl: "",
      summary: "",
      method: "",
      param: "",
      requestBody: "",
      responseBody: "",
    });
    // sharedArray.current.delete(0, sharedApi.length);
    // sharedArray.current.insert(0, [...copy]);
  };
  return (
    <div>
      <h2>{apis[index].url}</h2>
      <table>
        <tr>
          <td>세부 URL</td>
          <td>summary</td>
          <td>method</td>
          <td>param</td>
          <td>requestBody</td>
          <td>resqonseBody</td>
        </tr>
        {apis[index].details.map((detailApi, key) => {
          return (
            <tr key={key}>
              <td>
                <input
                  key={key}
                  type="text"
                  name="detailUrl"
                  value={detailApi.detailUrl}
                  onChange={(e) => {
                    handleOnChange(e, key);
                  }}
                />
              </td>
              <td>
                <input
                  key={key}
                  type={"text"}
                  name="summary"
                  value={detailApi.summary}
                  onChange={(e) => {
                    handleOnChange(e, key);
                  }}
                ></input>
              </td>
              <td>
                <input
                  key={key}
                  type={"text"}
                  name="method"
                  value={detailApi.method}
                  onChange={(e) => {
                    handleOnChange(e, key);
                  }}
                ></input>
              </td>
              <td>
                <input
                  key={key}
                  type={"text"}
                  name="param"
                  value={detailApi.param}
                  onChange={(e) => {
                    handleOnChange(e, key);
                  }}
                ></input>
              </td>
              <td>
                <input
                  key={key}
                  type={"text"}
                  name="requestBody"
                  value={detailApi.requestBody}
                  onChange={(e) => {
                    handleOnChange(e, key);
                  }}
                ></input>
              </td>
              <td>
                <input
                  key={key}
                  type={"text"}
                  name="responseBody"
                  value={detailApi.responseBody}
                  onChange={(e) => {
                    handleOnChange(e, key);
                  }}
                ></input>
              </td>
            </tr>
          );
        })}
      </table>
      <button onClick={handleApiAdd}>API 추가</button>
    </div>
  );
};

export default forwardRef(ApiTable);

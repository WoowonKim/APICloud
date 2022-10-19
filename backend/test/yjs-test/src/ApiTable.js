const ApiTable = ({ index, apis, setApis }) => {
  const handleOnChange = (e, key) => {
    console.log(e.target.name);
    let copy = [...apis];
    copy[index].details[key][e.target.name] = e.target.value;
    setApis(copy);
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
            <tr>
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
    </div>
  );
};

export default ApiTable;

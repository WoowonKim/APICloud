import { useState } from "react";
import ApiTable from "./ApiTable";
import "./App.css";

function App() {
  const [apis, setApis] = useState([
    {
      url: "/user",
      details: [
        {
          detailUrl: "",
          summary: "",
          method: "",
          param: "",
          requestBody: "",
          responseBody: "",
        },
      ],
    },
  ]);
  const [newApiURL, setNewApiURL] = useState("");
  const handleApiAdd = () => {
    let copy = [...apis];
    copy.push({
      url: newApiURL,
      details: [
        {
          detailUrl: "",
          summary: "",
          method: "",
          param: "",
          requestBody: "",
          responseBody: "",
        },
      ],
    });
    setApis(copy);
  };
  return (
    <div className="App">
      <label htmlFor="inputName">API URL :</label>
      <input
        type="text"
        id="inputName"
        onChange={(e) => {
          setNewApiURL(e.target.value);
        }}
      />
      <button onClick={handleApiAdd}>추가하기</button>
      {apis.map((api, index) => {
        return (
          <ApiTable
            key={index}
            index={index}
            apis={apis}
            setApis={setApis}
          ></ApiTable>
        );
      })}
    </div>
  );
}

export default App;

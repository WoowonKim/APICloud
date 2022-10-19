import { useState } from "react";
import ApiTable from "./ApiTable";
import "./App.css";

function App() {
  const [apis, setApis] = useState([
    {
      url: "/login",
      details: [
        {
          detailUrl: "/user",
          summary: "유저 로그인",
          method: "get",
          param: "",
          requestBody: "{userId}",
          responseBody: "{status}",
        },
        {
          detailUrl: "/info",
          summary: "로그인 유저 정보",
          method: "get",
          param: "",
          requestBody: "{userInfo}",
          responseBody: "{status}",
        },
      ],
    },
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
  return (
    <div className="App">
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

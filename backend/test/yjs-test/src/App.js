import { useEffect, useRef, useState } from "react";
import ApiTable from "./ApiTable";
import * as Y from "yjs";
import "./App.css";
import { WebrtcProvider } from "y-webrtc";

function App() {
  const doc = useRef(new Y.Doc());
  const sharedArray = useRef(doc.current.getArray());
  const [sharedApi, setSharedApi] = useState(
    sharedArray.current.toArray() ?? []
  );
  const [apis, setApis] = useState(sharedArray.current.toArray() ?? []);
  const observeDeepHandler = () => {
    setSharedApi(sharedArray.current.toArray());
  };
  useEffect(() => {
    new WebrtcProvider("YjsTest", doc.current);
    sharedArray.current.observeDeep(observeDeepHandler);
    return () => {
      sharedArray.current.unobserveDeep(observeDeepHandler);
    };
  }, []);

  useEffect(() => {
    setApis(sharedApi);
  }, [sharedApi]);

  useEffect(() => {
    sharedArray.current.delete(0, sharedApi.length);
    sharedArray.current.insert(0, [...apis]);
  }, []);

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
    sharedArray.current.delete(0, sharedApi.length);
    sharedArray.current.insert(0, [...copy]);
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
            sharedApi={sharedApi}
            sharedArray={sharedArray}
            index={index}
            apis={apis}
          ></ApiTable>
        );
      })}
    </div>
  );
}

export default App;

import { useEffect, useRef, useState } from "react";
import ApiTable from "./ApiTable";
import * as Y from "yjs";
import "./App.css";
import { WebrtcProvider } from "y-webrtc";
import { useSyncedStore } from "@syncedstore/react";
import { store } from "./store.ts";

function App() {
  // const doc = useRef(new Y.Doc());
  // const sharedArray = useRef(doc.current.getArray());
  // const [sharedApi, setSharedApi] = useState(
  //   sharedArray.current.toArray() ?? []
  // );
  // const [apis, setApis] = useState(sharedArray.current.toArray() ?? []);
  // useEffect(() => {
  //   const observeDeepHandler = () => {
  //     setSharedApi(sharedArray.current.toArray());
  //   };
  //   console.log(window.location.href.split("/").at(-1));
  //   const provider = new WebrtcProvider(
  //     window.location.href.split("/").at(-1),
  //     doc.current
  //   );
  //   const awareness = provider.awareness;
  //   sharedArray.current.observeDeep(observeDeepHandler);
  //   return () => {
  //     sharedArray.current.unobserveDeep(observeDeepHandler);
  //   };
  // }, []);

  // useEffect(() => {
  //   setApis(sharedApi);
  // }, [sharedApi]);

  // const handleApiAdd = () => {
  //   let copy = [...apis];
  //   copy.push({
  //     url: newApiURL,
  //     details: [
  //       {
  //         detailUrl: "",
  //         summary: "",
  //         method: "",
  //         param: "",
  //         requestBody: "",
  //         responseBody: "",
  //       },
  //     ],
  //   });
  //   sharedArray.current.delete(0, sharedApi.length);
  //   sharedArray.current.insert(0, [...copy]);
  // };
  const [newApiURL, setNewApiURL] = useState("");
  const state = useSyncedStore(store);
  const handleApiAdd = () => {
    state.apis.push({
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
      {state.apis.map((api, index) => {
        return (
          <ApiTable
            key={index}
            // sharedApi={sharedApi}
            // sharedArray={sharedArray}
            index={index}
            apis={state.apis}
          ></ApiTable>
        );
      })}
    </div>
  );
}

export default App;

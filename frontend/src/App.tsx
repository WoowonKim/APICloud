import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "./Page/Main";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />}></Route>
      </Routes>
    </div>
  );
};

export default App;

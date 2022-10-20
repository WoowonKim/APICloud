import React from "react";
import { Route, Routes } from "react-router-dom";
import ApiDocs from "./pages/ApiDocs";
import CreateApi from "./pages/CreateApi/CreateApi";
import Main from "./pages/Main";
import TestApi from "./pages/TestApi";
import Welcome from "./pages/Welcome";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/createApi" element={<CreateApi />} />
        <Route path="/apiDocs" element={<ApiDocs />} />
        <Route path="/testApi" element={<TestApi />} />
      </Routes>
    </div>
  );
};

export default App;

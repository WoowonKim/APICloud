import React from "react";
import { Route, Routes } from "react-router-dom";
import { OAuth2RedirectHandler } from "./components/welcome/OAuth2RedirectHandler";
import ApiDocs from "./pages/ApiDocs";
import CreateApi from "./pages/CreateApi/CreateApi";
import Main from "./pages/Main";
import TestApi from "./pages/TestApi";
import Welcome from "./pages/Welcome";
import ErrorPage from "./pages/ErrorPage";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/oauth2/redirect/" element={<OAuth2RedirectHandler />}></Route>
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/createApi" element={<CreateApi />} />
        <Route path="/apiDocs/:encryptedUrl" element={<ApiDocs />} />
        <Route path="/testApi" element={<TestApi />} />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
};

export default App;

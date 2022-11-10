import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { OAuth2RedirectHandler } from "./components/welcome/OAuth2RedirectHandler";
import ApiDocs from "./pages/ApiDocs";
import CreateApi from "./pages/CreateApi/CreateApi";
import Main from "./pages/Main";
import TestApi from "./pages/TestApi";
import Welcome from "./pages/Welcome";
import ErrorPage from "./pages/ErrorPage";
import GlobalStyles from "./GlobalStyles";
import styled, { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./theme";
import { useAppDispatch } from "./Store/hooks";
import testApiSlice from "./Store/slice/testApi";

const ModeChange = styled.div`
  position: absolute;
  border: 1px solid black;
  padding: 3px;
  right: 5px;
  bottom: 5px;
`;

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const dispatch = useAppDispatch();
  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
    dispatch(testApiSlice.actions.setGlobalDarkMode(!isDarkMode));
  };
  return (
    <>
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <GlobalStyles />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/oauth2/redirect/" element={<OAuth2RedirectHandler />}></Route>
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/createApi" element={<CreateApi />} />
          <Route path="/apiDocs/:encryptedUrl" element={<ApiDocs />} />
          <Route path="/testApi" element={<TestApi isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />} />
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
        <ModeChange
          onClick={() => {
            toggleDarkMode();
          }}
        >
          {isDarkMode ? <p>라이트 모드</p> : <p>다크 모드</p>}
        </ModeChange>
      </ThemeProvider>
    </>
  );
};

export default App;

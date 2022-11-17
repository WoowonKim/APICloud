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
import { useAppDispatch, useAppSelector } from "./Store/hooks";
import testApiSlice from "./Store/slice/testApi";
import { selectUser } from "./Store/slice/userSlice";
import { NotionOAuth2RedirectHandler } from "./components/CreateApi/NotionOAuth2RedirectHandler";

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
  const currentUser = useAppSelector(selectUser);
  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
    dispatch(testApiSlice.actions.setGlobalDarkMode(!isDarkMode));
  };
  if (window.localStorage.getItem("token")) {
    return (
      <>
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
          <GlobalStyles />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route
              path="/oauth2/redirect/"
              element={<OAuth2RedirectHandler />}
            ></Route>
            <Route
              path="/oauth2/notion"
              element={<NotionOAuth2RedirectHandler />}
            ></Route>
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/createApi/:encryptedUrl" element={<CreateApi />} />
            <Route path="/apiDocs/:encryptedUrl" element={<ApiDocs />} />
            <Route
              path="/testApi"
              element={
                <TestApi
                  isDarkMode={isDarkMode}
                  toggleDarkMode={toggleDarkMode}
                />
              }
            />
            <Route path="/*" element={<ErrorPage code="404" />} />
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
  } else {
    return (
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route
          path="/oauth2/redirect/"
          element={<OAuth2RedirectHandler />}
        ></Route>
        <Route path="/*" element={<ErrorPage code="404" />} />
      </Routes>
    );
  }
};

export default App;

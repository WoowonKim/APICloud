import React, { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";
import Header from "./components/main/Header";
import MetaData from "./components/MetaData";

const ModeChange = styled.div`
  position: absolute;
  padding: 3px;
  right: 3vw;
  top: 1.3vh;
`;

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectUser);
  const location = useLocation();
  const darkMode = window.localStorage.getItem("darkMode");

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
    dispatch(testApiSlice.actions.setGlobalDarkMode(!isDarkMode));
  };
  if (window.localStorage.getItem("token")) {
    return (
      <>
        <MetaData title="APICloud" description="APICloud" name="APICloud" />
        {currentUser && location?.pathname !== "/welcome" && <Header />}
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
          <GlobalStyles />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/oauth2/redirect/" element={<OAuth2RedirectHandler />}></Route>
            <Route path="/oauth2/notion" element={<NotionOAuth2RedirectHandler />}></Route>
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/createApi/:encryptedUrl" element={<CreateApi />} />
            <Route path="/apiDocs/:encryptedUrl" element={<ApiDocs />} />
            <Route path="/testApi" element={<TestApi isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />} />
            <Route path="/*" element={<ErrorPage code="404" />} />
          </Routes>
          {/* <ModeChange
            onClick={() => {
              toggleDarkMode();
            }}
          >
            {darkMode === "1" && isDarkMode ? (
              <FontAwesomeIcon icon={faLightbulb} className="lightbulbIcon" onClick={() => window.localStorage.setItem("darkMode", "0")} />
            ) : (
              <FontAwesomeIcon icon={faLightbulb} className="lightbulbIcon" onClick={() => window.localStorage.setItem("darkMode", "1")} />
            )}
          </ModeChange> */}
        </ThemeProvider>
      </>
    );
  } else {
    return (
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/oauth2/redirect/" element={<OAuth2RedirectHandler />}></Route>
        <Route path="/*" element={<ErrorPage code="404" />} />
      </Routes>
    );
  }
};

export default App;

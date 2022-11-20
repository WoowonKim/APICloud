import React from "react";
import "./WelcomeHeader.scss";

interface Props {
  scrollIndex: number;
}

const WelcomeHeader = ({ scrollIndex }: Props) => {
  return (
    <header className="welcomeHeader">
      <div className="welcomeContainer">
        <div className="logoWrapper">
          <div className="logo">API Cloud</div>
          <img
            alt="logoImage"
            src={require("../../assets/realCloudLogo.png")}
            className="logoImage"
          />
        </div>
        <div className="buttonWrapper">
          <div className="welcomeSignIn">
            <a href={process.env.REACT_APP_GOOGLE_OAUTH2}>
              <img
                alt="googleLogin"
                src={require("../../assets/googleLogin.png")}
                className="welcomeGoogleLogin"
              />
            </a>
          </div>
          <div className="welcomeSignIn">
            <a href={process.env.REACT_APP_GITHUB_OAUTH2}>
              <img
                alt="githubLogin"
                src={
                  scrollIndex === 3
                    ? require("../../assets/githubLoginWhite.png")
                    : require("../../assets/githubLogin.png")
                }
                className="welcomeGithubLogin"
              />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default WelcomeHeader;

import React from "react";
import "./WelcomeHeader.scss";

const WelcomeHeader = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="logo">API Cloud</div>
        <div className="buttonWrapper">
          <div className="signIn">
            <a href="http://localhost:8005/oauth2/authorization/google">
              구글 로그인
            </a>
          </div>
          <div className="signIn">깃헙 로그인</div>
          <div className="signUp">회원가입</div>
        </div>
      </div>
    </header>
  );
};

export default WelcomeHeader;

import React from "react";
import styled from "styled-components";
import Header from "../components/main/Header";

const Bg = styled.div`
  height: 100vh;
`;

const Error = styled.div`
  padding-top: 45px;
  text-align: center;
`;

const ErrorImg = styled.img`
  width: 35%;
`;

type ErrorProps = {
  code: string;
};

const ErrorPage = ({ code }: ErrorProps) => {
  console.log(code);

  if (code === "404") {
    return (
      <Bg>
        <Header />
        <Error>
          <ErrorImg
            alt="ErrorImg404"
            src={require("../assets/ErrorImg404.png")}
          />
        </Error>
      </Bg>
    );
  } else {
    return (
      <Bg>
        <Header />
        <Error>
          <ErrorImg
            alt="ErrorImg403"
            src={require("../assets/ErrorImg403.png")}
          />
        </Error>
      </Bg>
    );
  }
};

export default ErrorPage;

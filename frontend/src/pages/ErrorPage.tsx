import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../components/main/Header";
import { useAppSelector } from "../Store/hooks";
import { InfinitySpin } from "react-loader-spinner";
import { Loading } from "./CreateApi/CreateApi";

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
  const isPending = useAppSelector((state) => state.apiDocsApi.isPending);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    handleStart();
  }, []);

  const handleStart = () => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  if (code === "403") {
    return isPending || isLoading ? (
      <Loading>
        <InfinitySpin width="250" color="#6FC7D1" />
      </Loading>
    ) : (
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
  } else {
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
  }
};

export default ErrorPage;

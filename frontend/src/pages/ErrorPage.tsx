import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAppSelector } from "../Store/hooks";
import { InfinitySpin } from "react-loader-spinner";

const Error = styled.div`
  border: none;
  padding: 5px 10px;
  margin-top: 5px;
  font-size: 50px;
  text-align: center;
`;

const ErrorPage = () => {
  const isPending = useAppSelector((state) => state.apiDocsApi.isPending);
  const [isLodaing, setIsLoading] = useState(true);
  useEffect(() => {
    handleStart();
  }, []);

  const handleStart = () => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  return (
    <>
      {isPending || isLodaing ? (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <InfinitySpin width="250" color="#6FC7D1" />
        </div>
      ) : (
        <Error>잘못된 접근 입니다.</Error>
      )}
    </>
  );
};

export default ErrorPage;

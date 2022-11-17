import React from "react";
import styled from "styled-components";

const Error = styled.div`
  border: none;
  padding: 5px 10px;
  margin-top: 5px;
  font-size: 50px;
  text-align: center;
`;

const ErrorPage = () => {
  return (
    <>
      <Error>잘못된 접근 입니다.</Error>
    </>
  );
};

export default ErrorPage;

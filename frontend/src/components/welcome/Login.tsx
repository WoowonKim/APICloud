import React, { useEffect } from "react";
import { useParams } from "react-router";

export const Login = () => {
  const param = useParams();
  useEffect(() => {
    localStorage.clear();
    localStorage.setItem(
      "token",
      window.location.search.substring(7) as string
    );
    window.location.replace("/welcome");
  }, []);
  return <div>로그인</div>;
};

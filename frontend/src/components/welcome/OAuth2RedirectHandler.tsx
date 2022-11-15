import { useEffect } from "react";

export const OAuth2RedirectHandler = () => {
  useEffect(() => {
    function searchParam(key: string) {
      return new URLSearchParams(window.location.search).get(key);
    }
    const token = searchParam("token");
    const error = searchParam("error");
    if (token) {
      localStorage.clear();
      localStorage.setItem("token", token);
    } else if (error) {
      alert(error);
    }
    window.location.replace("/");
  }, []);
  return <div></div>;
};

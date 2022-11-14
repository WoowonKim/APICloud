import { useEffect } from "react";

export const OAuth2RedirectHandler = () => {
  useEffect(() => {
    const token = window.location.search.substring(7) as string;
    localStorage.clear();
    localStorage.setItem("token", token);
    window.location.replace("/");
  }, []);
  return <div></div>;
};

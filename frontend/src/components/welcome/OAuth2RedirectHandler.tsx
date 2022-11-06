import { useEffect } from "react";

export const OAuth2RedirectHandler = () => {
  useEffect(() => {
    localStorage.clear();
    localStorage.setItem(
      "token",
      window.location.search.substring(7) as string
    );
    window.location.replace("/");
  }, []);
  return <div></div>;
};

import React from "react";
import ApiList from "../components/main/ApiList";
import Header from "../components/main/Header";
import Start from "../components/main/Start";

const Main = () => {
  return (
    <div>
      <Header />
      <Start />
      <ApiList />
    </div>
  );
};

export default Main;

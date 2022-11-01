import { useEffect } from "react";
import ApiList from "../components/main/ApiList";
import Header from "../components/main/Header";
import Start from "../components/main/Start";
import { useAppDispatch } from "../Store/hooks";
import { fetchUser } from "../util/user";

const Main = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, []);
  return (
    <div>
      <Header />
      <Start />
      <ApiList />
    </div>
  );
};

export default Main;

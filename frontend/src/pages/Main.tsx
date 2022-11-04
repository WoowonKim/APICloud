import { useEffect } from "react";
import ApiList from "../components/main/ApiList";
import Header from "../components/main/Header";
import Start from "../components/main/Start";
import { useAppDispatch, useAppSelector } from "../Store/hooks";
import { selectUser, fetchUser } from "../Store/slice/userSlice";

const Main = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (!user) dispatch(fetchUser());
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

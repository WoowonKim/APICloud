import { useEffect, useState } from "react";
import ApiList from "../components/main/ApiList";
import Header from "../components/main/Header";
import Start from "../components/main/Start";
import { useAppDispatch, useAppSelector } from "../Store/hooks";
import { selectUser, fetchUser } from "../Store/slice/userSlice";

const Main = () => {
  const [isDocCreated, setIsDocCreated] = useState(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (!user) dispatch(fetchUser());
  }, []);

  return (
    <div>
      <Header />
      <Start setIsDocCreated={setIsDocCreated} />
      <ApiList isDocCreated={isDocCreated} setIsDocCreated={setIsDocCreated} />
    </div>
  );
};

export default Main;

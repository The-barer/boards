import { RouterProvider } from "react-router-dom";
import { router } from "./Router/router";
import { useEffect, useRef } from "react";
import { getUserData } from "./Helpers/getUserData.helper";
import { useAppDispatch } from "./Hooks/reduxHooks";
import { login } from "./Store/User/userSlice";

function App() {
  const isLoad = useRef(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const loginUser = async () => {
      const data = await getUserData();
      if (data) dispatch(login(data));
    };
    if (isLoad.current === false) {
      loginUser();
    }
    isLoad.current = true;
  }, [dispatch]);

  return <RouterProvider router={router} />;
}

export default App;

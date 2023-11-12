import { RouterProvider } from "react-router-dom";
import { router } from "./Router/router";
import { useEffect, useRef } from "react";
import { useAppDispatch } from "./Hooks/reduxHooks";
import { login } from "./Store/User/userSlice";
import { authService } from "./Services/auth.service";

function App() {
  const isLoad = useRef(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const loginUser = async () => {
      const user = await authService.getAuth();
      if (user) dispatch(login(user));
    };
    if (isLoad.current === false) {
      loginUser();
    }
    isLoad.current = true;
  }, [dispatch]);

  return <RouterProvider router={router} />;
}

export default App;

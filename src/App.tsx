import { RouterProvider } from "react-router-dom";
import { router } from "./Router/router";
import { useAppDispatch } from "./Hooks/reduxHooks";
import { getAccessTokenFromLocalStorage } from "./Helpers/localStorage.helper";
import { authService } from "./Services/auth.service";
import { login, logout } from "./Store/User/userSlice";
import { useEffect } from "react";

function App() {
  const dispatch = useAppDispatch();
  const checkAuth = async () => {
    const accessToken = getAccessTokenFromLocalStorage();
    try {
      if (accessToken) {
        const data = await authService.getAuth();
        if (data) {
          dispatch(login(data));
        } else {
          dispatch(logout());
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    checkAuth();
  }, []);

  return <RouterProvider router={router} />;
}

export default App;

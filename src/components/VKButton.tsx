import { useEffect, useState } from "react";
import { authService } from "../Services/auth.service";
import { useAppDispatch } from "../Hooks/reduxHooks";
import { login } from "../Store/User/userSlice";
import { setAccessTokenToLocalStorage } from "../Helpers/localStorage.helper";
import { useLocation, useNavigate } from "react-router-dom";
import { queryParse } from "../Helpers/queryParse.helper";
import { IQueryParse } from "../Types/types";

export const VKButton = () => {
  const [isError, setIsError] = useState<boolean>(false);

  const host: string = "http://localhost:5173";
  const cbLink: string = `${host}/auth`;

  const VK_CLIENT_ID = "51761198";
  const regstate = (Math.random() * 19890903).toString();
  sessionStorage.setItem("regstate", regstate);
  const handleRedirect = () => {
    console.log("нажата кнопка");
    const authLink = `https://oauth.vk.com/authorize?client_id=${VK_CLIENT_ID}&display=popup&redirect_uri=${cbLink}&scope=email&response_type=code&v=5.1310&state=${regstate}`;
    console.log(authLink);
    window.location.href = authLink;
  };
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handelVKLogin = async (query: IQueryParse) => {
      try {
        const user = await authService.loginVK(query);
        console.log("UserRecived: ", user);
        if (user) {
          setAccessTokenToLocalStorage(user.token);
          dispatch(login(user));
          navigate("/main");
        }
      } catch {
        setIsError(true);
      }
    };
    if (location.search) {
      const query = queryParse(location.search);
      if (isError) navigate("/auth");
      if (query.code) handelVKLogin(query);
    }
  }, [location.search, isError, dispatch, navigate]);

  return (
    <div>
      <button
        onClick={() => {
          handleRedirect();
        }}
      >
        Войти через VK
      </button>
      {isError && <p>Ошибка входа</p>}
    </div>
  );
};

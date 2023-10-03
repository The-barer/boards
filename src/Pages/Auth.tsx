import LoginForm from "../Components/LoginForm";
import { authService } from "../Services/auth.service";
import { login, logout } from "../Store/User/userSlice";
import { useAppDispatch } from "../Hooks/reduxHooks";
import { ILoginFormFields } from "../Types/types";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { VKButton } from "../Components/VKButton";
import { queryParse } from "../Helpers/queryParse.helper";

export default function Auth() {
  const { type } = useParams();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handelAuthForm = async (formFieldsData: ILoginFormFields) => {
    try {
      const authType = isLogin ? "login" : "registration";
      const data = await authService[authType](formFieldsData);

      if (data) {
        dispatch(login(data));
        navigate("/");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const error = err.response?.data.message;
      console.log(error.toString());
    }
  };
  const [loginType, setLoginType] = useState<string | undefined>("");
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const handelAuthType = (): void => setIsLogin(!isLogin);

  useEffect(() => {
    const handelVKLogin = async (code: string) => {
      console.log(code);
      dispatch(logout());
      const user = await authService.loginVK(code);
      try {
        return user && dispatch(login(user)) && navigate("/");
      } catch {
        return dispatch(logout());
        console.log("VKLogin Error");
      }
    };
    if (loginType === "vk" && location.search) {
      const query = queryParse(location.search);
      return query.code && handelVKLogin(query.code);
    }
  }, [loginType]);

  return (
    <div className="container" style={{ width: "100vw" }}>
      <div
        style={{
          width: "30vw",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {isLogin ? <h3>LogIn</h3> : <h3>Registration</h3>}

        <LoginForm onSubmit={handelAuthForm} />

        {!isLogin ? (
          <div
            onClick={handelAuthType}
            style={{ cursor: "pointer", textDecorationLine: "underline" }}
          >
            Уже есть Аккаунт?
          </div>
        ) : (
          <div
            onClick={handelAuthType}
            style={{ cursor: "pointer", textDecorationLine: "underline" }}
          >
            Зарегистрироваться
          </div>
        )}
        <VKButton />
      </div>
    </div>
  );
}

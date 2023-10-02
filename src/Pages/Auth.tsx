import LoginForm from "../Components/LoginForm";
import { setAccessTokenToLocalStorage } from "../Helpers/localStorage.helper";
import { authService } from "../Services/auth.service";
import { login } from "../Store/User/userSlice";
import { useAppDispatch } from "../Hooks/reduxHooks";
import { ILoginFormFields } from "../Types/types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { VKButton } from "../Components/VKButton";

export default function Auth() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handelAuthForm = async (formFieldsData: ILoginFormFields) => {
    try {
      const authType = isLogin ? "login" : "registration";
      const data = await authService[authType](formFieldsData);

      if (data) {
        console.log(data);
        setAccessTokenToLocalStorage(data.token);
        dispatch(login(data));
        navigate("/");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const error = err.response?.data.message;
      console.log(error.toString());
    }
  };

  const [isLogin, setIsLogin] = useState<boolean>(true);
  const handelAuthType = (): void => setIsLogin(!isLogin);

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

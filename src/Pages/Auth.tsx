import LoginForm from "../Components/LoginForm";
import { authService } from "../Services/auth.service";
import { login } from "../Store/User/userSlice";
import { useAppDispatch } from "../Hooks/reduxHooks";
import { ILoginFormFields } from "../Types/types";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ExternalAuth } from "../Components/ExternalAuth";

export default function Auth() {
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
    } catch (err) {
      console.log("Ошибка!", err);
    }
  };
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [message, setMessage] = useState<string | null>(null);
  const handelAuthType = (): void => setIsLogin(!isLogin);
  const { activationCode } = useParams();
  const load = useRef(false);

  useEffect(() => {
    if (!load.current) {
      load.current = true;
      activationCode &&
        authService
          .activateUser(activationCode)
          .then((data) => {
            console.log(data);
            if (data) setMessage(data.message);
          })
          .catch((err) => {
            setMessage(err.message);
          });
    }
  }, [activationCode, message]);

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
        {message && <h4>{message}</h4>}
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
        <ExternalAuth />
      </div>
    </div>
  );
}

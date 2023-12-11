import { useEffect, useState } from "react";
import { authService } from "../Entities/User/API/auth.api";
import { useAppDispatch } from "../Shared/Lib/Hooks/reduxHooks";
import { login } from "../Entities/User/model/userSlice";
import { useNavigate } from "react-router-dom";
import { AuthButton } from "./AuthButton";
import { authConfig } from "../Shared/Config/0auth.config";

export const ExternalAuth = () => {
  const [externalPopup, setExternalPopup] = useState<Window | null>(null);
  const [err, setErr] = useState<boolean>(false);
  const [authType, setAuthType] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const openPopup = (url: string, type: string) => {
    const popupWidth = 500;
    const popupHeight = 400;
    const left = window.screenX + (window.outerWidth - popupWidth) / 2;
    const top = window.screenY + (window.outerHeight - popupHeight) / 2;
    const target = `Auth`;
    const popup = window.open(
      url,
      target,
      `width=${popupWidth},height=${popupHeight},left=${left},top=${top}`
    );
    setExternalPopup(popup);
    setAuthType(type);
  };
  useEffect(() => {
    if (!externalPopup) {
      return;
    }

    const timer = setInterval(() => {
      if (externalPopup.window === null) {
        timer && clearInterval(timer);
        setExternalPopup(null);
        return;
      }
      if (externalPopup.closed) {
        timer && clearInterval(timer);

        const popupParams = new URLSearchParams(externalPopup.location.search);
        const code = popupParams.get("code");

        if (code && authType) {
          authService
            .login0Auth(popupParams, authType)
            .then((data) => {
              data && dispatch(login(data.user));
              navigate("/");
            })
            .catch(() => {
              setErr(true);
              console.log("Error reciving data frome todo-server");
            })
            .finally(() => {
              setAuthType(null);
            });
        }
      }
    }, 500);
  }, [authType, dispatch, externalPopup, navigate]);
  return (
    <div>
      <AuthButton onSubmit={openPopup} err={err} config={authConfig.vk}>
        <span>Войти через VK</span>
      </AuthButton>
      <AuthButton onSubmit={openPopup} err={err} config={authConfig.google}>
        <span>Войти через GOOGLE</span>
      </AuthButton>
    </div>
  );
};

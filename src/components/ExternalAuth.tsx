import { useEffect, useState } from "react";
import { authService } from "../Services/auth.service";
import { useAppDispatch } from "../Hooks/reduxHooks";
import { login } from "../Store/User/userSlice";
import { useNavigate } from "react-router-dom";
import { AuthButton } from "./AuthButton";
import { authConfig } from "../Config/auth.config";

export const ExternalAuth = () => {
  const [externalPopup, setExternalPopup] = useState<Window | null>(null);
  const [err, setErr] = useState<boolean>(false);
  const [authType, setAuthType] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const openPopup = (url: string, type: string) => {
    const popupWidth = 500;
    const popupHeight = 400;
    const left = window.screenX + window.outerWidth - popupWidth;
    const top = window.screenY + (window.outerHeight - popupHeight) / 2.5;
    const title = `Authentication`;
    const popup = window.open(
      url,
      title,
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
      if (!externalPopup) {
        timer && clearInterval(timer);
        return;
      }

      if (externalPopup.closed) {
        const popupParams = new URLSearchParams(externalPopup.location.search);
        const code = popupParams.get("code");
        if (code && authType) {
          authService
            .login0Auth(code, authType)
            .then((data) => {
              data && dispatch(login(data));
              navigate("/");
            })
            .catch(() => {
              setErr(true);
              console.log("Error reciving data VK");
            });
        }
        setExternalPopup(null);
        setAuthType(null);
        timer && clearInterval(timer);
      }
    }, 500);
  }, [authType, dispatch, externalPopup, navigate]);
  return (
    <div>
      <AuthButton onSubmit={openPopup} err={err} config={authConfig.vk}>
        <span>Войти через VK</span>
      </AuthButton>
    </div>
  );
};

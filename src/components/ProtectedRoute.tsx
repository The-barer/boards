import { FC } from "react";
import { useIsAuth } from "../Hooks/useIsAuth";
import { useNavigate } from "react-router-dom";
type Props = {
  children: JSX.Element;
};

export const ProtectedRoute: FC<Props> = ({ children }) => {
  const isAuth = useIsAuth();
  const navigate = useNavigate();

  return isAuth ? (
    children
  ) : (
    <div className="auth">
      <p> Для просмотра страницы, выполните вход</p>
      <button onClick={() => navigate("/auth")}>Пройти авторизацию</button>
    </div>
  );
};

import { FC } from "react";
import { useAuth } from "../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
type Props = {
  children: JSX.Element;
};

export const ProtectedRoute: FC<Props> = ({ children }) => {
  const isAuth = useAuth();
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

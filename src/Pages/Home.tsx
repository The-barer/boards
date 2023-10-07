import { useNavigate } from "react-router-dom";
import { useIsAuth } from "../Hooks/useIsAuth";

export default function HomePage() {
  const navigate = useNavigate();
  const isAuth = useIsAuth();

  return (
    <>
      <div>Home Page</div>
      <p>Добро пожаловать в TheBoards - todoApp by Dmitry Barer</p>
      <br />

      {!isAuth && (
        <div className="auth">
          <p> Для использования приложения, выполните вход</p>
          <button onClick={() => navigate("/auth")}>Пройти авторизацию</button>
        </div>
      )}
    </>
  );
}

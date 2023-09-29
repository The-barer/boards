import { useNavigate } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";

export default function HomePage() {
  const navigate = useNavigate();
  const isAuth = useAuth();
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

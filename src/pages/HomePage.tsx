import { Link } from "react-router-dom";

export default function HomePage() {
    
  return (
    <>
      <div>Home Page</div>
      <p>
        Уже есть аккаунт? <Link to="/auth">авторизоваться</Link>
      </p>
      <p>
        Или <Link to="/register">Зарегестрироваться</Link>
      </p>
    </>
  );
}

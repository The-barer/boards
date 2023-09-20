import { Link } from "react-router-dom";

export default function RegisterPage() {
  return (
    <>
      <div>RegisterPage</div>
      <p>
        Уже есть аккаунт? <Link to="/auth">авторизоваться</Link>
      </p>
    </>
  );
}

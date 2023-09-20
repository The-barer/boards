import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { ILoginFormFields } from "../types/types";

export default function AuthPage() {
  const onSubmit = (formFieldsData: ILoginFormFields): void => {
    console.log(formFieldsData);
  };

  return (
    <>
      <div>Auth Page</div>
      <LoginForm onSubmit={onSubmit} />
      <p>
        Или <Link to="/register">Зарегестрироваться</Link>
      </p>
    </>
  );
}

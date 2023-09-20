import { ILoginFormFields } from "../types/types";

interface ILoginFormProps {
  onSubmit: (data: ILoginFormFields) => void;
}
type FormFields = {
  email: HTMLInputElement;
  password: HTMLInputElement;
  remember: HTMLInputElement;
};
export default function LoginForm({ onSubmit }: ILoginFormProps) {
  const handelSubmit: React.FormEventHandler<HTMLFormElement & FormFields> = (
    event
  ) => {
    event.preventDefault();
    const form = event.currentTarget;
    const { email, password, remember } = form;
    onSubmit({
      login: email.value,
      password: password.value,
      isRemember: remember.checked,
    });
  };
  return (
    <form onSubmit={handelSubmit}>
      <label>
        <span>E-mail: </span>
        <input type="email" name="email" required />
      </label>
      <label>
        <span>Password: </span>
        <input type="password" name="password" required />
      </label>
      <label style={{ justifyContent: "center" }}>
        <input type="checkbox" name="remember" />
        <span>Remember me</span>
      </label>
      <button type="submit">LogIn</button>
    </form>
  );
}

import { ILoginFormFields } from "../Types/types";

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
    const { email, password } = form;
    onSubmit({
      email: email.value,
      password: password.value,
    });
  };
  return (
    <form
      onSubmit={handelSubmit}
      style={{ display: "flex", flexDirection: "column" }}
    >
      <label>
        <span>E-mail: </span>
        <input type="email" name="email" required />
      </label>
      <label>
        <span>Password: </span>
        <input type="password" name="password" required />
      </label>

      <button type="submit" style={{ width: "fit-content" }}>
        Отправить
      </button>
    </form>
  );
}
